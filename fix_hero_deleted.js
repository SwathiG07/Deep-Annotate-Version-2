const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

const deletedCSS = `
    .hc{position:relative;z-index:10;text-align:center;max-width:920px;padding:0 32px;}
    .hbadge{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:100px;background:rgba(11,168,211,0.08);border:1px solid rgba(11,168,211,0.2);font-size:12px;font-weight:600;color:var(--cyan);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:36px;}
    .hdot{width:6px;height:6px;border-radius:50%;background:var(--cyan);animation:pdot 2s ease-in-out infinite;}
    @keyframes pdot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(0.7);}}
    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* ==============================================
       EXTREME PREMIUM EFFECTS: MISSION & VISION
       ============================================== */
    /* 1. Section Overrides Removed per Request */
    
    /* 2. Deep Glass Base */
    .mvc {
`;

// Insert it right before `      background: rgba(10, 20, 38, 0.95) !important;`
const targetStr = "      background: rgba(10, 20, 38, 0.95) !important;";
const insertIdx = html.indexOf(targetStr);

if (insertIdx !== -1) {
  html = html.substring(0, insertIdx) + deletedCSS + html.substring(insertIdx);
  fs.writeFileSync('about.html', html);
  console.log('Restored deleted hero CSS and .mvc selector.');
} else {
  console.log('Could not find target string to insert before.');
}
