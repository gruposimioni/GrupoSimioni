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

  const submenus = nav.querySelectorAll('.has-submenu');
  submenus.forEach((item, i) => {
    const button = item.querySelector('.submenu-toggle');
    const panel = item.querySelector('.submenu');
    if (!button || !panel) return;
    panel.id = 'submenu-' + (i + 1);
    button.setAttribute('aria-controls', panel.id);
    button.setAttribute('aria-haspopup', 'true');

    // Resalta "Servicios" cuando la página actual es uno de sus enlaces
    if (panel.querySelector('[aria-current="page"]')) {
      button.classList.add('is-active');
    }

    const setOpen = (open) => {
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    };

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !item.classList.contains('is-open');
      submenus.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          const b = other.querySelector('.submenu-toggle');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
      setOpen(open);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && item.classList.contains('is-open')) {
        setOpen(false);
        button.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (item.classList.contains('is-open') && !item.contains(e.target)) {
        setOpen(false);
      }
    });
  });
});
