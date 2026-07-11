const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// 1. Remove old .mvc CSS blocks
const cssToRemove = [
  '#mv{background:linear-gradient(180deg,var(--navy-deep) 0%,var(--navy-panel) 100%);}',
  '.mvg{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:64px;}',
  '.mvc{background:rgba(255,255,255,0.02);border:1px solid var(--border-sub);border-radius:24px;padding:56px 48px;position:relative;overflow:hidden;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);}',
  '.mvc:hover{transform:translateY(-6px);box-shadow:var(--shadow-glow);}',
  '.mvc.m:hover{border-color:var(--border-cyan);}',
  '.mvc.v:hover{border-color:rgba(255,186,8,0.3);}',
  ".mvc::before{content:'';position:absolute;top:-60px;right:-60px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(11,168,211,0.08),transparent 70%);}",
  '.mvc.v::before{background:radial-gradient(circle,rgba(255,186,8,0.07),transparent 70%);}',
  '.mvi{width:54px;height:54px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:28px;}',
  '.mvc.m .mvi{background:rgba(11,168,211,0.1);border:1px solid rgba(11,168,211,0.2);}',
  '.mvc.v .mvi{background:rgba(255,186,8,0.1);border:1px solid rgba(255,186,8,0.2);}',
  '.mvl{font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--cyan);margin-bottom:14px;}',
  '.mvc.v .mvl{color:var(--amber);}',
  '.mvt{font-size:26px;font-weight:800;letter-spacing:-0.03em;color:var(--grey);margin-bottom:16px;}',
  '.mvd{font-size:15px;color:var(--grey-muted);line-height:1.75;}'
];

cssToRemove.forEach(line => {
  html = html.replace(line, '');
});

// Also remove the "ADDITIONAL MISSION/VISION EFFECTS" block I added earlier
const additionalEffectsRegex = /\/\* ==============================================\s*ADDITIONAL MISSION\/VISION EFFECTS\s*============================================== \*\/[\s\S]*?\.mvc:hover \.mvi svg \{\s*animation: slowPulse 2s infinite ease-in-out;\s*\}/;
html = html.replace(additionalEffectsRegex, '');

// 2. Insert EXTREME CSS
const extremeCSS = `
    /* ==============================================
       EXTREME PREMIUM MISSION/VISION
       ============================================== */
    #mv { background: #060e1c !important; position: relative; overflow: hidden; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
    #mv::before { content: ''; position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 800px; height: 800px; background: radial-gradient(circle, rgba(11,168,211,0.08) 0%, transparent 70%); pointer-events: none; }
    
    .mvg { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 80px; perspective: 2500px; }
    
    .mvc {
      background: rgba(255,255,255,0.015);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 32px;
      padding: 64px 48px;
      position: relative;
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      transform-style: preserve-3d;
      backdrop-filter: blur(20px);
      z-index: 1;
    }
    
    /* Spinning Conic Gradient Border */
    .mvc::after {
      content: ''; position: absolute; inset: -2px; border-radius: 34px; z-index: -2;
      background: conic-gradient(from 0deg, transparent 0%, rgba(11,168,211,0.1) 60%, rgba(11,168,211,1) 80%, transparent 100%);
      animation: spin 3s linear infinite;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .mvc.v::after {
      background: conic-gradient(from 0deg, transparent 0%, rgba(255,186,8,0.1) 60%, rgba(255,186,8,1) 80%, transparent 100%);
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    
    /* Inner mask to make conic gradient look like a border */
    .mvc::before {
      content: ''; position: absolute; inset: 0px; border-radius: 32px;
      background: #0a1120;
      z-index: -1;
      transition: background 0.5s;
    }
    
    .mvc:hover {
      transform: translateY(-20px) rotateX(8deg) rotateY(-4deg) scale(1.02);
      box-shadow: 0 40px 100px -20px rgba(11,168,211,0.5), inset 0 0 60px rgba(11,168,211,0.15);
      border-color: transparent;
    }
    .mvc.v:hover {
      transform: translateY(-20px) rotateX(8deg) rotateY(4deg) scale(1.02);
      box-shadow: 0 40px 100px -20px rgba(255,186,8,0.5), inset 0 0 60px rgba(255,186,8,0.15);
    }
    
    .mvc:hover::after { opacity: 1; }
    .mvc:hover::before { background: #080f1e; }
    
    .mvc .mvt, .mvc .mvd, .mvc .mvi, .mvc .mvl {
      transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    /* Extreme 3D Popout on hover */
    .mvc:hover .mvt { transform: translateZ(60px); color: #FFF; text-shadow: 0 10px 20px rgba(0,0,0,0.5); }
    .mvc:hover .mvd { transform: translateZ(35px); color: rgba(255,255,255,0.95); }
    .mvc:hover .mvl { transform: translateZ(25px); letter-spacing: 0.3em; }
    
    /* Icon pops out and glows insanely */
    .mvc:hover .mvi { 
      transform: translateZ(90px) scale(1.2); 
      background: rgba(11,168,211,0.15); 
      border-color: rgba(11,168,211,0.8);
      box-shadow: 0 0 40px rgba(11,168,211,0.6), inset 0 0 20px rgba(11,168,211,0.4);
    }
    .mvc.v:hover .mvi {
      background: rgba(255,186,8,0.15);
      border-color: rgba(255,186,8,0.8);
      box-shadow: 0 0 40px rgba(255,186,8,0.6), inset 0 0 20px rgba(255,186,8,0.4);
    }
    
    /* Initial state elements */
    .mvi {
      width: 72px; height: 72px; border-radius: 20px;
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; margin-bottom: 32px;
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
      color: #FFF;
    }
    .mvc.m .mvi { color: #0BA8D3; }
    .mvc.v .mvi { color: #FFBA08; }
    .mvc .mvi svg { width: 32px; height: 32px; transition: transform 0.5s; }
    .mvc:hover .mvi svg { transform: scale(1.1); filter: brightness(1.2); }
    
    .mvl { font-size: 13px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px; color: #0BA8D3; }
    .mvc.v .mvl { color: #FFBA08; }
    
    .mvt { font-size: 36px; font-weight: 800; letter-spacing: -0.03em; color: rgba(255,255,255,0.95); margin-bottom: 24px; line-height: 1.2; }
    .mvd { font-size: 17px; color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 0; }
    
    @media (max-width: 1024px) {
      .mvg { grid-template-columns: 1fr; }
      .mvc:hover { transform: translateY(-10px) scale(1.02); }
      .mvc.v:hover { transform: translateY(-10px) scale(1.02); }
    }
`;

html = html.replace('</style>', extremeCSS + '\n</style>');
fs.writeFileSync('about.html', html);
console.log('Applied EXTREME premium effects to Mission & Vision.');
