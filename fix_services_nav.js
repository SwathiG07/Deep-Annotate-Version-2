const fs = require('fs');

let content = fs.readFileSync('services.html', 'utf8');

// Inject the Careers link if it's missing
if (!content.includes('href="./careers.html"')) {
  const target = '<li><a href="./about.html">About</a></li>';
  const replacement = '<li><a href="./careers.html">Careers</a></li>\n      <li><a href="./about.html">About</a></li>';
  content = content.replace(target, replacement);
  fs.writeFileSync('services.html', content);
  console.log('Re-added Careers link to services.html');
}
