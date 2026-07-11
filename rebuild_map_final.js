const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// ============================================================
// STEP 1: Replace SVG map HTML with Canvas + Background Div
// ============================================================
const oldSVGMap = /<svg class="gsvg" viewBox="0 0 1200 420"[\s\S]*?<\/svg>/;

const newMapHTML = `<div style="position: relative; width: 100%; height: 500px; border-radius: 20px; overflow: hidden; background: #060e1c;">
        <!-- Req 1: Faint SVG world map outline behind canvas -->
        <div style="position: absolute; inset: 0; background: url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg') center center / 85% no-repeat; filter: invert(1) opacity(0.1); z-index: 1; pointer-events: none;"></div>
        <canvas id="globalMapCanvas" style="position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 2;"></canvas>
      </div>`;

html = html.replace(oldSVGMap, newMapHTML);

// ============================================================
// STEP 2: Add CSS for dark map section + visible legend
// ============================================================
const mapCSS = `
    /* ── Global Map: Dark Section ── */
    #global { background: #060e1c !important; }
    #global .stitle { color: #FFFFFF !important; }
    #global .ssub { color: rgba(226,232,240,0.8) !important; }
    #global .eyebrow { color: #0BA8D3 !important; letter-spacing: 0.15em; }
    #global .gleg { margin-top: 24px; }
    #global .gli { color: #FFFFFF !important; font-size: 14px; }
    #global .gld { width: 12px !important; height: 12px !important; border-radius: 50%; }
`;

html = html.replace('</style>', mapCSS + '\n</style>');

// ============================================================
// STEP 3: Fix legend dot colors (hardcode, don't use CSS vars)
// ============================================================
html = html.replace(
  '<div class="gld" style="background:var(--cyan);"></div>Headquarters',
  '<div class="gld" style="background:#0BA8D3;"></div>Headquarters'
);
html = html.replace(
  '<div class="gld" style="background:var(--amber);"></div>Regional Delivery Hub',
  '<div class="gld" style="background:#FFBA08;"></div>Regional Delivery Hub'
);

