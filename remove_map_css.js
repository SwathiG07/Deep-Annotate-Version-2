const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

const mapCssRegex = /\/\* ==============================================\s*ANIMATED GLOBAL MAP[\s\S]*?\}\s*$/m;

// Find the index of </style>
const styleEndIndex = html.indexOf('</style>');
if (styleEndIndex !== -1) {
    const cssBlock = html.substring(0, styleEndIndex);
    const newCssBlock = cssBlock.replace(/\/\*\s*==============================================\s*ANIMATED GLOBAL MAP\s*==============================================\s*\*\/[\s\S]*?(?=\<\/style\>)/, '');
    html = newCssBlock + html.substring(styleEndIndex);
}

fs.writeFileSync('about.html', html);
console.log('Removed Animated Map CSS.');
