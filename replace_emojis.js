const fs = require('fs');

const map = {
  '&#128683;': '<i data-lucide="ban"></i>',
  '&#128161;': '<i data-lucide="lightbulb"></i>',
  '&#127758;': '<i data-lucide="globe"></i>',
  '&#128640;': '<i data-lucide="rocket"></i>',
  '&#127919;': '<i data-lucide="target"></i>',
  '&#128301;': '<i data-lucide="telescope"></i>',
  '&#128300;': '<i data-lucide="microscope"></i>',
  '&#128274;': '<i data-lucide="lock"></i>',
  '&#129504;': '<i data-lucide="brain"></i>',
  '&#127757;': '<i data-lucide="globe-2"></i>',
  '&#9889;': '<i data-lucide="zap"></i>',
  '&#129309;': '<i data-lucide="handshake"></i>',
  '&#127981;': '<i data-lucide="factory"></i>',
  '&#127973;': '<i data-lucide="hospital"></i>',
  '&#127806;': '<i data-lucide="leaf"></i>',
  '&#128663;': '<i data-lucide="car"></i>',
  '&#129302;': '<i data-lucide="bot"></i>',
  '&#127908;': '<i data-lucide="mic"></i>',
  '&#127968;': '<i data-lucide="home"></i>',
  '&#128717;': '<i data-lucide="shopping-cart"></i>',
  '&#128444;&#65039;': '<i data-lucide="image"></i>',
  '&#127916;': '<i data-lucide="video"></i>',
  '&#128225;': '<i data-lucide="radio-receiver"></i>',
  '&#127760;': '<i data-lucide="network"></i>',
  '&#128065;&#65039;': '<i data-lucide="eye"></i>',
  '&#128737;&#65039;': '<i data-lucide="shield"></i>',
  '&#128101;': '<i data-lucide="users"></i>',
  '&#128202;': '<i data-lucide="bar-chart"></i>',
  '&#128272;': '<i data-lucide="lock-keyhole"></i>',
  '&#128196;': '<i data-lucide="file-text"></i>',
  '&#128273;': '<i data-lucide="key"></i>',
  '&#128203;': '<i data-lucide="clipboard-list"></i>',
  '&#127970;': '<i data-lucide="building-2"></i>',
  '&#127891;': '<i data-lucide="graduation-cap"></i>'
};

let html = fs.readFileSync('about.html', 'utf8');

for (const [emoji, svg] of Object.entries(map)) {
  const regex = new RegExp(emoji, 'g');
  html = html.replace(regex, svg);
}

// Add lucide script
if (!html.includes('lucide@latest')) {
  html = html.replace('</body>', '  <script src="https://unpkg.com/lucide@latest"></script>\n  <script>lucide.createIcons();</script>\n</body>');
}

// Add css for lucide scaling
if (!html.includes('.lucide { width: 1em; height: 1em; }')) {
  html = html.replace('</head>', '  <style>.lucide { width: 1em; height: 1em; stroke-width: 1.5px; }</style>\n</head>');
}

fs.writeFileSync('about.html', html);
console.log('Emojis replaced with Lucide icons.');
