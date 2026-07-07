// datasets.js - Client Datasets Catalog Filtering & Carousel Logic
export function initDatasets() {
  initSearchAndFilters();
  initFormHandler();
}

function initSearchAndFilters() {
  const searchInput = document.getElementById('ds-search-input');
  const chips = document.querySelectorAll('.filter-chip');
  const categories = document.querySelectorAll('.ds-category-section');
  const cards = document.querySelectorAll('.ds-card');

  if (!searchInput) return;

  const applyFilters = () => {
    const query = searchInput.value.toLowerCase().trim();
    const activeChip = document.querySelector('.filter-chip.active');
    const filterVal = activeChip ? activeChip.getAttribute('data-filter') : 'all';

    categories.forEach(cat => {
      const catVal = cat.getAttribute('data-category') || '';
      let visibleInCat = 0;

      const catCards = cat.querySelectorAll('.ds-card');
      catCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const tags = card.getAttribute('data-tags') || '';

        const matchesQuery = !query || title.includes(query);
        const matchesChip = filterVal === 'all' || tags.includes(filterVal);

        if (matchesQuery && matchesChip) {
          card.style.display = 'flex';
          visibleInCat++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide category section based on visible cards
      if (visibleInCat > 0) {
        cat.style.display = 'block';
      } else {
        cat.style.display = 'none';
      }
    });
  };

  // 1. Text Search Input listener
  searchInput.addEventListener('input', applyFilters);

  // 2. Filter Chips listener
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyFilters();
    });
  });
}

function initFormHandler() {
  const form = document.getElementById('dataset-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nm = form.querySelector('#f-name').value.trim();
      const em = form.querySelector('#f-email').value.trim();
      const co = form.querySelector('#f-company').value.trim();
      const ds = form.querySelector('#f-dataset').value;
      if (!nm || !em || !co || !ds) {
        alert('Please fill in all fields.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        alert('Please enter a valid work email.');
        return;
      }
      const btn = form.querySelector('.btn-download');
      btn.textContent = 'Check your email for the download link!';
      btn.style.background = 'linear-gradient(90deg,#0BA8D3,#14c3ef)';
      btn.disabled = true;
      form.querySelectorAll('.form-input,.form-select').forEach(el => el.disabled = true);
    });
  }
}
