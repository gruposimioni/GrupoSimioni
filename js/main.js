document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const headerRow = document.querySelector('.header-row');
  if (!nav || !headerRow) return;
  nav.id = 'main-navigation';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'menu-toggle';
  toggle.textContent = 'Menú';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', nav.id);
  headerRow.appendChild(toggle);
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
});
