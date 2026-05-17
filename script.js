
// ─── CANVAS ESTRELLAS ────────────────────────────
function initEstrellas() {
  var canvas = document.getElementById('canvasEstrellas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var estrellas = [];

  function ajustarTamano() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function crearEstrellas() {
    estrellas = [];
    var cantidad = Math.floor((canvas.width * canvas.height) / 3000);
    for (var i = 0; i < cantidad; i++) {
      var tipo = Math.random();
      var color;
      if (tipo > 0.85)      color = 'rgba(0,255,224,';
      else if (tipo > 0.65) color = 'rgba(180,79,255,';
      else                   color = 'rgba(255,255,255,';

      estrellas.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        radio: Math.random() * 1.4 + 0.2,
        alfa:  Math.random(),
        velocidad: (Math.random() - 0.5) * 0.004,
        color: color
      });
    }
  }

  function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < estrellas.length; i++) {
      var s = estrellas[i];
      s.alfa += s.velocidad;
      if (s.alfa <= 0 || s.alfa >= 1) s.velocidad *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radio, 0, Math.PI * 2);
      ctx.fillStyle = s.color + s.alfa.toFixed(2) + ')';
      ctx.fill();
    }
    requestAnimationFrame(dibujar);
  }

  ajustarTamano();
  crearEstrellas();
  dibujar();

  var timer;
  window.addEventListener('resize', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      ajustarTamano();
      crearEstrellas();
    }, 300);
  });
}


// ─── CURSOR PERSONALIZADO ─────────────────────────
function initCursor() {
  var punto  = document.getElementById('cursorPunto');
  var anillo = document.getElementById('cursorAnillo');
  if (!punto || !anillo) return;

  var mouseX = 0, mouseY = 0;
  var anilloX = 0, anilloY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // El punto sigue instantáneamente
    punto.style.left = mouseX + 'px';
    punto.style.top  = mouseY + 'px';
  });

  // El anillo sigue con retraso suave
  function moverAnillo() {
    anilloX += (mouseX - anilloX) * 0.14;
    anilloY += (mouseY - anilloY) * 0.14;
    anillo.style.left = anilloX + 'px';
    anillo.style.top  = anilloY + 'px';
    requestAnimationFrame(moverAnillo);
  }
  moverAnillo();

  // Agrandar anillo al pasar por elementos interactivos
  var selectores = 'a, button, .cat-btn, .opcion-ed, .opcion-pose, .mini-tarjeta, .producto-card, .edicion-card';
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest(selectores)) {
      anillo.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest(selectores)) {
      anillo.classList.remove('hover');
    }
  });
}


// ─── DATOS DE PRODUCTOS ───────────────────────────
const productos = [
  {
    id: 1,
    emoji: '👨‍🚀',
    fondo: 'linear-gradient(135deg, #050714, #0a1550)',
    serie: 'Space Odyssey',
    nombre: 'Astronauta del Universo',
    precio: 59.99,
    badges: ['new'],
    filtro: 'space'
  },
  {
    id: 2,
    emoji: '🤖',
    fondo: 'linear-gradient(135deg, #0d0d1a, #1a0a2e)',
    serie: 'Cyber Genesis',
    nombre: 'Mech Warrior V2',
    precio: 49.99,
    badges: ['hot'],
    filtro: 'cyber'
  },
  {
    id: 3,
    emoji: '🧙',
    fondo: 'linear-gradient(135deg, #0a0f10, #0a2010)',
    serie: 'Fantasy Realm',
    nombre: 'Archimago del Portal',
    precio: 54.99,
    badges: ['ltd'],
    filtro: 'fantasy'
  },
  {
    id: 4,
    emoji: '🎮',
    fondo: 'linear-gradient(135deg, #100a14, #1a0a0a)',
    serie: 'Gamer Edition',
    nombre: 'Player One Final Boss',
    precio: 44.99,
    badges: ['new', 'hot'],
    filtro: 'gamer'
  },
  {
    id: 5,
    emoji: '🌸',
    fondo: 'linear-gradient(135deg, #14080e, #28081a)',
    serie: 'Anime Core',
    nombre: 'Sakura Warrior',
    precio: 49.99,
    badges: [],
    filtro: 'anime'
  },
  {
    id: 6,
    emoji: '📺',
    fondo: 'linear-gradient(135deg, #0e0e0e, #1a1400)',
    serie: 'Retro Wave',
    nombre: 'Pixel Hero 8-Bit',
    precio: 39.99,
    precioAnterior: 49.99,
    badges: ['ltd'],
    filtro: 'retro'
  },
  {
    id: 7,
    emoji: '💠',
    fondo: 'linear-gradient(135deg, #050714, #001a2e)',
    serie: 'Digital Soul',
    nombre: 'Holo Avatar Premium',
    precio: 89.99,
    badges: ['new'],
    filtro: 'premium'
  },
  {
    id: 8,
    emoji: '🌌',
    fondo: 'linear-gradient(135deg, #080010, #100018)',
    serie: 'Space Wars',
    nombre: 'Nebula Guardian',
    precio: 69.99,
    badges: [],
    filtro: 'space'
  },
  {
    id: 9,
    emoji: '☀',
    fondo: 'linear-gradient(135deg, #050714, #4d3a16)',
    serie: 'Medieval 2.0',
    nombre: 'Caballero del Sol',
    precio: 69.99,
    badges: [],
    filtro: 'space'
  },
  {
    id: 10,
    emoji: '⌛',
    fondo: 'linear-gradient(135deg, #100018, #2c3e50)',
    serie: 'Time Travel',
    nombre: 'Hechicero del Tiempo',
    precio: 64.99,
    badges: ['new'],
    filtro: 'space'
  }
];

