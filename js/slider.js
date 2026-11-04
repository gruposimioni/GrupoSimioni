/*
  Agregá aquí solo el nombre de cada foto descargada.
  Ejemplo: 'foto-nueva.jpg'. La carpeta se indica una vez por galería.
  'carpeta' es el nombre real dentro de assets/img.
*/
const galerias = {
  // Salas velatorias: una carpeta por localidad dentro de assets/img/velatorio
  'pagina-principal': { carpeta: 'paginaPrincipal', alt: 'Pagina Principal', imagenes: ['_DSC6586.jpg', '_DSC6600.jpg', '_DSC6603.jpg', '_DSC6669.jpg'] },
  'pagina-principal2': { carpeta: 'paginaPrincipal2', alt: 'Pagina Principal', imagenes: ['_DSC7402.jpg', '_DSC7374.jpg', '_DSC7384.jpg', '_DSC7391.jpg'] },
  'fotos-historia': { carpeta: 'fotosHistoria', alt: 'Pagina Principal', imagenes: ['historia7.png', 'historia1.png', 'historia2.png', 'historia3.png', 'historia4.png', 'historia5.png', 'historia6.png', 'historia8.png'] },
  'fotos-historia2': { carpeta: 'sepelios', alt: 'Pagina Principal', imagenes: ['_DSC6353.jpg', '_DSC6330.jpg', '_DSC6340.jpg', '_DSC6342.jpg'] },
  
  'sala-sanjose': {
    carpeta: 'velatorio/sanjose', alt: 'Sala velatoria de San José de la Esquina',
    imagenes: ['_DSC6808.jpg', '_DSC6682.jpg', '_DSC6690.jpg', '_DSC6692.jpg', '_DSC6707.jpg', '_DSC6714.jpg', '_DSC6569_1.jpg', '_DSC6795.jpg', '_DSC6774.jpg', '_DSC6776.jpg','_DSC6723.jpg', '_DSC6762.jpg','_DSC6752.jpg']
  },


  'sala-arteaga': { carpeta: 'velatorio/arteaga', alt: 'Sala velatoria de Arteaga', 
    imagenes: ['_DSC6507.jpg', '_DSC6535.jpg', '_DSC6541.jpg', '_DSC6542.jpg'] },
  'sala-cruzalta-centro': { carpeta: 'velatorio/cruzalta/centro', alt: 'Salas del Centro, Cruz Alta', 
    imagenes: ['_DSC6444.jpg', '_DSC6449.jpg', '_DSC6454.jpg', '_DSC6456.jpg', '_DSC6458.jpg', '_DSC6477.jpg', '_DSC6494.jpg','_DSC6502.jpg'] },
  'sala-cruzalta-parque': { carpeta: 'velatorio/cruzalta/parque', alt: 'Sala del Parque, Cruz Alta', 
    imagenes: ['_DSC6407.jpg','_DSC6425.jpg','_DSC6426.jpg', '_DSC6418_1.jpg'] },
  'sala-berabevu': { carpeta: 'velatorio/berabevu', alt: 'Sala velatoria de Berabevú', 
    imagenes: ['_DSC6849.jpg', '_DSC6870.jpg', '_DSC6867.jpg','_DSC6861.jpg'] },
  'sala-corral': { carpeta: 'velatorio/corral', alt: 'Sala velatoria de Corral de Bustos', 
    imagenes: ['_DSC7439.jpg', '_DSC7441.jpg', '_DSC7448.jpg','_DSC7477.jpg','_DSC7471.jpg'] },
  ortopedia: { carpeta: 'ortopedia', alt: 'Productos de ortopedia', 
    imagenes: ['_DSC7417.jpg','_DSC7426.jpg','_DSC7425.jpg','_DSC7421.jpg','_DSC6655.jpg', '_DSC6658.jpg', '_DSC6662.jpg'] },
  placas: { carpeta: 'placas', alt: 'Trabajo de arte funerario', 
    imagenes: ['_DSC8534.jpg', '_DSC8535.jpg', '_DSC8538.jpg', '_DSC8540.jpg', '_DSC8542.jpg','_DSC8544.jpg', '_DSC8547.jpg', '_DSC8551.jpg', '_DSC8554.jpg', '_DSC8556.jpg', '_DSC8558.jpg', '_DSC8560.jpg', '_DSC8562.jpg', '_DSC8564.jpg', '_DSC8569.jpg', '_DSC8571.jpg', '_DSC8574.jpg','_DSC8577.jpg', '_DSC8580.jpg', '_DSC8583.jpg','_DSC8586.jpg'] },
  ambulancias: { carpeta: 'ambulancias', alt: 'Ambulancia de Grupo Simioni', 
    imagenes: ['_DSC6319.jpg', '_DSC6326.jpg'] },
  crematorio: { carpeta: 'crematorio', alt: 'Crematorio De La Cruz Alta', 
    imagenes: ['_DSC8596.jpg', '_DSC8599.jpg', '_DSC8601.jpg','_DSC8603.jpg', '_DSC8606.jpg', '_DSC8609.jpg'] },
  audiologia: { carpeta: 'audiologia', alt: 'Soluciones audiológicas', 
    imagenes: ['_DSC6617.jpg','_DSC6628.jpg', '_DSC6631.jpg', '_DSC6647.jpg'] },
  nosotros: { carpeta: 'nosotros', alt: 'Grupo Simioni', imagenes: ['_DSC6379.jpg'] },
  traslados: { carpeta: 'traslados', alt: 'Unidad de traslados', imagenes: ['_DSC6315.jpg', '_DSC6369.jpg'] },
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
