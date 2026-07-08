/* hero.js - Hero section interactive script */

export function initHero() {
  const canvas = document.getElementById('hero-nodes-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];
  const maxParticles = 30;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Initialize faint particles
  for (let i = 0; i < maxParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(14, 31, 62, 0.08)';
    ctx.strokeStyle = 'rgba(14, 31, 62, 0.04)';

    // Update & draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw connecting lines if particles are close
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }
  animate();

  // Mouse Move Parallax Logic
  const robotImg = document.getElementById('hero-robot-parallax');
  const heroSection = document.getElementById('homepage-hero');

  if (robotImg && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Restrict translation to a maximum of 3 pixels for a very elegant parallax effect
      const dx = (x / rect.width) * 3;
      const dy = (y / rect.height) * 3;

      robotImg.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    });

    // Reset when mouse leaves
    heroSection.addEventListener('mouseleave', () => {
      robotImg.style.transform = 'translate3d(0, 0, 0)';
    });
  }

  // Initialize the HUD scanline animation play state
  const frame = document.querySelector('.ar-frame');
  if (frame) {
    frame.classList.add('ar-playing');
  }

  // Global registration so scroll tick transitions can trigger restarts
  window.replayAnnotatedRobot = function(frameEl) {
    if (!frameEl) return;
    frameEl.classList.remove('ar-playing');
    void frameEl.offsetWidth; // force reflow
    frameEl.classList.add('ar-playing');
  };
}
