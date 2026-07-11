const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// 1. Remove the broken ::before gradient border code I injected earlier
const brokenCSSRegex = /\/\* Super clean Inner Gradient Animated Border \*\/[\s\S]*?\.mvc:hover::before \{ opacity: 1; \}/;
html = html.replace(brokenCSSRegex, '');

// 2. Just in case they also meant the border around the icon (.mvi), remove it too.
if (!html.includes('.mvi { border: none !important; }')) {
    html = html.replace('/* Icon Breathing Glow Animation */', '.mvc .mvi { border: none !important; }\n    /* Icon Breathing Glow Animation */');
}

fs.writeFileSync('about.html', html);
console.log('Removed broken cyan square border from MVC.');
