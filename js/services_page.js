// services.js - Standalone Services Page Javascript logic (ES6 Module)
export function initServicesPage() {
  initStickyNav();
  initFAQ();
  initMetrics();
  initObserverAnimations();
}

// 1. Sticky Nav Intersection Highlight
function initStickyNav() {
  const sections = document.querySelectorAll('.srv-section');
  const navLinks = document.querySelectorAll('.srv-nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Click smooth scroll binding
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('data-target');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        window.scrollTo({
          top: targetSec.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 2. FAQ Accordion panel toggle animation
function initFAQ() {
  const triggers = document.querySelectorAll('.faq-trigger');
  triggers.forEach(trig => {
    trig.addEventListener('click', () => {
      const item = trig.parentElement;
      const panel = item.querySelector('.faq-panel');
      const icon = trig.querySelector('.faq-icon');
      
      const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';
      
      // Close all other panels
      document.querySelectorAll('.faq-panel').forEach(p => p.style.maxHeight = '0px');
      document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
      
      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        icon.textContent = '−';
      } else {
        panel.style.maxHeight = '0px';
        icon.textContent = '+';
      }
    });
  });
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
    { el: document.querySelector('.metric-num[data-metric="turnaround"]'), end: 24, suffix: ' Hours' },
    { el: document.querySelector('.metric-num[data-metric="resources"]'), end: 100, suffix: '+' },
    { el: document.querySelector('.metric-num[data-metric="languages"]'), end: 35, suffix: '+' }
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
