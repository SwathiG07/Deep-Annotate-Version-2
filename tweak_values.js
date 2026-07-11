const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// Fix sticky centering
html = html.replace('.val-left { position: sticky; top: 120px; }', '.val-left { position: sticky; top: 40vh; }');

// Fix body visibility (always visible, but muted)
html = html.replace('.val-body { \n      max-height: 0; overflow: hidden; opacity: 0;', '.val-body { \n      max-height: none; overflow: visible; opacity: 0.4;');

// Fix hover opacity for body
html = html.replace('.val-row:hover .val-body { max-height: 200px; opacity: 1; }', '.val-row:hover .val-body { opacity: 1; }');

// Make the un-hovered title slightly muted so hover is more impactful
html = html.replace('.val-header .vt { font-size: 28px; color: #FFFFFF; margin: 0; font-weight: 600; transition: color 0.3s; }', '.val-header .vt { font-size: 28px; color: rgba(255,255,255,0.6); margin: 0; font-weight: 600; transition: color 0.3s; }');


fs.writeFileSync('about.html', html);
console.log('Values CSS tweaked.');
