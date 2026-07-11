const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// ============================================================
// RE-APPLY: Core Values Accordion Layout
// ============================================================
const oldValuesHTML = /<section id="values" class="sp">[\s\S]*?<\/section>/;
const newValuesHTML = '<section id="values" class="sp new-val">\n' +
'  <div class="sw val-split">\n' +
'    <div class="val-left rev d1">\n' +
'      <p class="eyebrow">What Drives Us</p>\n' +
'      <h2 class="stitle">Our Core Values</h2>\n' +
'      <p class="ssub">The principles that govern every annotation decision, every team hire, and every client relationship.</p>\n' +
'    </div>\n' +
'    <div class="val-right">\n' +
'      <div class="val-row rev d2"><div class="val-num">01</div><div class="val-content"><div class="val-header"><h3 class="vt">Precision Over Speed</h3><div class="vi">&#128300;</div></div><div class="val-body"><p class="vd">We never ship data we wouldn\'t stake our reputation on. Quality gates are built into every step — not bolted on at the end.</p></div></div></div>\n' +
'      <div class="val-row rev d3"><div class="val-num">02</div><div class="val-content"><div class="val-header"><h3 class="vt">Data Privacy, Always</h3><div class="vi">&#128274;</div></div><div class="val-body"><p class="vd">Your data is never repurposed, shared, or used to train competing models. We\'re in the business of making your AI better — not building our own.</p></div></div></div>\n' +
'      <div class="val-row rev d4"><div class="val-num">03</div><div class="val-content"><div class="val-header"><h3 class="vt">Human Expertise First</h3><div class="vi">&#129504;</div></div><div class="val-body"><p class="vd">AI tools accelerate our work, but human judgment is what makes our annotations trustworthy. Every edge case gets human eyes.</p></div></div></div>\n' +
'      <div class="val-row rev d1"><div class="val-num">04</div><div class="val-content"><div class="val-header"><h3 class="vt">Radical Transparency</h3><div class="vi">&#127757;</div></div><div class="val-body"><p class="vd">Real-time dashboards, weekly calibration calls, and accuracy reports you can share with your board. No black boxes.</p></div></div></div>\n' +
'      <div class="val-row rev d2"><div class="val-num">05</div><div class="val-content"><div class="val-header"><h3 class="vt">Continuous Improvement</h3><div class="vi">&#9889;</div></div><div class="val-body"><p class="vd">Every dataset gets better over time. We analyze error patterns, refine guidelines, and recalibrate teams — continuously.</p></div></div></div>\n' +
'      <div class="val-row rev d3"><div class="val-num">06</div><div class="val-content"><div class="val-header"><h3 class="vt">Customer Success</h3><div class="vi">&#129309;</div></div><div class="val-body"><p class="vd">We\'re not a vendor. We\'re a partner. Your model\'s performance metrics are our KPIs. We win when you win.</p></div></div></div>\n' +
'    </div>\n' +
'  </div>\n' +
'</section>';

html = html.replace(oldValuesHTML, newValuesHTML);

