const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const badNavRegex = /<li class="nav-dropdown">[\s\S]*?<a href="\.\/careers\.html"[^>]*>Careers<\/a>[\s\S]*?<div class="nav-dropdown-content">[\s\S]*?<\/div>\s*<\/li>/i;
const simpleNavLink = '<li><a href="./careers.html">Careers</a></li>';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (badNavRegex.test(content)) {
    content = content.replace(badNavRegex, simpleNavLink);
  }

  fs.writeFileSync(file, content);
  console.log('Fixed nav in', file);
});
