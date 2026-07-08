// services.js - Standalone Services Page Javascript logic (ES6 Module)
export function initServicesPage() {
  initStickyNav();
  initMetrics();
  initObserverAnimations();
}

// 1. Modality Tab Smooth Scroll & Highlight System
function initStickyNav() {
  const tabCards = document.querySelectorAll('.srv-nav-card');
  const panels = document.querySelectorAll('.srv-section');

  tabCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Calculate scroll offset accounting for fixed top navbar (68px) + sticky tab nav (~68px)
        const offset = 138;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight active tab during scroll using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-140px 0px -70% 0px', // focused around the upper viewport
    threshold: 0
  };

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tabCards.forEach(card => {
          if (card.getAttribute('data-target') === id) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  panels.forEach(p => activeObserver.observe(p));
}



// 3. Scroll Triggered metrics counter animations
function initMetrics() {
  const metricsSection = document.getElementById('metrics-section');
  if (!metricsSection) return;
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateMetrics();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(metricsSection);
}

function animateMetrics() {
  const targets = [
    { el: document.querySelector('.metric-num[data-metric="qa"]'), end: 99.8, suffix: '%', decimals: 1 },
    { el: document.querySelector('.metric-num[data-metric="assets"]'), end: 10, suffix: 'M+' },
    { el: document.querySelector('.metric-num[data-metric="turnaround"]'), end: 24, suffix: ' Hours' }
  ];
  
  targets.forEach(t => {
    if (!t.el) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const decimals = t.decimals || 0;
    
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
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

// 4. General scroll-linked elements animation observer
function initObserverAnimations() {
  const observerOptions = {
    root: null,
    threshold: 0.05,
    rootMargin: "0px"
  };
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in-section').forEach(sec => observer.observe(sec));
}
