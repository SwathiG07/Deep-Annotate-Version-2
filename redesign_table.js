const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

const tableCSS = `
    /* ==============================================
       REDESIGNED COMPARISON TABLE (LEVITATING GRID)
       ============================================== */
    .compw {
      margin-top: 64px;
      border-radius: 24px;
      overflow: visible !important; /* Allow rows to pop out */
      border: none !important;
      background: #FFFFFF;
      box-shadow: 0 40px 100px rgba(0,0,0,0.06), 0 10px 40px rgba(11,168,211,0.05);
    }
    .comph {
      display: grid;
      grid-template-columns: 2fr 1.5fr 1.5fr;
      background: #F8FAFC !important;
      border-radius: 24px 24px 0 0;
      border-bottom: 2px solid rgba(0,0,0,0.05);
    }
    .comph .chd {
      padding: 24px 32px !important;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
    }
    .comph .chd.da {
      color: #0E1F3E;
      background: rgba(0,212,255,0.05);
      border-radius: 12px 12px 0 0;
    }
    .compr {
      display: grid;
      grid-template-columns: 2fr 1.5fr 1.5fr;
      border-top: none !important;
      border-bottom: 1px solid rgba(0,0,0,0.03);
      background: #FFFFFF !important;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
      position: relative;
      z-index: 1;
    }
    .compr:last-child {
      border-bottom: none;
      border-radius: 0 0 24px 24px;
    }
    .cc {
      padding: 24px 32px !important;
      font-size: 15px !important;
      color: #334155;
      display: flex;
      align-items: center;
      transition: transform 0.4s ease;
    }
    .cc.ft {
      font-weight: 700;
      color: #0E1F3E;
    }
    /* Highlight the middle (DeepAnnotate) column */
    .compr .cc:nth-child(2) {
      background: rgba(0,212,255,0.04);
      font-weight: 600;
      color: #0E1F3E;
    }
    /* Mute the right column */
    .compr .cc:nth-child(3) {
      color: #94a3b8;
    }
    
    /* Hover Effects (Levitation) */
    .compr:hover {
      transform: scale(1.02);
      box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,212,255,0.1);
      z-index: 10;
      border-radius: 16px;
      border-bottom: none;
    }
    .compr:hover + .compr {
      border-top-color: transparent;
    }
    .compr:hover .cc.ft {
      transform: translateX(8px);
      color: #00D4FF;
    }
    
    /* Icons */
    .ck { color: #10b981 !important; font-weight: 900; font-size: 18px; margin-right: 12px; }
    .cx { color: #cbd5e1 !important; font-weight: 900; font-size: 16px; margin-right: 12px; }
`;

if (!html.includes('REDESIGNED COMPARISON TABLE')) {
  html = html.replace('</style>', tableCSS + '\n</style>');
  fs.writeFileSync('about.html', html);
  console.log('Comparison table CSS injected.');
} else {
  console.log('Already injected.');
}
