// Pipeline component JS (ES6 Module)
export function initPipeline() {
  window.addEventListener('scroll', trackPipeline, { passive: true });
  trackPipeline();
}

function trackPipeline() {
  const steps = document.querySelectorAll('#pipeline .pipeline-step');
  const scrollYPosition = window.scrollY + window.innerHeight * 0.5;
  
  steps.forEach(step => {
    const top = step.offsetTop;
    const bottom = top + step.offsetHeight;
    if (scrollYPosition >= top && scrollYPosition <= bottom) {
      const badge = step.querySelector('.p-badge');
      if (badge) {
        badge.style.borderColor = 'var(--cyan)';
        badge.style.boxShadow = '0 0 15px var(--cyan)';
      }
      step.style.transform = 'scale(1.01)';
      step.style.transition = 'all 0.3s ease';
    } else {
      const badge = step.querySelector('.p-badge');
      if (badge) {
        badge.style.borderColor = 'var(--amber)';
        badge.style.boxShadow = 'none';
      }
      step.style.transform = 'none';
    }
  });
}
