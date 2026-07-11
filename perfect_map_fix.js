const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

const oldMapRegex = /<section id="global" class="sp">[\s\S]*?<\/section>/;

const newMapHTML = `<section id="global" class="sp" style="background: #FFFFFF;">
  <div class="sw">
    <div class="rev" style="text-align:center;">
      <p class="eyebrow" style="color: #0BA8D3;">Global Presence</p>
      <h2 class="stitle" style="color: #0E1F3E;">Operating Worldwide</h2>
      <p class="ssub" style="margin:16px auto 0; color: rgba(14,31,62,0.6);">Headquartered at Hyderabad's T-Hub Innovation Campus. Delivering enterprise-grade data operations across every timezone.</p>
    </div>
    <div class="gc rev" style="margin-top: 40px;">
      <div style="position: relative; width: 100%; height: 350px; border-radius: 20px; overflow: hidden; background: #FFFFFF; border: 1px solid rgba(14,31,62,0.08);">
        <!-- Req 1: Faint SVG world map outline behind canvas -->
        <div style="position: absolute; inset: 0; background: url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg') center center / 85% no-repeat; filter: opacity(0.06); z-index: 1; pointer-events: none;"></div>
        <canvas id="globalMapCanvas" style="position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 2;"></canvas>
        <div class="gleg" style="position: absolute; bottom: 0; left: 0; width: 100%; z-index: 3; margin: 0; border-top: 1px solid rgba(14,31,62,0.04); background: #FFFFFF; padding: 16px 0;">
          <div class="gli" style="color: #0E1F3E;"><div class="gld" style="background:#0E1F3E;"></div>Headquarters</div>
          <div class="gli" style="color: #0E1F3E;"><div class="gld" style="background:#000000;"></div>Regional Delivery Hub</div>
        </div>
      </div>
    </div>
  </div>
</section>`;

html = html.replace(oldMapRegex, newMapHTML);

// Now update the script for the canvas
const oldScriptRegex = /<script>\s*document\.addEventListener\("DOMContentLoaded", function\(\) {\s*const canvas = document\.getElementById\('globalMapCanvas'\);[\s\S]*?<\/script>\s*<\/body>/;

const newScript = `<script>
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('globalMapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    const container = canvas.parentElement;
    W = container.clientWidth;
    H = container.clientHeight || 350;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  const timeOffset = Date.now();

  const HQ = { name: 'Hyderabad HQ', x: 0.65, y: 0.38, isHQ: true };
  const regionalHubs = [
    { name: 'San Francisco', x: 0.12, y: 0.32 },
    { name: 'London',        x: 0.43, y: 0.20 },
    { name: 'Dubai',         x: 0.56, y: 0.38 },
    { name: 'Singapore',     x: 0.78, y: 0.58 },
    { name: 'Tokyo',         x: 0.85, y: 0.28 }
  ];

  // Exactly ONE ball per hub
  const balls = regionalHubs.map((hub, i) => ({
    hub: hub,
    progress: i * 0.2, // stagger start positions
    speed: 0.003
  }));

  function quadBez(x1, y1, cpx, cpy, x2, y2, t) {
    const it = 1 - t;
    return { x: it*it*x1 + 2*it*t*cpx + t*t*x2, y: it*it*y1 + 2*it*t*cpy + t*t*y2 };
  }

  function render() {
    ctx.clearRect(0, 0, W, H);
    const time = (Date.now() - timeOffset) / 1000;
    const hqX = HQ.x * W;
    const hqY = HQ.y * H;

    // Procedural continent dots + radar sweep (white background version)
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

    // Exactly ONE dashed curve from each hub to HQ
    regionalHubs.forEach(hub => {
      const px = hub.x * W;
      const py = hub.y * H;
      const cpx = (px + hqX) / 2;
      const cpy = Math.min(py, hqY) - 80;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(cpx, cpy, hqX, hqY);
      ctx.strokeStyle = 'rgba(11,168,211,0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw regional hubs (amber)
    regionalHubs.forEach(hub => {
      const px = hub.x * W;
      const py = hub.y * H;

      const pulseR = 8 + Math.sin(time * 3) * 3;
      ctx.beginPath();
      ctx.arc(px, py, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,186,8,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFBA08';
      ctx.shadowColor = 'rgba(255,186,8,0.4)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = '500 11px Inter, sans-serif';
      ctx.fillStyle = '#0E1F3E';
      ctx.fillText(hub.name, px + 12, py - 8);
    });

    // HQ (cyan, bigger)
    const pulseR = 14 + Math.sin(time * 4) * 5;
    ctx.beginPath();
    ctx.arc(hqX, hqY, pulseR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(11,168,211,0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(hqX, hqY, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#0BA8D3';
    ctx.shadowColor = 'rgba(11,168,211,0.5)';
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(hqX, hqY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.font = '700 13px Inter, sans-serif';
    ctx.fillStyle = '#0E1F3E';
    ctx.fillText(HQ.name, hqX + 16, hqY - 12);

    // Exactly ONE ball per curve
    balls.forEach(ball => {
      ball.progress += ball.speed;
      if (ball.progress >= 1) ball.progress = 0;

      const px = ball.hub.x * W;
      const py = ball.hub.y * H;
      const cpx = (px + hqX) / 2;
      const cpy = Math.min(py, hqY) - 80;
      const pos = quadBez(px, py, cpx, cpy, hqX, hqY, ball.progress);

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#0BA8D3';
      ctx.shadowColor = 'rgba(11,168,211,0.6)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }
  render();
});
</script>
</body>`;

html = html.replace(oldScriptRegex, newScript);
fs.writeFileSync('about.html', html);
console.log('Map updated flawlessly.');
