const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

const replacementContent = `    /* MISSION VISION */
    #mv{background:#050F1E !important; border-top: 1px solid rgba(255, 255, 255, 0.05); border-bottom: 1px solid rgba(255, 255, 255, 0.05); position: relative; overflow: hidden;}
    #mv .stitle { color: #FFFFFF !important; }
    #mv .eyebrow { color: #0BA8D3 !important; }
    #mv .ssub { color: rgba(255, 255, 255, 0.6) !important; }
    .mvg{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:64px;}
    
    .mvc{background:rgba(255,255,255,0.015) !important;border:1px solid rgba(255,255,255,0.08) !important;border-radius:24px;padding:56px 48px;position:relative;overflow:hidden;transition:all 0.5s cubic-bezier(0.16,1,0.3,1); backdrop-filter: blur(12px); z-index: 1;}
    .mvc:hover{transform:translateY(-16px);}
    
    /* Glowing shadows */
    .mvc.m:hover{border-color:#0BA8D3 !important; box-shadow: 0 20px 50px rgba(11, 168, 211, 0.25);}
    .mvc.v:hover{border-color:#FFFFFF !important; box-shadow: 0 20px 50px rgba(255, 255, 255, 0.2);}
    
    /* Sweeping Laser Reflection */
    .mvc::after{
      content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03), transparent);
      transform: skewX(-20deg);
      animation: sweep 4s infinite linear;
      pointer-events: none;
      z-index: 2;
    }
    @keyframes sweep {
      0% { left: -100%; }
      40%, 100% { left: 200%; }
    }
    
    /* Floating lights inside the cards */
    .mvc::before{content:'';position:absolute;top:-60px;right:-60px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(11,168,211,0.1),transparent 70%); z-index: -1; transition: opacity 0.5s;}
    .mvc.v::before{background:radial-gradient(circle,rgba(255,255,255,0.08),transparent 70%);}
    .mvc:hover::before{opacity: 1.5;}
    
    /* Icons */
    .mvi{width:54px;height:54px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:28px; transition: all 0.4s cubic-bezier(0.16,1,0.3,1);}
    .mvc.m .mvi{background:rgba(11,168,211,0.08);border:1px solid rgba(11,168,211,0.2); color: #0BA8D3;}
    .mvc.v .mvi{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15); color: #FFFFFF;}
    
    .mvc.m:hover .mvi{background:rgba(11,168,211,0.2); border-color:rgba(11,168,211,0.5); transform:scale(1.1); box-shadow: 0 0 20px rgba(11,168,211,0.4);}
    .mvc.v:hover .mvi{background:rgba(255,255,255,0.2); border-color:rgba(255,255,255,0.5); transform:scale(1.1); box-shadow: 0 0 20px rgba(255,255,255,0.4);}
    
    /* Typo */
    .mvl{font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#0BA8D3;margin-bottom:14px; transition: all 0.4s;}
    .mvc.v .mvl{color:#FFFFFF;}
    .mvc:hover .mvl{letter-spacing: 0.22em;}
    
    .mvt{font-size:26px;font-weight:800;letter-spacing:-0.03em;color:#FFFFFF;margin-bottom:16px; transition: all 0.4s;}
    .mvc.m:hover .mvt{text-shadow: 0 0 10px rgba(11, 168, 211, 0.3);}
    .mvc.v:hover .mvt{text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);}
    
    .mvd{font-size:15px;color:rgba(255,255,255,0.6);line-height:1.75; transition: all 0.4s;}
    .mvc:hover .mvd{color:rgba(255,255,255,0.85);}`;

const pattern = /\/\*\s*MISSION\s+VISION\s*\*\/[\s\S]*?\.mvd\s*\{\s*font-size\s*:\s*15px\s*;\s*color\s*:\s*var\(--grey-muted\)\s*;\s*line-height\s*:\s*1\.75\s*;\s*\}/;

if (pattern.test(html)) {
  html = html.replace(pattern, replacementContent);
  fs.writeFileSync('about.html', html);
  console.log('Successfully updated Mission & Vision section with regex.');
} else {
  console.log('Could not find the target section with regex.');
}
