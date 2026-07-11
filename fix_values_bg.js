const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// 1. Force the background to be dark
html = html.replace('.new-val { position: relative; }', '.new-val { position: relative; background: #060e1c !important; }');

// 2. Make the left-side text bright so it's readable on the dark background
html = html.replace('.val-left .stitle { text-align: left; margin-top: 12px; }', '.val-left .stitle { text-align: left; margin-top: 12px; color: #FFFFFF !important; }');
html = html.replace('.val-left .ssub { text-align: left; margin: 24px 0 0 0 !important; max-width: 400px; font-size: 18px; line-height: 1.6; }', '.val-left .ssub { text-align: left; margin: 24px 0 0 0 !important; max-width: 400px; font-size: 18px; line-height: 1.6; color: rgba(226,232,240,0.9) !important; }');

// 3. Bring the emojis closer to the titles instead of floating infinitely on the right
html = html.replace('.val-header { display: flex; align-items: center; justify-content: space-between; width: 100%; }', '.val-header { display: flex; align-items: center; justify-content: flex-start; gap: 24px; width: 100%; }');

fs.writeFileSync('about.html', html);
console.log('Fixed background contrast and icon layout.');
