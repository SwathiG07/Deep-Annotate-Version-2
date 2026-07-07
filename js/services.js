// Services component JS (ES6 Module)
export function initServices() {
  const svcButtons = document.querySelectorAll('.svc-tab-btn');
  const svcPanels = document.querySelectorAll('.svc-tab-panel');

  svcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      svcButtons.forEach(b => b.classList.remove('active'));
      svcPanels.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });
      
      btn.classList.add('active');
      const targetPanel = document.getElementById('tab-' + targetTab);
      if (targetPanel) {
        targetPanel.style.display = 'grid';
        void targetPanel.offsetWidth; // Force reflow
        targetPanel.classList.add('active');
      }
    });
  });
}