// ============================================================
// STEP 4: Inject the complete Canvas JS before </body>
// ALL packets converge on Hyderabad HQ
// ============================================================
const canvasScript = `
<script>
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
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', () => { resize(); initEdgeNodes(); });
  resize();

  const timeOffset = Date.now();

  // ─── Hub Definitions (ALL converge to Hyderabad HQ) ───
  const HQ = { name: 'Hyderabad HQ', x: 0.65, y: 0.38, isHQ: true };
  const hubs = [
    { name: 'San Francisco', x: 0.12, y: 0.32, isHQ: false },
    { name: 'London',        x: 0.43, y: 0.20, isHQ: false },
    { name: 'Dubai',         x: 0.56, y: 0.38, isHQ: false },
    HQ,
    { name: 'Singapore',     x: 0.78, y: 0.58, isHQ: false },
    { name: 'Tokyo',         x: 0.85, y: 0.28, isHQ: false }
  ];

  // ─── Req 4: Edge Node Swarm ───
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

  // ─── Req 5: Data Packets (ALL flow TO Hyderabad HQ) ───
  const packets = [];
  function spawnPacket() {
    if (packets.length < 150) {
      // Pick a random non-HQ hub or edge node as the SOURCE
      const nonHQHubs = hubs.filter(h => !h.isHQ);
      const source = nonHQHubs[Math.floor(Math.random() * nonHQHubs.length)];
      // Slight randomization around the source
      const jitterAngle = Math.random() * Math.PI * 2;
      const jitterR = Math.random() * 0.04;
      packets.push({
        sx: source.x + Math.cos(jitterAngle) * jitterR * (H/W),
        sy: source.y + Math.sin(jitterAngle) * jitterR,
        progress: 0,
        speed: 0.002 + Math.random() * 0.004,
        color: source.isHQ ? '#0BA8D3' : '#FFBA08'
      });
    }
  }

  // Quadratic bezier helper
  function quadBez(x1, y1, cpx, cpy, x2, y2, t) {
    const it = 1 - t;
    return {
      x: it * it * x1 + 2 * it * t * cpx + t * t * x2,
      y: it * it * y1 + 2 * it * t * cpy + t * t * y2
    };
  }

  // ─── Main Render Loop ───
  function render() {
    ctx.clearRect(0, 0, W, H);
    const time = (Date.now() - timeOffset) / 1000;

    // ─── Req 2: Procedural Continent Dots (NO Polygons) ───
    // ─── Req 3: Radar Sweep ───
    const scan = (time * 0.2) % 1;

    for (let x = 0; x < W; x += 15) {
      for (let y = 0; y < H; y += 15) {
        const wave = Math.sin(x * 0.005 + time * 0.3) * Math.cos(y * 0.005 + time * 0.2);
        if (wave > 0.05) {
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

    // ─── Req 4: Edge Nodes + Faint Curves (all back to their hub) ───
    edgeNodes.forEach(edge => {
      const ex = edge.x * W;
      const ey = edge.y * H;
      const hx = edge.hub.x * W;
      const hy = edge.hub.y * H;

      // Tiny edge node dot
      ctx.beginPath();
      ctx.arc(ex, ey, 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fill();

      // Faint curve back to parent hub
      const cpx = (ex + hx) / 2;
      const cpy = Math.min(ey, hy) - 60;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.quadraticCurveTo(cpx, cpy, hx, hy);
      ctx.strokeStyle = edge.hub.isHQ ? 'rgba(11,168,211,0.06)' : 'rgba(255,186,8,0.04)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    // ─── Draw curves from each hub TO Hyderabad HQ ───
    const hqX = HQ.x * W;
    const hqY = HQ.y * H;
    hubs.forEach(hub => {
      if (hub.isHQ) return;
      const px = hub.x * W;
      const py = hub.y * H;
      const cpx = (px + hqX) / 2;
      const cpy = Math.min(py, hqY) - 100;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(cpx, cpy, hqX, hqY);
      ctx.strokeStyle = 'rgba(11,168,211,0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // ─── Draw Hubs (glowing pulsing nodes) ───
    hubs.forEach(hub => {
      const px = hub.x * W;
      const py = hub.y * H;

      // Pulsing ring
      const pulseRadius = (hub.isHQ ? 16 : 10) + Math.sin(time * 4) * 5;
      ctx.beginPath();
      ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = hub.isHQ ? 'rgba(11,168,211,0.5)' : 'rgba(255,186,8,0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Core dot
      ctx.beginPath();
      ctx.arc(px, py, hub.isHQ ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = hub.isHQ ? '#0BA8D3' : '#FFBA08';
      ctx.shadowColor = hub.isHQ ? '#0BA8D3' : '#FFBA08';
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.shadowBlur = 0;

      // White inner dot for HQ
      if (hub.isHQ) {
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      // Label
      ctx.font = hub.isHQ ? '700 13px Inter, sans-serif' : '500 11px Inter, sans-serif';
      ctx.fillStyle = hub.isHQ ? '#FFFFFF' : 'rgba(255,255,255,0.8)';
      ctx.fillText(hub.name, px + (hub.isHQ ? 16 : 12), py - (hub.isHQ ? 12 : 8));
    });

    // ─── Req 5: Glowing Data Packets (ALL converge on HQ) ───
    if (Math.random() < 0.5) spawnPacket();

    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        packets.splice(i, 1);
        continue;
      }

      const sx = p.sx * W;
      const sy = p.sy * H;
      const cpx = (sx + hqX) / 2;
      const cpy = Math.min(sy, hqY) - 100;

      const pos = quadBez(sx, sy, cpx, cpy, hqX, hqY, p.progress);

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(render);
  }

  render();
});
<\/script>`;

html = html.replace('</body>', canvasScript + '\n</body>');

fs.writeFileSync('about.html', html);
console.log('Map completely rebuilt: dark section, all packets to HQ, bright legend, 5 strict requirements met.');