// ─── DATOS DE GALERÍA ─────────────────────────────
const galeria = [
  { video: 'SRC/logoanim.mp4',  nombre: 'Manel',  edicion: 'Samurai',   clase: 'alto' },
  { video: 'SRC/Superheroanim.mp4',   nombre: 'Marc',   edicion: 'Superhero', clase: 'alto' },
  { video: 'SRC/Saiyananim.mp4', nombre: 'Judith', edicion: 'Saiyan',    clase: 'alto' },
  { video: 'SRC/Rockstaranim.mp4',  nombre: 'Laura',  edicion: 'Rockstar',  clase: 'alto' }
];

// ─── DATOS DE EDICIONES ───────────────────────────
const ediciones = [
  {
    nombre: 'Standard',
    desc: 'Figura personalizada, pose neutral, base simple. Solo la figura impresa.',
    precio: '€39.99',
    imagen: 'SRC/SamuraiRender.png',   // <-- cambia esto por tu imagen
    grande: false
  },
  {
    nombre: 'Deluxe',
    desc: 'Figura personalizada, pose dinámica a tu gusto y hoja de personaje.',
    precio: '€59.99',
    imagen: 'SRC/Deluxe.png',     // <-- cambia esto por tu imagen
    grande: false
  },
  {
    nombre: 'Premium',
    desc: 'Figura personalizada, pose dinámica a tu gusto, hoja de personaje, poster A3 de la figura y render digital animado del modelo 3D.',
    precio: '€89.99',
    imagen: 'SRC/Premium.png',    // <-- cambia esto por tu imagen
    grande: true
  },
];


// ─── CARRITO ──────────────────────────────────────
var carrito = [];

function addToCart(nombre, precio, emoji) {
  // Buscar si ya existe en el carrito
  var itemExistente = null;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombre) {
      itemExistente = carrito[i];
      break;
    }
  }

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      emoji: emoji || '🎁',
      cantidad: 1
    });
  }

  actualizarCarritoUI();
  showToast('✦ ' + nombre + ' añadido al carrito');
}

function cambiarCantidad(nombre, cambio) {
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombre) {
      carrito[i].cantidad += cambio;
      if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
      }
      break;
    }
  }
  actualizarCarritoUI();
}

function eliminarItem(nombre) {
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombre) {
      carrito.splice(i, 1);
      break;
    }
  }
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  // Actualizar número en el icono
  var total = 0;
  var totalEuros = 0;
  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].cantidad;
    totalEuros += carrito[i].precio * carrito[i].cantidad;
  }

  document.getElementById('cartCount').textContent = total;
  document.getElementById('totalCarrito').textContent = '€' + totalEuros.toFixed(2);

  // Mostrar/ocultar pie del carrito
  var pie = document.getElementById('carritoPie');
  if (carrito.length > 0) {
    pie.style.display = '';
  } else {
    pie.style.display = 'none';
  }

  // Renderizar items
  renderizarCarrito();
}

function renderizarCarrito() {
  var body = document.getElementById('carritoBody');

  if (carrito.length === 0) {
    body.innerHTML = `
      <div class="carrito-vacio">
        <p style="font-size:48px">🌌</p>
        <p>Tu carrito está vacío</p>
        <small>Explora las figuras y añade las tuyas</small>
      </div>
    `;
    return;
  }

  var html = '';
  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];
    html += `
      <div class="carrito-item">
        <div class="item-imagen">${item.emoji}</div>
        <div class="item-info">
          <div class="item-nombre">${item.nombre}</div>
          <div class="item-precio">€${(item.precio * item.cantidad).toFixed(2)}</div>
          <div class="item-cantidad">
            <button class="btn-cantidad" onclick="cambiarCantidad('${item.nombre}', -1)">−</button>
            <span>${item.cantidad}</span>
            <button class="btn-cantidad" onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
          </div>
        </div>
        <button class="item-eliminar" onclick="eliminarItem('${item.nombre}')">×</button>
      </div>
    `;
  }
  body.innerHTML = html;
}


