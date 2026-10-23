document.addEventListener('DOMContentLoaded', () => {
  const whatsappPhone = ' 543467434105'; //falta confirmacion si este es el numero correcto
  const whatsappMessage = 'Hola Grupo Simioni. Quisiera recibir más información sobre sus servicios.';
  const whatsappButton = document.createElement('a');
  const whatsappNumber = whatsappPhone.replace(/\D/g, '');

  whatsappButton.className = 'whatsapp-float';
  whatsappButton.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  whatsappButton.target = '_blank';
  whatsappButton.rel = 'noopener noreferrer';
  whatsappButton.setAttribute('aria-label', 'Contactar por WhatsApp');
  whatsappButton.title = 'Contactar por WhatsApp';
  whatsappButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.48 15.02L2.2 22l5.12-1.34A9.9 9.9 0 1 0 12.04 2Zm0 18.02a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.04.8.81-2.97-.2-.31a8.12 8.12 0 1 1 6.86 3.79Zm4.46-6.08c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/></svg>';
  document.body.appendChild(whatsappButton);

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
        // No cerrar los desplegables ancestros ni los anidados dentro de este
        if (other !== item && !item.contains(other) && !other.contains(item)) {
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
