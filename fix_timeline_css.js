const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

const cssToInject = `
    .tlcard:hover {
      transform: translateY(-8px) scale(1.03) !important;
      border-color: rgba(0, 212, 255, 0.4) !important;
      box-shadow: 0 20px 40px -10px rgba(0,0,0,0.9), 0 0 40px rgba(0, 212, 255, 0.15), inset 0 -10px 20px rgba(0, 212, 255, 0.1) !important;
      z-index: 20;
    }
    
    /* 4. Glowing Content Overrides */
    .tlci svg { color: #00D4FF !important; width: 40px !important; height: 40px !important; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .tlcard:hover .tlci svg { filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.8)); transform: scale(1.15); }
    .tlcs { color: #00D4FF !important; transition: all 0.3s; }
    .tlcl { color: rgba(226, 232, 240, 0.9) !important; }
    .tlcard:hover .tlcs { text-shadow: 0 0 20px rgba(0, 212, 255, 0.5); transform: scale(1.05); }
    .tlcard::after {
      content: ''; position: absolute; inset: 0; pointer-events: none;
`;

// Find where .tlcard:hover { starts, and replace it up to background: radial-gradient...
const startIdx = html.indexOf('.tlcard:hover {');
const endString = "background: radial-gradient(ellipse at 50% -20%, rgba(255,255,255,0.05), transparent 60%);";
const endIdx = html.indexOf(endString, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx) + cssToInject + html.substring(endIdx);
  fs.writeFileSync('about.html', html);
  console.log('Restored hover CSS and fixed SVG visibility.');
} else {
  console.log('Could not find CSS blocks to replace.');
}