// ─── ABRIR / CERRAR CARRITO ───────────────────────
function abrirCarrito() {
  document.getElementById('carritoDrawer').classList.add('abierto');
  document.getElementById('overlay').classList.add('abierto');
  document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
  document.getElementById('carritoDrawer').classList.remove('abierto');
  document.getElementById('overlay').classList.remove('abierto');
  document.body.style.overflow = '';
}

function checkout() {
  if (carrito.length === 0) return;
  showToast('🚀 Redirigiendo al pago seguro...');
  setTimeout(function() {
    carrito = [];
    actualizarCarritoUI();
    cerrarCarrito();
    showToast('✦ ¡Gracias por tu pedido!');
  }, 2000);
}


// ─── TOAST ────────────────────────────────────────
var toastTimer;

function showToast(mensaje) {
  var toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toast.classList.remove('visible');
  }, 2800);
}


// ─── RENDERIZAR PRODUCTOS ─────────────────────────
function renderizarProductos(filtro) {
  filtro = filtro || 'todos';
  var grid = document.getElementById('gridProductos');
  grid.innerHTML = '';

  var productosFiltrados = [];
  for (var i = 0; i < productos.length; i++) {
    if (filtro === 'todos' || productos[i].filtro === filtro) {
      productosFiltrados.push(productos[i]);
    }
  }

  if (productosFiltrados.length === 0) {
    grid.innerHTML = '<p style="color:rgba(255,255,255,0.4); grid-column:1/-1; padding:32px 0">Pronto habrá figuras en esta categoría.</p>';
    return;
  }

  var nombresLabels = { new: 'Nuevo', hot: 'Popular', ltd: 'Ed. Limitada' };

  for (var j = 0; j < productosFiltrados.length; j++) {
    var p = productosFiltrados[j];

    // Badges HTML
    var badgesHTML = '';
    for (var b = 0; b < p.badges.length; b++) {
      var label = nombresLabels[p.badges[b]] || p.badges[b];
      badgesHTML += '<span class="badge badge-' + p.badges[b] + '">' + label + '</span>';
    }

    // Precio HTML
    var precioHTML = '€' + p.precio.toFixed(2);
    if (p.precioAnterior) {
      precioHTML += '<span class="precio-tachado">€' + p.precioAnterior.toFixed(2) + '</span>';
    }

    var card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <div class="producto-imagen" style="background: ${p.fondo}">
        ${p.emoji}
        <div class="producto-badges">${badgesHTML}</div>
      </div>
      <div class="producto-info">
        <div class="producto-serie">${p.serie}</div>
        <div class="producto-nombre">${p.nombre}</div>
        <div class="producto-bottom">
          <div class="producto-precio">${precioHTML}</div>
          <button class="btn-agregar" onclick="addToCart('${p.nombre}', ${p.precio}, '${p.emoji}')">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  }
}


// ─── RENDERIZAR GALERÍA ───────────────────────────
function renderizarGaleria() {
  var grid = document.getElementById('gridGaleria');
  grid.innerHTML = '';

  for (var i = 0; i < galeria.length; i++) {
    var item = galeria[i];

    var div = document.createElement('div');
    div.className = 'galeria-item ' + item.clase;

    div.innerHTML = `
      <video class="galeria-video" muted loop playsinline preload="metadata">
        <source src="${item.video}" type="video/mp4" />
      </video>
      <div class="galeria-overlay">
        <div>
          <h4>${item.nombre}</h4>
          <p>${item.edicion}</p>
        </div>
      </div>
    `;

    div.addEventListener('mouseenter', function() {
      var video = this.querySelector('.galeria-video');
      video.play();
    });

    div.addEventListener('mouseleave', function() {
      var video = this.querySelector('.galeria-video');
      video.pause();
      video.currentTime = 0; 
  });

    grid.appendChild(div);
  }
}


// ─── RENDERIZAR EDICIONES ─────────────────────────
function renderizarEdiciones() {
  var grid = document.getElementById('gridEdiciones');
  grid.innerHTML = '';

  for (var i = 0; i < ediciones.length; i++) {
    var ed = ediciones[i];
    var card = document.createElement('div');
    card.className = 'edicion-card' + (ed.grande ? ' grande' : '');

    card.innerHTML = `
      <div class="edicion-imagen" style="background-image: url('${ed.imagen}'); background-size: cover; background-position: center;">
        <div class="edicion-overlay">
          <div class="edicion-nombre">${ed.nombre}</div>
          <div class="edicion-desc">${ed.desc}</div>
        </div>
      </div>
      <div class="edicion-pie">
        <span class="edicion-precio">${ed.precio}</span>
        <button class="edicion-boton" onclick="showToast('✦ ${ed.nombre} — próximamente en el configurador')">
          Ver edición →
        </button>
      </div>
    `;
    grid.appendChild(card);
  }
}


