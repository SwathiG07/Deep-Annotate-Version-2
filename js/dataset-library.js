// dataset-library.js - Premium Dataset Library Interaction Engine
export function initDatasetLibrary() {
  initSearch();
  initModalDetails();
  initCategoryAnchors();
}

// 1. Text search triggers filtering over category blocks and cards
function initSearch() {
  const searchInput = document.getElementById('lib-search');
  const cards = document.querySelectorAll('.ds-grid-card');
  const sections = document.querySelectorAll('.dataset-section');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    sections.forEach(sec => {
      let visibleInSec = 0;
      const secCards = sec.querySelectorAll('.ds-grid-card');
      
      secCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const desc = card.querySelector('.card-desc').textContent.toLowerCase();
        
        if (title.includes(query) || desc.includes(query)) {
          card.style.display = 'flex';
          visibleInSec++;
        } else {
          card.style.display = 'none';
        }
      });

      if (visibleInSec > 0 || !query) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  });
}

// 2. Modal detail panel handler
function initModalDetails() {
  const modal = document.getElementById('dataset-details-modal');
  const openButtons = document.querySelectorAll('.view-details-btn');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const desc = btn.getAttribute('data-desc');
      const size = btn.getAttribute('data-size');
      const accuracy = btn.getAttribute('data-accuracy');

      document.getElementById('modal-dataset-name').textContent = name;
      document.getElementById('modal-dataset-desc').textContent = desc;
      document.getElementById('modal-dataset-size').textContent = size;
      document.getElementById('modal-dataset-accuracy').textContent = accuracy;

      modal.style.display = 'flex';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// 3. Smooth scroll category tile routing
function initCategoryAnchors() {
  const tiles = document.querySelectorAll('.cat-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const targetId = tile.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
