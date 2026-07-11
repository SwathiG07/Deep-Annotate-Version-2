const fs = require('fs');

// 1. Fix the logo in careers.html, data-forage.html, full-time.html, about.html
const filesToFixNav = ['careers.html', 'data-forage.html', 'full-time.html', 'about.html'];

filesToFixNav.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Look for the nav-brand image and ensure it has the correct inline style
  const badLogoRegex1 = /<img src="\.\/DeepAnnototate-1\.png" alt="DeepAnnotate Logo"\s*\/>/g;
  const correctLogo = `<img src="./DeepAnnototate-1.png" alt="DeepAnnotate Logo" style="height: 52px; width: auto;" />`;
  
  if (badLogoRegex1.test(content)) {
    content = content.replace(badLogoRegex1, correctLogo);
    fs.writeFileSync(file, content);
    console.log('Fixed logo in', file);
  }
});

// 2. Fix the title in careers.html
let careersContent = fs.readFileSync('careers.html', 'utf8');
const oldTitle = '<h2 class="c-title">Data Foraging & Freelancing</h2>';
const newTitle = '<h2 class="c-title">Freelancing</h2>';

if (careersContent.includes(oldTitle)) {
  careersContent = careersContent.replace(oldTitle, newTitle);
  
  // Also fix the button text if it says "Explore Data Forage"
  const oldBtn = '<div class="c-btn c-btn-primary">Explore Data Forage &rarr;</div>';
  const newBtn = '<div class="c-btn c-btn-primary">Explore Freelancing &rarr;</div>';
  
  careersContent = careersContent.replace(oldBtn, newBtn);
  
  fs.writeFileSync('careers.html', careersContent);
  console.log('Fixed text in careers.html');
}