// ─── FILTRO DE CATEGORÍAS ─────────────────────────
function initFiltros() {
  var botones = document.querySelectorAll('.cat-btn');

  for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', function() {
      var todos = document.querySelectorAll('.cat-btn');
      for (var j = 0; j < todos.length; j++) {
        todos[j].classList.remove('activo');
      }
      this.classList.add('activo');
      renderizarProductos(this.dataset.filtro);
    });
  }
}


// ─── FIGURA ROTANTE EN HERO ───────────────────────
function initHeroRotante() {
  var figuras = ['🧑‍🚀', '🤖', '🧙', '🎮', '🌸', '📺', '💠', '🌌'];
  var indice = 0;
  var elemento = document.getElementById('heroEmoji');
  if (!elemento) return;

  setInterval(function() {
    indice = (indice + 1) % figuras.length;
    elemento.style.opacity = '0';
    elemento.style.transform = 'scale(0.7)';

    setTimeout(function() {
      elemento.textContent = figuras[indice];
      elemento.style.opacity = '1';
      elemento.style.transform = 'scale(1)';
    }, 300);
  }, 3000);
}


// ─── FORMULARIO CONFIGURADOR ──────────────────────
function initFormulario() {
  var opcionesEd = document.querySelectorAll('.opcion-ed');
  for (var i = 0; i < opcionesEd.length; i++) {
    opcionesEd[i].addEventListener('click', function() {
      var hermanos = this.parentElement.querySelectorAll('.opcion-ed');
      for (var j = 0; j < hermanos.length; j++) {
        hermanos[j].classList.remove('seleccionado');
      }
      this.classList.add('seleccionado');
    });
  }

  var opcionesPose = document.querySelectorAll('.opcion-pose');
  for (var k = 0; k < opcionesPose.length; k++) {
    opcionesPose[k].addEventListener('click', function() {
      var hermanos = this.parentElement.querySelectorAll('.opcion-pose');
      for (var m = 0; m < hermanos.length; m++) {
        hermanos[m].classList.remove('seleccionado');
      }
      this.classList.add('seleccionado');
    });
  }
}


// ─── HEADER: CAMBIO AL HACER SCROLL ──────────────
function initHeaderScroll() {
  window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 30px rgba(0, 255, 224, 0.05)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}


// ─── NEWSLETTER ───────────────────────────────────
function suscribirse() {
  var input = document.getElementById('emailNewsletter');
  var email = input.value.trim();

  if (email === '' || !email.includes('@')) {
    showToast('⚠️ Introduce un email válido');
    input.style.borderColor = '#FF5F6D';
    setTimeout(function() {
      input.style.borderColor = '';
    }, 2000);
    return;
  }

  showToast('✦ ¡Bienvenido al universo YouNiverse!');
  input.value = '';
}


// ─── ANIMACIÓN DE ENTRADA AL HACER SCROLL ────────
function initAnimacionEntrada() {
  var elementos = document.querySelectorAll(
    '.producto-card, .paso-card, .testimonio-card, .red-card, .edicion-card, .galeria-item'
  );

  for (var i = 0; i < elementos.length; i++) {
    elementos[i].style.opacity = '0';
    elementos[i].style.transform = 'translateY(20px)';
    elementos[i].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  for (var j = 0; j < elementos.length; j++) {
    observer.observe(elementos[j]);
  }
}


// ─── SMOOTH SCROLL ────────────────────────────────
function initSmoothScroll() {
  var enlaces = document.querySelectorAll('a[href^="#"]');

  for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener('click', function(e) {
      var destino = this.getAttribute('href');
      var elemento = document.querySelector(destino);
      if (!elemento) return;
      e.preventDefault();
      var posicion = elemento.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: posicion, behavior: 'smooth' });
    });
  }
}


// ─── INICIALIZAR TODO ─────────────────────────────
document.addEventListener('DOMContentLoaded', function() {

  // Fondo de estrellas y cursor
  initEstrellas();
  initCursor();

  // Renderizar contenido dinámico
  renderizarProductos('todos');
  renderizarGaleria();
  renderizarEdiciones();

  // Inicializar interacciones
  initFiltros();
  initFormulario();
  initHeroRotante();
  initHeaderScroll();
  initSmoothScroll();

  // Animaciones de entrada (después de renderizar)
  setTimeout(initAnimacionEntrada, 100);

  // Carrito
  document.getElementById('abrirCarrito').addEventListener('click', abrirCarrito);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') cerrarCarrito();
  });

  console.log('YouNiverse cargado ✦');
});