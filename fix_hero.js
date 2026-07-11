const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// 1. Delete the "Enterprise AI Data Infrastructure" badge
html = html.replace('<div class="hbadge rev"><div class="hdot"></div>Enterprise AI Data Infrastructure</div>', '');

// 2. Fix the .bp button CSS to make it visible
const newBpCSS = '.bp{display:inline-flex;align-items:center;gap:8px;padding:15px 34px;border-radius:100px;font-size:15px;font-weight:700;color:#FFFFFF !important;background:linear-gradient(90deg,#00D4FF,#0BA8D3) !important;border:none;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 24px rgba(11,168,211,0.35);}';

const oldBpRegex = /\.bp\{display:inline-flex;[^\}]+\}/;
if(oldBpRegex.test(html)) {
  html = html.replace(oldBpRegex, newBpCSS);
  console.log('Replaced .bp CSS');
} else {
  // If regex doesn't match, inject it at the end of the <style> block
  html = html.replace('</style>', newBpCSS + '\n</style>');
  console.log('Injected .bp CSS');
}

fs.writeFileSync('about.html', html);
