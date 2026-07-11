const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// 1. Define replacement for MISSION VISION
const replacementMV = `    /* MISSION VISION */
    #mv{background:#FFFFFF !important; border-top: 1px solid rgba(14,31,62,0.05); border-bottom: 1px solid rgba(14,31,62,0.05); position: relative; overflow: hidden;}
    #mv .stitle { color: #0E1F3E !important; }
    #mv .eyebrow { color: #0BA8D3 !important; }
    #mv .ssub { color: rgba(14,31,62,0.7) !important; }
    .mvg{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:64px;}
    
    .mvc{background:rgba(14, 31, 62, 0.85) !important;border:1px solid rgba(14, 31, 62, 0.9) !important;border-radius:24px;padding:56px 48px;position:relative;overflow:hidden;transition:all 0.5s cubic-bezier(0.16,1,0.3,1); backdrop-filter: blur(20px); z-index: 1;}
    .mvc:hover{transform:translateY(-16px);}
    
    /* Glowing shadows (Cyan for Mission, White for Vision) */
    .mvc.m:hover{border-color:#0BA8D3 !important; box-shadow: 0 25px 60px rgba(11, 168, 211, 0.35);}
    .mvc.v:hover{border-color:#FFFFFF !important; box-shadow: 0 25px 60px rgba(255, 255, 255, 0.25);}
    
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
    
    /* Floating background glowing lights */
    .mvc::before{content:'';position:absolute;top:-60px;right:-60px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(11,168,211,0.12),transparent 70%); z-index: -1; transition: opacity 0.5s;}
    .mvc.v::before{background:radial-gradient(circle,rgba(255,255,255,0.08),transparent 70%);}
    .mvc:hover::before{opacity: 1.5;}
    
    /* Icons styling */
    .mvi{width:54px;height:54px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:28px; transition: all 0.4s cubic-bezier(0.16,1,0.3,1);}
    .mvc.m .mvi{background:rgba(11,168,211,0.08);border:1px solid rgba(11,168,211,0.2); color: #0BA8D3;}
    .mvc.v .mvi{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15); color: #FFFFFF;}
    
    .mvc.m:hover .mvi{background:rgba(11,168,211,0.2); border-color:rgba(11,168,211,0.5); transform:scale(1.1); box-shadow: 0 0 20px rgba(11,168,211,0.4);}
    .mvc.v:hover .mvi{background:rgba(255,255,255,0.2); border-color:rgba(255,255,255,0.5); transform:scale(1.1); box-shadow: 0 0 20px rgba(255,255,255,0.4);}
    
    /* Labels and Headings inside dark card */
    .mvl{font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#0BA8D3;margin-bottom:14px; transition: all 0.4s;}
    .mvc.v .mvl{color:#FFFFFF;}
    .mvc:hover .mvl{letter-spacing: 0.22em;}
    
    .mvt{font-size:26px;font-weight:800;letter-spacing:-0.03em;color:#FFFFFF;margin-bottom:16px; transition: all 0.4s;}
    .mvc.m:hover .mvt{text-shadow: 0 0 10px rgba(11, 168, 211, 0.3);}
    .mvc.v:hover .mvt{text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);}
    
    /* Descriptions inside dark card */
    .mvd{font-size:15px;color:rgba(255,255,255,0.65);line-height:1.75; transition: all 0.4s;}
    .mvc:hover .mvd{color:rgba(255,255,255,0.85);}`;

