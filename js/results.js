// Results (Stats + Gallery) component JS (ES6 Module)
export function initResults() {
  // Stats observer hook
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animateNumbers();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(statsSection);
  }
}

function animateNumbers() {
  const targets = [
    { el: document.querySelector('#stats .stat-card:nth-child(1) .stat-number'), end: 12, suffix: '+' },
    { el: document.querySelector('#stats .stat-card:nth-child(2) .stat-number'), end: 99.8, suffix: '%', decimals: 1 },
    { el: document.querySelector('#stats .stat-card:nth-child(3) .stat-number'), end: 3, suffix: '-Day' },
    { el: document.querySelector('#stats .stat-card:nth-child(4) .stat-number'), end: 50, suffix: 'k+' },
    { el: document.querySelector('#stats .stat-card:nth-child(5) .stat-number'), end: 24, suffix: '/7' }
  ];
  
  targets.forEach(t => {
    if (!t.el) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const decimals = t.decimals || 0;
    
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const current = start + (t.end - start) * easeProgress;
      
      t.el.textContent = current.toFixed(decimals) + t.suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  });
}
