const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// 1. Replace the SVG map HTML with a canvas + background div structure
const oldMapHTML = /(<div class="gc rev">)\s*<svg class="gsvg"[\s\S]*?<\/svg>\s*(<div class="gleg">)/;

const newMapHTML = `$1
      <div style="position: relative; width: 100%; height: 500px; border-radius: 20px; overflow: hidden; background: #060e1c;">
        <!-- Faint SVG world map outline behind canvas -->
        <div style="position: absolute; inset: 0; background: url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg') center center / 85% no-repeat; filter: invert(1) opacity(0.1); z-index: 1; pointer-events: none;"></div>
        <canvas id="globalMapCanvas" style="position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 2;"></canvas>
      </div>
      $2`;

html = html.replace(oldMapHTML, newMapHTML);

// 2. Replace the old canvas script with the new strict-spec version
const oldScript = /<script>\s*document\.addEventListener\("DOMContentLoaded", function\(\) {\s*const canvas = document\.getElementById\('globalMapCanvas'\);[\s\S]*?<\/script>/;

const newScript = `<script>
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('globalMapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    const container = canvas.parentElement;
    W = container.clientWidth;
    H = container.clientHeight || 500;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', () => { resize(); initEdgeNodes(); });
  resize();

  const timeOffset = Date.now();

  // ─── Hub Definitions ───
  const hubs = [
    { name: 'San Francisco', x: 0.12, y: 0.35, isHQ: false },
    { name: 'London',        x: 0.43, y: 0.22, isHQ: false },
    { name: 'Dubai',         x: 0.57, y: 0.40, isHQ: false },
    { name: 'Hyderabad HQ',  x: 0.65, y: 0.42, isHQ: true  },
    { name: 'Singapore',     x: 0.78, y: 0.58, isHQ: false },
    { name: 'Tokyo',         x: 0.85, y: 0.32, isHQ: false }
  ];

  // ─── 4. Edge Node Swarm ───
  let edgeNodes = [];
  function initEdgeNodes() {
    edgeNodes = [];
    hubs.forEach(hub => {
      const numEdges = hub.isHQ ? 25 : 15 + Math.floor(Math.random() * 10);
      for (let i = 0; i < numEdges; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.03 + Math.random() * 0.12;
        edgeNodes.push({
          x: hub.x + Math.cos(angle) * radius * (H / W),
          y: hub.y + Math.sin(angle) * radius,
          hub: hub
        });
      }
    });
  }
  initEdgeNodes();

  // ─── 5. Data Packets Pool ───
  const packets = [];
  function spawnPacket() {
    if (packets.length < 120) {
      const edge = edgeNodes[Math.floor(Math.random() * edgeNodes.length)];
      packets.push({
        edge: edge,
        hub: edge.hub,
        progress: 0,
        speed: 0.003 + Math.random() * 0.006
      });
    }
  }

  // Quadratic bezier helper: returns point at t along curve
  function quadBezierPoint(x1, y1, cpx, cpy, x2, y2, t) {
    const it = 1 - t;
    return {
      x: it * it * x1 + 2 * it * t * cpx + t * t * x2,
      y: it * it * y1 + 2 * it * t * cpy + t * t * y2
    };
  }

  function drawCurve(x1, y1, x2, y2, isHQ) {
    const cpx = (x1 + x2) / 2;
    const cpy = Math.min(y1, y2) - 80;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cpx, cpy, x2, y2);
    ctx.strokeStyle = isHQ ? 'rgba(11,168,211,0.08)' : 'rgba(255,186,8,0.05)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    return { cpx, cpy };
  }

  // ─── Main Render Loop ───
  function render() {
    ctx.clearRect(0, 0, W, H);
    const time = (Date.now() - timeOffset) / 1000;

    // ─── 2 & 3. Procedural Continent Dots + Radar Sweep ───
    const spacing = 15;
    const scan = (time * 0.2) % 1;

    for (let x = 0; x < W; x += spacing) {
      for (let y = 0; y < H; y += spacing) {
        const wave = Math.sin(x * 0.005 + time * 0.3) * Math.cos(y * 0.005 + time * 0.2);
        if (wave > 0.05) {
          // Radar sweep opacity
          const normX = x / W;
          const dist = Math.abs(normX - scan);
          const wrapDist = Math.min(dist, 1 - dist);
          let opacity;
          if (wrapDist < 0.08) {
            opacity = 0.2 * (1 - wrapDist / 0.08);
          } else {
            opacity = 0.03;
          }
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(11,168,211,' + opacity.toFixed(3) + ')';
          ctx.fill();
        }
      }
    }

    // ─── 4. Edge Nodes + Faint Curves ───
    edgeNodes.forEach(edge => {
      const ex = edge.x * W;
      const ey = edge.y * H;
      const hx = edge.hub.x * W;
      const hy = edge.hub.y * H;

      // Tiny edge node dot
      ctx.beginPath();
      ctx.arc(ex, ey, 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fill();

      // Faint quadratic curve back to hub
      drawCurve(ex, ey, hx, hy, edge.hub.isHQ);
    });

    // ─── Draw Hubs (glowing pulsing nodes) ───
    hubs.forEach(hub => {
      const px = hub.x * W;
      const py = hub.y * H;

      // Pulsing ring
      const pulseRadius = 12 + Math.sin(time * 4) * 6;
      ctx.beginPath();
      ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = hub.isHQ ? 'rgba(11,168,211,0.4)' : 'rgba(255,186,8,0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core dot
      ctx.beginPath();
      ctx.arc(px, py, hub.isHQ ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = hub.isHQ ? '#0BA8D3' : '#FFBA08';
      ctx.shadowColor = hub.isHQ ? '#0BA8D3' : '#FFBA08';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      ctx.font = '600 11px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(hub.name, px + 14, py - 10);
    });

    // ─── 5. Glowing Data Packets ───
    if (Math.random() < 0.5) spawnPacket();

    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        packets.splice(i, 1);
        continue;
      }

      const ex = p.edge.x * W;
      const ey = p.edge.y * H;
      const hx = p.hub.x * W;
      const hy = p.hub.y * H;
      const cpx = (ex + hx) / 2;
      const cpy = Math.min(ey, hy) - 80;

      const pos = quadBezierPoint(ex, ey, cpx, cpy, hx, hy, p.progress);

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, p.hub.isHQ ? 2.5 : 1.5, 0, Math.PI * 2);
      ctx.fillStyle = p.hub.isHQ ? '#FFFFFF' : 'rgba(255,255,255,0.9)';
      ctx.shadowColor = p.hub.isHQ ? '#0BA8D3' : '#FFBA08';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(render);
  }

  render();
});
</script>`;

html = html.replace(oldScript, newScript);

// 3. Add CSS for the dark background on #global section
const mapCSS = `
    /* ── Global Map Dark Section ── */
    #global { background: #060e1c !important; }
    #global .stitle, #global .ssub { color: #FFFFFF !important; }
    #global .eyebrow { color: #00D4FF !important; }
`;

if (!html.includes('Global Map Dark Section')) {
  html = html.replace('</style>', mapCSS + '\n</style>');
}

fs.writeFileSync('about.html', html);
console.log('Canvas map fully rebuilt with all 5 strict requirements.');