// 2. Define replacement for STORY (Timeline)
const replacementStory = `    /* STORY */
    #story{background:#FFFFFF !important; position: relative;}
    .tl{position:relative;max-width:820px;margin:80px auto 0;}
    
    /* Animated Energy Beam center line */
    .tl::before {
      content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
      background: linear-gradient(to bottom, transparent, rgba(11,168,211,0.1) 5%, #0BA8D3 10%, #00D4FF 20%, rgba(11,168,211,0.1) 30%, rgba(11,168,211,0.1) 100%);
      background-size: 100% 300%;
      transform: translateX(-50%);
      animation: flowBeam 4s linear infinite;
    }
    @keyframes flowBeam {
      0% { background-position-y: 0%; }
      100% { background-position-y: 300%; }
    }
    
    .tli{display:grid;grid-template-columns:1fr 60px 1fr;gap:0;margin-bottom:80px;align-items:center;}
    .tlc{padding:0 40px;}
    .tli:nth-child(odd) .tlc:first-child{text-align:right;}
    .tli:nth-child(odd) .tlc:last-child{order:3;}
    .tli:nth-child(even) .tlc:first-child{order:3;text-align:left;}
    .tli:nth-child(even) .tlcr{order:1;}
    
    /* Sonar pulsing timeline node */
    .tldot {
      position: relative; width: 16px; height: 16px; border-radius: 50%;
      background: #0BA8D3; border: 3px solid #FFFFFF;
      box-shadow: 0 0 20px rgba(11,168,211,0.8); margin: 0 auto; z-index: 2;
    }
    .tldot.a {
      background: #00D4FF; box-shadow: 0 0 20px rgba(0,212,255,0.8);
    }
    .tldot::before {
      content: ''; position: absolute; top: -6px; left: -6px; right: -6px; bottom: -6px;
      border-radius: 50%; border: 2px solid rgba(11,168,211,0.4);
      animation: sonarPulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      pointer-events: none;
    }
    .tldot.a::before {
      border-color: rgba(0,212,255,0.5);
    }
    @keyframes sonarPulse {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    
    /* Text outside cards (readable dark text on white) */
    .tly{font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#0BA8D3;margin-bottom:8px;}
    .tlti{font-size:20px;font-weight:800;color:#0E1F3E;letter-spacing:-0.02em;margin-bottom:10px;}
    .tlde{font-size:14px;color:rgba(14,31,62,0.7);line-height:1.7;}
    
    /* Levitating Glass Cards on White Background */
    .tlcard {
      background: rgba(14, 31, 62, 0.85); /* dark glass */
      border: 1px solid rgba(14, 31, 62, 0.9);
      border-radius: 18px; padding: 28px 24px; text-align: center;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(20px); position: relative; z-index: 1;
    }
    .tlcard:hover {
      transform: translateY(-12px) scale(1.05);
      border-color: #0BA8D3;
      box-shadow: 0 25px 60px -15px rgba(11, 168, 211, 0.4), 0 0 30px rgba(11, 168, 211, 0.2);
    }
    
    .tlci{font-size:32px;margin-bottom:8px; color: #0BA8D3;}
    
    /* Milestone stats inside dark cards */
    .tlcs{font-size:28px;font-weight:900;color:#FFFFFF; transition: all 0.4s;}
    .tlcard:hover .tlcs { text-shadow: 0 0 15px rgba(0, 212, 255, 0.6); color: #00D4FF; }
    
    .tlcl{font-size:11px;color:rgba(255, 255, 255, 0.7);margin-top:4px;}`;

// Replace Mission Vision CSS block
const mvPattern = /\/\*\s*MISSION\s+VISION\s*\*\/[\s\S]*?\.mvd\s*\{\s*font-size\s*:\s*15px\s*;\s*color\s*:\s*var\(--grey-muted\)\s*;\s*line-height\s*:\s*1\.75\s*;\s*\}/;
if (mvPattern.test(html)) {
  html = html.replace(mvPattern, replacementMV);
} else {
  console.log('Failed to match Mission Vision CSS.');
}

// Replace Story/Timeline CSS block
const storyPattern = /\/\*\s*STORY\s*\*\/[\s\S]*?\.tlcl\s*\{\s*font-size\s*:\s*11px\s*;\s*color\s*:\s*var\(--grey-dim\)\s*;\s*margin-top\s*:\s*4px\s*;\s*\}/;
if (storyPattern.test(html)) {
  html = html.replace(storyPattern, replacementStory);
} else {
  console.log('Failed to match Story/Timeline CSS.');
}

fs.writeFileSync('about.html', html);
console.log('Timeline and Mission/Vision fully styled and updated.');
