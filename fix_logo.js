const fs = require('fs');

const files = ['about.html', 'careers.html', 'data-forage.html', 'full-time.html'];

const regexBrand = /\.nav-brand\s*\{[\s\S]*?height:\s*68px;\}/i;
const regexImg = /\.nav-brand\s+img\s*\{[\s\S]*?110px[\s\S]*?\}/i;

const correctCSS = `
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -.04em;
    }
    .nav-brand img {
      height: 46px;
      width: auto;
      display: block;
    }
`.trim();

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace both bad rules with the correct ones
  let replaced = false;
  
  if (content.includes('.nav-brand{display:flex;align-items:center;overflow:hidden;height:68px;}')) {
    content = content.replace('.nav-brand{display:flex;align-items:center;overflow:hidden;height:68px;}', '');
    replaced = true;
  }
  
  if (content.includes('.nav-brand img{height:110px;margin:-21px 0;width:auto;display:block;}')) {
    content = content.replace('.nav-brand img{height:110px;margin:-21px 0;width:auto;display:block;}', correctCSS);
    replaced = true;
  }

  if (replaced) {
    fs.writeFileSync(file, content);
    console.log('Fixed logo in', file);
  }
});
