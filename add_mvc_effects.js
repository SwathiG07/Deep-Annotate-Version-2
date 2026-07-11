const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

const mvcEffects = `
    /* ==============================================
       ADDITIONAL MISSION/VISION EFFECTS
       ============================================== */
    .mvc {
      transform-style: preserve-3d;
      perspective: 1200px;
    }
    /* 3D Parallax Shift on hover for text and icon */
    .mvc .mvt, .mvc .mvd, .mvc .mvi {
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s !important;
    }
    .mvc:hover .mvt {
      transform: translateZ(40px);
    }
    .mvc:hover .mvd {
      transform: translateZ(25px);
    }
    .mvc:hover .mvi {
      transform: translateZ(60px) scale(1.15);
    }
    
    /* Super clean Inner Gradient Animated Border */
    .mvc::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 2px;
      background: linear-gradient(135deg, rgba(0, 212, 255, 1), rgba(255,255,255,0.1) 40%, rgba(0, 212, 255, 1));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude;
      opacity: 0; transition: opacity 0.5s; z-index: 10; pointer-events: none;
    }
    .mvc:hover::before { opacity: 1; }
    
    /* Icon Breathing Glow Animation */
    @keyframes slowPulse {
      0% { filter: brightness(1) drop-shadow(0 0 10px rgba(0,212,255,0.4)); }
      50% { filter: brightness(1.3) drop-shadow(0 0 30px rgba(0,212,255,0.9)); }
      100% { filter: brightness(1) drop-shadow(0 0 10px rgba(0,212,255,0.4)); }
    }
    .mvc:hover .mvi svg {
      animation: slowPulse 2s infinite ease-in-out;
    }
`;

if(!html.includes('ADDITIONAL MISSION/VISION EFFECTS')) {
  html = html.replace('</style>', mvcEffects + '\n</style>');
  fs.writeFileSync('about.html', html);
  console.log('Added 3D Parallax, Inner Borders, and Pulse to MVC');
} else {
  console.log('Effects already added.');
}
