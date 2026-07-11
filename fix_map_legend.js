const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// Update the legend HTML to be a floating box instead of a full-width bar
const oldLegend = /<div class="gleg" style="position: absolute; bottom: 0; left: 0; width: 100%; z-index: 3; margin: 0; border-top: 1px solid rgba\(14,31,62,0\.04\); background: #FFFFFF; padding: 16px 0;">/g;
const newLegend = `<div class="gleg" style="position: absolute; bottom: 16px; left: 16px; z-index: 3; margin: 0; background: rgba(255,255,255,0.95); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(14,31,62,0.08); box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 8px;">`;

html = html.replace(oldLegend, newLegend);

// Update the javascript to make the lines solid instead of dashed, just in case "dashed" looked like multiple points
const dashedLineRegex = /ctx\.setLineDash\(\[5, 5\]\);/g;
html = html.replace(dashedLineRegex, '');

fs.writeFileSync('about.html', html);
console.log('Fixed legend to be floating box and removed dashes from lines.');
