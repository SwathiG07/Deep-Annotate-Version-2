const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToInject = `
    /* DROPDOWN MENU */
    .nav-dropdown { position: relative; display: inline-block; }
    .nav-dropdown-content { display: none; position: absolute; top: 100%; left: 0; background: rgba(6, 14, 28, 0.95); min-width: 180px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 12px 0; z-index: 1000; backdrop-filter: blur(24px); margin-top: 10px; }
    .nav-dropdown-content::before { content: ''; position: absolute; top: -20px; left: 0; width: 100%; height: 20px; }
    .nav-dropdown:hover .nav-dropdown-content { display: block; animation: fadeUp 0.3s ease; }
    .nav-dropdown-content a { color: #F1F5F9 !important; padding: 10px 20px !important; display: block; font-size: 13.5px !important; transition: all 0.2s; font-weight: 500 !important; }
    .nav-dropdown-content a:hover { background: rgba(255,255,255,0.05); color: #25E0E2 !important; padding-left: 24px !important; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;

const navItem = `
      <li class="nav-dropdown">
        <a href="./careers.html">Careers</a>
        <div class="nav-dropdown-content">
          <a href="./careers.html#corporate">Full-Time</a>
          <a href="./data-forage.html">Freelancing</a>
        </div>
      </li>
`;

files.forEach(file => {
  if (file === 'careers.html' || file === 'data-forage.html') return; // already handled
  let content = fs.readFileSync(file, 'utf8');
  
  // Inject CSS before </style> if not already there
  if (content.includes('</style>') && !content.includes('.nav-dropdown-content')) {
    content = content.replace('</style>', cssToInject + '\n</style>');
  }

  // Inject Nav item before About
  const aboutRegex = /(<li[^>]*><a[^>]*href="\.\/about\.html"[^>]*>About<\/a><\/li>)/i;
  if (aboutRegex.test(content) && !content.includes('href="./careers.html"')) {
    content = content.replace(aboutRegex, navItem + '      $1');
  }

  fs.writeFileSync(file, content);
  console.log('Updated', file);
});