// ============================================================
// RE-APPLY: All session CSS
// ============================================================
const sessionCSS = [
    '/* ── Core Values: Editorial Accordion ── */',
    '.new-val { position: relative; }',
    '.val-split { display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: start; }',
    '.val-left { position: sticky; top: 40vh; }',
    '.val-left .stitle { text-align: left; margin-top: 12px; }',
    '.val-left .ssub { text-align: left; margin: 24px 0 0 0 !important; max-width: 400px; font-size: 18px; line-height: 1.6; }',
    '.val-left .eyebrow { text-align: left; justify-content: flex-start; }',
    '.val-right { display: flex; flex-direction: column; }',
    '.val-row { position: relative; border-bottom: 1px solid rgba(14,31,62,0.08); padding: 40px 0; display: flex; gap: 32px; cursor: pointer; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }',
    '.val-row:first-child { border-top: 1px solid rgba(14,31,62,0.08); }',
    ".val-row::before { content: ''; position: absolute; top: 0; bottom: 0; left: 0; width: 0px; background: #0E1F3E; transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1); }",
    '.val-num { font-size: 64px; font-weight: 900; color: rgba(14,31,62,0.08); line-height: 1; font-variant-numeric: tabular-nums; transition: color 0.5s; }',
    '.val-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }',
    '.val-header { display: flex; align-items: center; justify-content: flex-start; gap: 24px; width: 100%; }',
    '.val-header .vt { font-size: 32px; color: #0E1F3E; margin: 0; font-weight: 600; transition: color 0.3s; }',
    '.val-header .vi { font-size: 32px; filter: none; opacity: 1; transition: all 0.5s cubic-bezier(0.16,1,0.3,1); }',
    '.val-body { max-height: none; overflow: visible; opacity: 1; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }',
    '.val-body .vd { padding-top: 24px; font-size: 18px; color: rgba(14,31,62,0.7); line-height: 1.7; max-width: 90%; }',
    '.val-row:hover::before { width: 4px; box-shadow: 0 0 15px rgba(14,31,62,0.2); }',
    '.val-row:hover { background: linear-gradient(90deg, rgba(14,31,62,0.03), transparent); padding-left: 24px; padding-right: 16px; }',
    '.val-row:hover .val-num { color: rgba(14,31,62,0.2); }',
    '.val-row:hover .val-header .vt { color: #0BA8D3; }',
    '.val-row:hover .val-header .vi { transform: scale(1.2) rotate(10deg); }',
    '.val-row:hover .val-body .vd { color: #0E1F3E; }',
    '@media (max-width: 1024px) { .val-split { grid-template-columns: 1fr; gap: 40px; } .val-left { position: relative; top: 0; } .val-left .stitle, .val-left .ssub, .val-left .eyebrow { text-align: center; margin-left: auto; margin-right: auto; justify-content: center; } .val-num { font-size: 48px; } .val-header .vt { font-size: 22px; } .val-row:hover { padding-left: 16px; } }',
    '',
    '/* ── Comparison Table: Levitating Grid ── */',
    '.compw { margin-top: 64px; border-radius: 24px; overflow: visible !important; border: none !important; background: #FFFFFF; box-shadow: 0 40px 100px rgba(0,0,0,0.06), 0 10px 40px rgba(11,168,211,0.05); }',
    '.comph { display: grid; grid-template-columns: 2fr 1.5fr 1.5fr; background: #F8FAFC !important; border-radius: 24px 24px 0 0; border-bottom: 2px solid rgba(0,0,0,0.05); }',
    '.comph .chd { padding: 24px 32px !important; font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; }',
    '.comph .chd.da { color: #0E1F3E; background: rgba(0,212,255,0.05); border-radius: 12px 12px 0 0; }',
    '.compr { display: grid; grid-template-columns: 2fr 1.5fr 1.5fr; border-top: none !important; border-bottom: 1px solid rgba(0,0,0,0.03); background: #FFFFFF !important; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; position: relative; z-index: 1; }',
    '.compr:last-child { border-bottom: none; border-radius: 0 0 24px 24px; }',
    '.cc { padding: 24px 32px !important; font-size: 15px !important; color: #334155; display: flex; align-items: center; transition: transform 0.4s ease; }',
    '.cc.ft { font-weight: 700; color: #0E1F3E; }',
    '.compr .cc:nth-child(2) { background: rgba(0,212,255,0.04); font-weight: 600; color: #0E1F3E; }',
    '.compr .cc:nth-child(3) { color: #94a3b8; }',
    '.compr:hover { transform: scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,212,255,0.1); z-index: 10; border-radius: 16px; border-bottom: none; }',
    '.compr:hover + .compr { border-top-color: transparent; }',
    '.compr:hover .cc.ft { transform: translateX(8px); color: #00D4FF; }',
    '.ck { color: #10b981 !important; font-weight: 900; font-size: 18px; margin-right: 12px; }',
    '.cx { color: #cbd5e1 !important; font-weight: 900; font-size: 16px; margin-right: 12px; }'
].join('\n    ');

html = html.replace('</style>', '    ' + sessionCSS + '\n</style>');

fs.writeFileSync('about.html', html);
console.log('Re-applied Core Values accordion + Comparison Table redesign.');
