/*
  Agregá aquí solo el nombre de cada foto descargada.
  Ejemplo: 'foto-nueva.jpg'. La carpeta se indica una vez por galería.
*/
const galerias = {
  vehiculos: { carpeta: 'vehiculos', imagenes: ['_DSC6219.jpg', '_DSC6379.jpg'] },
  salas: { carpeta: 'salas', imagenes: [] },
  'sala-corral': { carpeta: 'sala-corral', imagenes: [] },
  placas: { carpeta: 'placas', imagenes: [] },
  ambulancias: { carpeta: 'ambulancias', imagenes: [] },
  crematorio: { carpeta: 'crematorio', imagenes: [] },
  audiologia: { carpeta: 'audiologia', imagenes: [] },
  historia: { carpeta: 'historia', imagenes: [] },
  traslados: { carpeta: 'traslados', imagenes: [] }
};

document.addEventListener('DOMContentLoaded', () => {
  const porTitulo = {
    Sepelios: 'vehiculos', Traslados: 'traslados', Ambulancias: 'ambulancias',
    Crematorio: 'crematorio', 'Arte Funerario': 'placas', 'Audiología': 'audiologia'
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
    const ruta = `../../assets/img/${config.carpeta}/`;
    carrusel.innerHTML = `<div class="carrusel-pista"></div><button class="carrusel-control anterior" aria-label="Imagen anterior">‹</button><button class="carrusel-control siguiente" aria-label="Imagen siguiente">›</button><div class="carrusel-indicadores"></div>`;
    const pista = carrusel.querySelector('.carrusel-pista');
    const indicadores = carrusel.querySelector('.carrusel-indicadores');
    config.imagenes.forEach((nombre, indice) => {
      const imagen = document.createElement('img');
      imagen.src = ruta + nombre;
      imagen.alt = `Imagen ${indice + 1} de ${carrusel.dataset.carrusel}`;
      imagen.loading = indice === 0 ? 'eager' : 'lazy';
      pista.appendChild(imagen);
      const punto = document.createElement('button');
      punto.type = 'button'; punto.setAttribute('aria-label', `Ver imagen ${indice + 1}`);
      punto.addEventListener('click', () => mostrar(indice));
      indicadores.appendChild(punto);
    });
    const mostrar = (indice) => {
      actual = (indice + config.imagenes.length) % config.imagenes.length;
      pista.style.transform = `translateX(-${actual * 100}%)`;
      [...indicadores.children].forEach((punto, i) => punto.classList.toggle('activo', i === actual));
    };
    carrusel.querySelector('.anterior').addEventListener('click', () => mostrar(actual - 1));
    carrusel.querySelector('.siguiente').addEventListener('click', () => mostrar(actual + 1));
    mostrar(0);
  });
});
