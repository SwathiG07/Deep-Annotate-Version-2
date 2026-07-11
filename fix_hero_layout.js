const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// 1. Add padding-top to #hero to prevent the text from overlapping the fixed navbar
const heroOld = '#hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;';
const heroNew = '#hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;padding-top:80px;';
html = html.replace(heroOld, heroNew);

// 2. Fix the gradient on the hero text to be a bright cyan instead of relying on the broken global variables
const oldGradientRegex = /\.hh \.gr\{background:linear-gradient[^\}]+\}/;
const newGradientCSS = '.hh .gr{background:linear-gradient(135deg, #0BA8D3, #00D4FF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}';
html = html.replace(oldGradientRegex, newGradientCSS);

fs.writeFileSync('about.html', html);
console.log('Fixed hero layout and heading gradient.');
