// programs.js - Client Programs & Training Portal Interaction Layer
export function initPrograms() {
  initCategoryNav();
  initComparisonSelector();
}

// 1. Horizontal Category Nav filter logic
function initCategoryNav() {
  const buttons = document.querySelectorAll('.cat-pill-btn');
  const cards = document.querySelectorAll('.showcase-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-cat');
      
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cardCats = card.getAttribute('data-cats') || '';
        if (category === 'all' || cardCats.includes(category)) {
          card.style.display = 'grid';
          // Force reflow and scale up smoothly
          void card.offsetHeight;
          card.style.opacity = '1';
          card.style.transform = 'translate3d(0,0,0) scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translate3d(0,10px,0) scale(0.98)';
          // Wait for transition before hiding layout element
          setTimeout(() => {
            if (!btn.classList.contains('active')) return;
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// 2. Comparison selection tracker highlights
function initComparisonSelector() {
  const rows = document.querySelectorAll('.comp-table tr');
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.background = 'rgba(255, 255, 255, 0.015)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = 'none';
    });
  });
}
