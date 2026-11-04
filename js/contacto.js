document.addEventListener('DOMContentLoaded', () => {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = '../assets/img/logo.png';
  document.head.appendChild(favicon);
  const form = document.querySelector('.form');
  if (!form) return;
  const status = document.createElement('p');
  status.className = 'form-status';
  status.setAttribute('aria-live', 'polite');
  form.appendChild(status);
  form.addEventListener('submit', (event) => {
    const fields = [...form.querySelectorAll('input:not([type="hidden"]), textarea')];
    const complete = fields.every((field) => field.value.trim());
    if (!complete) {
      event.preventDefault();
      status.textContent = 'Completá todos los campos para continuar.';
      fields.find((field) => !field.value.trim())?.focus();
      return;
    }
    status.textContent = 'Enviando mensaje...';
  });
});
