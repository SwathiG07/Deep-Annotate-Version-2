const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// 1. Make description text bright white and slightly larger
html = html.replace('.val-body .vd { \n      padding-top: 24px; font-size: 17px; color: rgba(226, 232, 240, 0.8);', '.val-body .vd { \n      padding-top: 24px; font-size: 18px; color: #FFFFFF;');

// 2. Make the emojis fully opaque and full color by default
html = html.replace('.val-header .vi { font-size: 32px; filter: grayscale(1); opacity: 0.5;', '.val-header .vi { font-size: 32px; filter: none; opacity: 1;');

// 3. Make the large numbers more visible
html = html.replace('.val-num { \n      font-size: 64px; font-weight: 900; color: rgba(255, 255, 255, 0.15);', '.val-num { \n      font-size: 64px; font-weight: 900; color: rgba(255, 255, 255, 0.4);');

// 4. Make the titles a bit larger for readability
html = html.replace('.val-header .vt { font-size: 28px; color: #FFFFFF;', '.val-header .vt { font-size: 32px; color: #FFFFFF;');

fs.writeFileSync('about.html', html);
console.log('Made everything much clearer and brighter.');
