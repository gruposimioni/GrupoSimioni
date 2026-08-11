/*
  Agregá aquí solo el nombre de cada foto descargada.
  Ejemplo: 'foto-nueva.jpg'. La carpeta se indica una vez por galería.
  'carpeta' es el nombre real dentro de assets/img.
*/
const galerias = {
  // Salas velatorias: una carpeta por localidad dentro de assets/img/velatorio
  'sala-sanjose': {
    carpeta: 'velatorio/sanjose', alt: 'Sala velatoria de San José de la Esquina',
    imagenes: ['_DSC6418.jpg', '_DSC6569.jpg', '_DSC6696.jpg', '_DSC6720.jpg', '_DSC6782.jpg', '_DSC6846.jpg', '_DSC6867.jpg']
  },
  'sala-arteaga': { carpeta: 'velatorio/arteaga', alt: 'Sala velatoria de Arteaga', imagenes: [] },
  'sala-cruzalta': { carpeta: 'velatorio/cruzalta', alt: 'Sala velatoria de Cruz Alta', imagenes: [] },
  'sala-berabevu': { carpeta: 'velatorio/berabevu', alt: 'Sala velatoria de Berabevú', imagenes: [] },
  'sala-corral': { carpeta: 'velatorio/corral', alt: 'Sala velatoria de Corral de Bustos', imagenes: [] },
  placas: { carpeta: 'placas', alt: 'Trabajo de arte funerario', imagenes: [] },
  ambulancias: { carpeta: 'ambulancias', alt: 'Ambulancia de Grupo Simioni', imagenes: [] },
  crematorio: { carpeta: 'crematorio', alt: 'Crematorio de Cruz Alta', imagenes: [] },
  audiologia: { carpeta: 'audiologia', alt: 'Soluciones audiológicas', imagenes: [] },
  nosotros: { carpeta: 'nosotros', alt: 'Grupo Simioni', imagenes: ['_DSC6379.jpg'] },
  traslados: { carpeta: 'traslados', alt: 'Unidad de traslados', imagenes: [] },
  sepelios: { carpeta: 'sepelios', alt: 'Servicio de sepelio', imagenes: ['_DSC6219.jpg', '_DSC6335.jpg', '_DSC6355.jpg'] }
};

// Ruta a assets/img calculada desde la ubicación de este script:
// funciona igual desde /Pages y desde /Pages/Services.
const rutaImagenes = new URL('../assets/img/', document.currentScript.src).href;

document.addEventListener('DOMContentLoaded', () => {
  const porTitulo = {
    Sepelios: 'sepelios', Traslados: 'traslados', Ambulancias: 'ambulancias',
    Crematorio: 'crematorio', 'Arte Funerario': 'placas', 'Audiología': 'audiologia',
    'Nuestra Historia': 'nosotros'
  };
  const clave = Object.keys(porTitulo).find((titulo) => document.title.startsWith(titulo));
  if (clave && !document.querySelector('[data-carrusel]')) {
    const destino = document.querySelector('.gallery, .placeholder');
    if (destino) { destino.className = 'carrusel'; destino.dataset.carrusel = porTitulo[clave]; destino.innerHTML = ''; }
  }
  document.querySelectorAll('[data-carrusel]').forEach((carrusel) => {
    const config = galerias[carrusel.dataset.carrusel];
    if (!config || !config.imagenes.length) {
      carrusel.innerHTML = '<p class="carrusel-vacio">Próximamente, imágenes de esta sección.</p>';
      return;
    }
    let actual = 0;
    const ruta = rutaImagenes + config.carpeta + '/';
    const varias = config.imagenes.length > 1;
    const controles = '<button class="carrusel-control anterior" aria-label="Imagen anterior">‹</button><button class="carrusel-control siguiente" aria-label="Imagen siguiente">›</button><div class="carrusel-indicadores"></div>';
    carrusel.innerHTML = `<div class="carrusel-pista"></div>${varias ? controles : ''}`;
    const pista = carrusel.querySelector('.carrusel-pista');
    const indicadores = carrusel.querySelector('.carrusel-indicadores');
    config.imagenes.forEach((nombre, indice) => {
      const imagen = document.createElement('img');
      imagen.src = ruta + nombre;
      imagen.alt = varias ? `${config.alt} (${indice + 1} de ${config.imagenes.length})` : config.alt;
      imagen.loading = indice === 0 ? 'eager' : 'lazy';
      pista.appendChild(imagen);
      if (!varias) return;
      const punto = document.createElement('button');
      punto.type = 'button'; punto.setAttribute('aria-label', `Ver imagen ${indice + 1}`);
      punto.addEventListener('click', () => mostrar(indice));
      indicadores.appendChild(punto);
    });
    const mostrar = (indice) => {
      actual = (indice + config.imagenes.length) % config.imagenes.length;
      pista.style.transform = `translateX(-${actual * 100}%)`;
      if (varias) [...indicadores.children].forEach((punto, i) => punto.classList.toggle('activo', i === actual));
    };
    if (varias) {
      carrusel.querySelector('.anterior').addEventListener('click', () => mostrar(actual - 1));
      carrusel.querySelector('.siguiente').addEventListener('click', () => mostrar(actual + 1));
    }
    mostrar(0);
  });
});
