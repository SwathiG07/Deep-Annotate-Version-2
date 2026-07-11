const fs = require('fs');

const files = ['careers.html', 'data-forage.html', 'full-time.html'];

const footerReplacement = `
  <div id="footer-placeholder"></div>
  <script>
    fetch('./components/footer.html').then(r=>r.text()).then(h=>{document.getElementById('footer-placeholder').innerHTML=h;});
  </script>
`;

const regex = /<!-- FOOTER PLACEHOLDER -->[\s\S]*?<\/footer>/i;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (regex.test(content)) {
    content = content.replace(regex, footerReplacement.trim());
    fs.writeFileSync(file, content);
    console.log('Fixed footer in', file);
  }
});
