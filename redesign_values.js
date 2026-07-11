const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// 1. New HTML
const newHtml = `
<section id="values" class="sp new-val">
  <div class="sw val-split">
    <div class="val-left rev d1">
      <p class="eyebrow">What Drives Us</p>
      <h2 class="stitle">Our Core Values</h2>
      <p class="ssub">The principles that govern every annotation decision, every team hire, and every client relationship.</p>
    </div>
    <div class="val-right">
      <div class="val-row rev d2">
        <div class="val-num">01</div>
        <div class="val-content">
          <div class="val-header">
            <h3 class="vt">Precision Over Speed</h3>
            <div class="vi">&#128300;</div>
          </div>
          <div class="val-body">
            <p class="vd">We never ship data we wouldn't stake our reputation on. Quality gates are built into every step — not bolted on at the end.</p>
          </div>
        </div>
      </div>
      <div class="val-row rev d3">
        <div class="val-num">02</div>
        <div class="val-content">
          <div class="val-header">
            <h3 class="vt">Data Privacy, Always</h3>
            <div class="vi">&#128274;</div>
          </div>
          <div class="val-body">
            <p class="vd">Your data is never repurposed, shared, or used to train competing models. We're in the business of making your AI better — not building our own.</p>
          </div>
        </div>
      </div>
      <div class="val-row rev d4">
        <div class="val-num">03</div>
        <div class="val-content">
          <div class="val-header">
            <h3 class="vt">Human Expertise First</h3>
            <div class="vi">&#129504;</div>
          </div>
          <div class="val-body">
            <p class="vd">AI tools accelerate our work, but human judgment is what makes our annotations trustworthy. Every edge case gets human eyes.</p>
          </div>
        </div>
      </div>
      <div class="val-row rev d1">
        <div class="val-num">04</div>
        <div class="val-content">
          <div class="val-header">
            <h3 class="vt">Radical Transparency</h3>
            <div class="vi">&#127757;</div>
          </div>
          <div class="val-body">
            <p class="vd">Real-time dashboards, weekly calibration calls, and accuracy reports you can share with your board. No black boxes.</p>
          </div>
        </div>
      </div>
      <div class="val-row rev d2">
        <div class="val-num">05</div>
        <div class="val-content">
          <div class="val-header">
            <h3 class="vt">Continuous Improvement</h3>
            <div class="vi">&#9889;</div>
          </div>
          <div class="val-body">
            <p class="vd">Every dataset gets better over time. We analyze error patterns, refine guidelines, and recalibrate teams — continuously.</p>
          </div>
        </div>
      </div>
      <div class="val-row rev d3">
        <div class="val-num">06</div>
        <div class="val-content">
          <div class="val-header">
            <h3 class="vt">Customer Success</h3>
            <div class="vi">&#129309;</div>
          </div>
          <div class="val-body">
            <p class="vd">We're not a vendor. We're a partner. Your model's performance metrics are our KPIs. We win when you win.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const valuesSectionRegex = /<section id="values" class="sp">[\s\S]*?<\/section>/;
html = html.replace(valuesSectionRegex, newHtml.trim());


// 2. New CSS
const newCss = `
    /* ==============================================
       NEW CORE VALUES: EDITORIAL ACCORDION
       ============================================== */
    .new-val { position: relative; overflow: hidden; }
    .val-split { display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: flex-start; }
    .val-left { position: sticky; top: 120px; }
    .val-left .stitle { text-align: left; margin-top: 12px; }
    .val-left .ssub { text-align: left; margin: 24px 0 0 0 !important; max-width: 400px; font-size: 18px; line-height: 1.6; }
    .val-left .eyebrow { text-align: left; justify-content: flex-start; }
    
    .val-right { display: flex; flex-direction: column; }
    .val-row { 
      position: relative; 
      border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
      padding: 40px 0; 
      display: flex; 
      gap: 32px; 
      cursor: pointer; 
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .val-row:first-child { border-top: 1px solid rgba(255, 255, 255, 0.1); }
    .val-row::before {
      content: ''; position: absolute; top: 0; bottom: 0; left: 0; width: 0px;
      background: #00D4FF; transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .val-num { 
      font-size: 64px; font-weight: 900; color: rgba(255, 255, 255, 0.04); 
      line-height: 1; font-variant-numeric: tabular-nums; transition: color 0.5s;
    }
    
    .val-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .val-header { display: flex; align-items: center; justify-content: space-between; width: 100%; }
    .val-header .vt { font-size: 28px; color: #FFFFFF; margin: 0; font-weight: 600; transition: color 0.3s; }
    .val-header .vi { font-size: 32px; filter: grayscale(1); opacity: 0.5; transition: all 0.5s cubic-bezier(0.16,1,0.3,1); }
    
    .val-body { 
      max-height: 0; overflow: hidden; opacity: 0; 
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); 
    }
    .val-body .vd { 
      padding-top: 24px; font-size: 17px; color: rgba(226, 232, 240, 0.8); 
      line-height: 1.7; max-width: 90%; 
    }
    
    /* Hover Effects */
    .val-row:hover::before { width: 4px; box-shadow: 0 0 15px rgba(0,212,255,0.5); }
    .val-row:hover { 
      background: linear-gradient(90deg, rgba(0,212,255,0.05), transparent); 
      padding-left: 24px; padding-right: 16px;
    }
    .val-row:hover .val-num { color: rgba(0, 212, 255, 0.15); text-shadow: 0 0 15px rgba(0,212,255,0.2); }
    .val-row:hover .val-header .vt { color: #00D4FF; }
    .val-row:hover .val-header .vi { filter: grayscale(0); opacity: 1; transform: scale(1.2) rotate(10deg); }
    .val-row:hover .val-body { max-height: 200px; opacity: 1; }
    
    @media (max-width: 1024px) {
      .val-split { grid-template-columns: 1fr; gap: 40px; }
      .val-left { position: relative; top: 0; }
      .val-left .stitle, .val-left .ssub, .val-left .eyebrow { text-align: center; margin-left: auto; margin-right: auto; justify-content: center; }
      .val-num { font-size: 48px; }
      .val-header .vt { font-size: 22px; }
      .val-row:hover { padding-left: 16px; }
    }
`;

html = html.replace('</style>', newCss + '\n</style>');

fs.writeFileSync('about.html', html);
console.log('Values section completely redesigned!');
