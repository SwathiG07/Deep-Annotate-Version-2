const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// 1. Remove the dark background CSS override for #global
html = html.replace('#global { background: #060e1c !important; }', '#global { background: #FFFFFF !important; }');
html = html.replace('#global .stitle { color: #FFFFFF !important; }', '#global .stitle { color: #0E1F3E !important; }');
html = html.replace("#global .ssub { color: rgba(226,232,240,0.8) !important; }", '#global .ssub { color: rgba(14,31,62,0.6) !important; }');
html = html.replace('#global .eyebrow { color: #0BA8D3 !important; letter-spacing: 0.15em; }', '#global .eyebrow { color: #0BA8D3 !important; }');
html = html.replace('#global .gli { color: #FFFFFF !important; font-size: 14px; }', '#global .gli { color: #0E1F3E !important; font-size: 14px; }');

// 2. Change the canvas container background from dark to white
html = html.replace(
  'border-radius: 20px; overflow: hidden; background: #060e1c;">',
  'border-radius: 20px; overflow: hidden; background: #FFFFFF; border: 1px solid rgba(14,31,62,0.08);">'
);

// 3. Fix the SVG background filter - on white bg, no invert needed, just low opacity
html = html.replace(
  "filter: invert(1) opacity(0.1);",
  "filter: opacity(0.06);"
);

// 4. Rewrite the entire canvas JS for white background rendering
const oldScript = /<script>\s*document\.addEventListener\("DOMContentLoaded", function\(\) {\s*const canvas = document\.getElementById\('globalMapCanvas'\);[\s\S]*?<\/script>\s*<\/body>/;

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
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', () => { resize(); initEdgeNodes(); });
  resize();

  const timeOffset = Date.now();

  const HQ = { name: 'Hyderabad HQ', x: 0.65, y: 0.38, isHQ: true };
  const hubs = [
    { name: 'San Francisco', x: 0.12, y: 0.32, isHQ: false },
    { name: 'London',        x: 0.43, y: 0.20, isHQ: false },
    { name: 'Dubai',         x: 0.56, y: 0.38, isHQ: false },
    HQ,
    { name: 'Singapore',     x: 0.78, y: 0.58, isHQ: false },
    { name: 'Tokyo',         x: 0.85, y: 0.28, isHQ: false }
  ];

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

  const packets = [];
  function spawnPacket() {
    if (packets.length < 150) {
      const nonHQHubs = hubs.filter(h => !h.isHQ);
      const source = nonHQHubs[Math.floor(Math.random() * nonHQHubs.length)];
      const jA = Math.random() * Math.PI * 2;
      const jR = Math.random() * 0.04;
      packets.push({
        sx: source.x + Math.cos(jA) * jR * (H/W),
        sy: source.y + Math.sin(jA) * jR,
        progress: 0,
        speed: 0.002 + Math.random() * 0.004
      });
    }
  }

  function quadBez(x1, y1, cpx, cpy, x2, y2, t) {
    const it = 1 - t;
    return { x: it*it*x1 + 2*it*t*cpx + t*t*x2, y: it*it*y1 + 2*it*t*cpy + t*t*y2 };
  }

  function render() {
    ctx.clearRect(0, 0, W, H);
    const time = (Date.now() - timeOffset) / 1000;

    // Procedural dots (navy colored for white bg)
    const scan = (time * 0.2) % 1;
    for (let x = 0; x < W; x += 15) {
      for (let y = 0; y < H; y += 15) {
        const wave = Math.sin(x * 0.005 + time * 0.3) * Math.cos(y * 0.005 + time * 0.2);
        if (wave > 0.05) {
          const normX = x / W;
          const dist = Math.abs(normX - scan);
          const wrapDist = Math.min(dist, 1 - dist);
          let opacity = wrapDist < 0.08 ? 0.15 * (1 - wrapDist / 0.08) : 0.025;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(11,168,211,' + opacity.toFixed(3) + ')';
          ctx.fill();
        }
      }
    }

    // Edge nodes + faint curves
    const hqX = HQ.x * W;
    const hqY = HQ.y * H;

    edgeNodes.forEach(edge => {
      const ex = edge.x * W;
      const ey = edge.y * H;
      const hx = edge.hub.x * W;
      const hy = edge.hub.y * H;
      ctx.beginPath();
      ctx.arc(ex, ey, 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(14,31,62,0.08)';
      ctx.fill();
      const cpx = (ex + hx) / 2;
      const cpy = Math.min(ey, hy) - 60;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.quadraticCurveTo(cpx, cpy, hx, hy);
      ctx.strokeStyle = 'rgba(11,168,211,0.04)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    // Dashed curves from each hub TO HQ
    hubs.forEach(hub => {
      if (hub.isHQ) return;
      const px = hub.x * W;
      const py = hub.y * H;
      const cpx = (px + hqX) / 2;
      const cpy = Math.min(py, hqY) - 100;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(cpx, cpy, hqX, hqY);
      ctx.strokeStyle = 'rgba(11,168,211,0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw Hubs
    hubs.forEach(hub => {
      const px = hub.x * W;
      const py = hub.y * H;

      const pulseRadius = (hub.isHQ ? 16 : 10) + Math.sin(time * 4) * 5;
      ctx.beginPath();
      ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = hub.isHQ ? 'rgba(11,168,211,0.35)' : 'rgba(255,186,8,0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(px, py, hub.isHQ ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = hub.isHQ ? '#0BA8D3' : '#FFBA08';
      ctx.shadowColor = hub.isHQ ? 'rgba(11,168,211,0.4)' : 'rgba(255,186,8,0.4)';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (hub.isHQ) {
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      ctx.font = hub.isHQ ? '700 13px Inter, sans-serif' : '500 11px Inter, sans-serif';
      ctx.fillStyle = '#0E1F3E';
      ctx.fillText(hub.name, px + (hub.isHQ ? 16 : 12), py - (hub.isHQ ? 12 : 8));
    });

    // Data packets (ALL converge on HQ)
    if (Math.random() < 0.5) spawnPacket();
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;
      if (p.progress >= 1) { packets.splice(i, 1); continue; }
      const sx = p.sx * W;
      const sy = p.sy * H;
      const cpx = (sx + hqX) / 2;
      const cpy = Math.min(sy, hqY) - 100;
      const pos = quadBez(sx, sy, cpx, cpy, hqX, hqY, p.progress);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#0BA8D3';
      ctx.shadowColor = 'rgba(11,168,211,0.5)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(render);
  }
  render();
});
</script>
</body>`;

html = html.replace(oldScript, newScript);

fs.writeFileSync('about.html', html);
console.log('Map converted to WHITE background with navy/cyan palette.');
