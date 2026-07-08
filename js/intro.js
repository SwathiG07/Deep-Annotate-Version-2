/* intro.js - Introduction section timeline animation controller */

export function initIntro() {
  const introSection = document.getElementById('homepage-intro');
  if (!introSection) return;

  const steps = introSection.querySelectorAll('.timeline-step');
  const progressBar = document.getElementById('timeline-progress-bar');
  const scrollCue = introSection.querySelector('.intro-scroll-cue');

  // Wire scroll cue to scroll down past the intro section
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const targetScroll = introSection.offsetTop + introSection.offsetHeight;
      window.scrollTo({
        top: targetScroll + 10,
        behavior: 'smooth'
      });
    });
  }

  // Intersection Observer to trigger process animation steps in order
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateTimeline();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(introSection);

  function animateTimeline() {
    let activeSteps = 0;
    
    // Stagger activation of timeline steps and fill progress bar
    steps.forEach((step, idx) => {
      setTimeout(() => {
        step.classList.add('active');
        activeSteps++;
        
        if (progressBar) {
          // Progress bar percentage increases for each step
          const pct = ((activeSteps - 1) / (steps.length - 1)) * 100;
          progressBar.style.width = `${pct}%`;
        }
      }, idx * 450); // 450ms staggering delay
    });
  }
}
