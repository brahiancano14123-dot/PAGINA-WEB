/**
 * TEMU 2.0 // Core Frontend Engine
 * Arquitectura modular en Vanilla JS
 */

// 1. BASE DE DATOS DE PRODUCTOS INNOVADORES
const PRODUCTS = [
  {
    id: 't20-01',
    name: 'Cargo Pants Cinéticos X-9',
    category: 'techwear',
    price: 38.50,
    oldPrice: 115.00,
    discount: '-66%',
    spec: 'Tejido ripstop repelente al agua con correas magnéticas Fidlock.',
    details: 'Diseñados con articulación en rodillas, 10 compartimentos modulares y acabado hidrofóbico nanométrico.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't20-02',
    name: 'Llavero Multiherramienta Titanio EDC',
    category: 'gadgets',
    price: 12.99,
    oldPrice: 42.00,
    discount: '-69%',
    spec: 'Aleación Ti-6Al-4V con bisturí retráctil, destornillador y rompi-vidrios.',
    details: 'Pesa apenas 28 gramos. Resistente a la corrosión marina y compatible con puntas hexagonales estándar.',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't20-03',
    name: 'Lámpara Levitación Magnética Halo',
    category: 'home',
    price: 29.90,
    oldPrice: 89.00,
    discount: '-66%',
    spec: 'Suspensión electromagnética con base de carga inalámbrica Qi de 15W.',
    details: 'Iluminación LED ambiental regulable por tacto con transferencia de energía por inducción sin cables.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't20-04',
    name: 'Sneakers Reactivos Cyber-Stride',
    category: 'techwear',
    price: 46.00,
    oldPrice: 140.00,
    discount: '-67%',
    spec: 'Suela de retorno energético de carbono y sistema de ajuste rápido BOA.',
    details: 'Malla transpirable de alta densidad con reflejantes nocturnos 3M y amortiguación adaptativa.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't20-05',
    name: 'PowerBank Transparente 20,000mAh',
    category: 'gadgets',
    price: 32.40,
    oldPrice: 95.00,
    discount: '-65%',
    spec: 'Chasis transparente con pantalla telemetrica OLED y carga rápida 100W.',
    details: 'Monitorea voltaje, amperaje y temperatura de celdas en tiempo real. Capaz de cargar laptops y consolas.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't20-06',
    name: 'Difusor Ultrasónico Niebla RGB',
    category: 'home',
    price: 19.50,
    oldPrice: 55.00,
    discount: '-64%',
    spec: 'Simulación de llama fría por atomización ultrasónica y control por App.',
    details: 'Silencioso (<24dB), apagado automático sin agua y sincronización de espectro luminoso.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't20-07',
    name: 'Visor Nocturno & Gafas Filtro Azul',
    category: 'techwear',
    price: 16.80,
    oldPrice: 49.00,
    discount: '-65%',
    spec: 'Montura ultraligera de TR90 con lentes fotocromáticos anti-reflejo.',
    details: 'Bloquea el 98% de radiación azul de pantallas y se oscurece automáticamente bajo luz solar UV.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 't20-08',
    name: 'Mini Aspiradora & Soplador Jet-Air',
    category: 'gadgets',
    price: 22.00,
    oldPrice: 68.00,
    discount: '-67%',
    spec: 'Motor brushless de 110,000 RPM para limpieza de setups y teclados.',
    details: 'Incluye boquillas de precisión, filtro HEPA lavable y batería recargable USB-C.',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=700&q=80'
  }
];

// 2. ESTADO DE LA APLICACIÓN
const state = {
  cart: JSON.parse(localStorage.getItem('temu20_cart')) || [],
  activeCategory: 'all',
  searchQuery: ''
};

// 3. REFERENCIAS AL DOM
const dom = {
  navbar: document.getElementById('navbar'),
  hamburger: document.getElementById('hamburger'),
  navLinks: document.getElementById('nav-links'),
  productsGrid: document.getElementById('products-grid'),
  filterBar: document.getElementById('filter-bar'),
  searchInput: document.getElementById('search-input'),
  cartTrigger: document.getElementById('cart-trigger'),
  cartDrawer: document.getElementById('cart-drawer'),
  cartBackdrop: document.getElementById('cart-backdrop'),
  closeCart: document.getElementById('close-cart'),
  cartItems: document.getElementById('cart-items'),
  cartCount: document.getElementById('cart-count'),
  cartTotal: document.getElementById('cart-total'),
  checkoutBtn: document.getElementById('checkout-btn'),
  productModal: document.getElementById('product-modal'),
  closeProductModal: document.getElementById('close-product-modal'),
  modalBodyContent: document.getElementById('modal-body-content'),
  toastContainer: document.getElementById('toast-container'),
  liveLogList: document.getElementById('live-log-list'),
  claimDropBtn: document.getElementById('claim-drop-btn'),
  newsletterForm: document.getElementById('newsletter-form'),
  newsletterFeedback: document.getElementById('newsletter-feedback')
};

// 4. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  initScrollEffects();
  initCounters();
  initCountdown();
  initLiveLogs();
  bindEvents();
});

// 5. RENDERIZADO DE CATÁLOGO Y FILTROS
function renderProducts() {
  const filtered = PRODUCTS.filter(product => {
    const matchesCat = state.activeCategory === 'all' || product.category === state.activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          product.spec.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    dom.productsGrid.innerHTML = `
      <div class="glass-card" style="grid-column: 1/-1; padding: 3rem; text-align: center;">
        <p class="mono text-cyan">// 0 RESULTADOS ENCONTRADOS</p>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">Intenta con otro término técnico o categoría.</p>
      </div>
    `;
    return;
  }

  dom.productsGrid.innerHTML = filtered.map(product => `
    <article class="glass-card product-card">
      <div class="product-img-box">
        <span class="discount-badge">${product.discount}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <button class="quick-view-btn mono" data-id="${product.id}">[+ SPECS]</button>
      </div>
      <div class="product-body">
        <span class="product-cat">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-spec">${product.spec}</p>
        <div class="product-footer">
          <div class="price-group">
            <span class="price-before">$${product.oldPrice.toFixed(2)}</span>
            <span class="price-now">$${product.price.toFixed(2)}</span>
          </div>
          <button class="add-btn" data-add="${product.id}">+ Añadir</button>
        </div>
      </div>
    </article>
  `).join('');
}

// 6. GESTIÓN DEL CARRITO DE COMPRAS
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId) || {
    id: 'drop-solar',
    name: 'Mochila Antirrobo Solar OLED',
    price: 34.90,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80'
  };

  const existing = state.cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  saveAndSyncCart();
  showToast(`✓ Añadido: ${product.name}`);
}

function updateItemQty(id, delta) {
  const index = state.cart.findIndex(item => item.id === id);
  if (index === -1) return;

  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }
  saveAndSyncCart();
}

function saveAndSyncCart() {
  localStorage.setItem('temu20_cart', JSON.stringify(state.cart));
  updateCartUI();
}

function updateCartUI() {
  const totalItems = state.cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = state.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  dom.cartCount.textContent = totalItems;
  dom.cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

  if (state.cart.length === 0) {
    dom.cartItems.innerHTML = `
      <p class="mono" style="color: var(--text-muted); text-align: center; margin-top: 3rem;">
        [CARRITO VACÍO]
      </p>
    `;
    return;
  }

  dom.cartItems.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="mono text-cyan">$${(item.price * item.qty).toFixed(2)}</span>
        <div class="qty-controls">
          <button class="qty-btn" data-qty-id="${item.id}" data-delta="-1">-</button>
          <span class="mono">${item.qty}</span>
          <button class="qty-btn" data-qty-id="${item.id}" data-delta="1">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 7. MODAL DE VISTA RÁPIDA
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  dom.modalBodyContent.innerHTML = `
    <div class="modal-grid">
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <span class="mono text-cyan" style="font-size: 0.8rem;">ID: ${product.id.toUpperCase()}</span>
        <h2 style="margin: 0.4rem 0 0.8rem;">${product.name}</h2>
        <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1rem;">
          ${product.details}
        </p>
        <div style="margin-bottom: 1.5rem;">
          <span class="price-before">$${product.oldPrice.toFixed(2)}</span>
          <span class="current-price mono" style="margin-left: 0.5rem;">$${product.price.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary full-width" id="modal-add-btn" data-id="${product.id}">
          Añadir al Equipamiento
        </button>
      </div>
    </div>
  `;

  dom.productModal.classList.add('open');

  document.getElementById('modal-add-btn').addEventListener('click', () => {
    addToCart(product.id);
    dom.productModal.classList.remove('open');
  });
}

// 8. SIMULACIÓN DE DATOS EN TIEMPO REAL & COUNTDOWN
function initCountdown() {
  let totalSeconds = (2 * 3600) + (45 * 60) + 19;
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');

  setInterval(() => {
    if (totalSeconds <= 0) totalSeconds = 9900;
    totalSeconds--;

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    hEl.textContent = String(hrs).padStart(2, '0');
    mEl.textContent = String(mins).padStart(2, '0');
    sEl.textContent = String(secs).padStart(2, '0');
  }, 1000);
}

function initLiveLogs() {
  const sampleEvents = [
    'Orden #8921 despachada -> Madrid [Cargo Pants X-9]',
    'Stock actualizado: PowerBank 20,000mAh (+45 unidades)',
    'Usuario @alex_tech reclamó Flash Drop Solar',
    'Ruta aérea optimizada: Shenzhen -> Bogotá (-14h)',
    'Orden #8924 despachada -> CDMX [Lámpara Levitación]',
    'Nuevo lote verificado: Llavero Titanio EDC'
  ];

  const pushLog = () => {
    const now = new Date().toTimeString().slice(0, 8);
    const msg = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
    const li = document.createElement('li');
    li.innerHTML = `<span class="text-cyan">[${now}]</span> ${msg}`;
    dom.liveLogList.prepend(li);

    if (dom.liveLogList.children.length > 5) {
      dom.liveLogList.lastElementChild.remove();
    }
  };

  for (let i = 0; i < 4; i++) pushLog();
  setInterval(pushLog, 3800);
}

// 9. EFECTOS DE SCROLL Y CONTADORES ANIMADOS
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    dom.navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initCounters() {
  const counterEl = document.querySelector('[data-target]');
  if (!counterEl) return;

  const target = parseInt(counterEl.getAttribute('data-target'), 10);
  let current = 0;
  const step = Math.ceil(target / 60);

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      counterEl.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      counterEl.textContent = current.toLocaleString();
    }
  }, 25);
}

// 10. EVENTOS GLOBALES
function bindEvents() {
  // Menú hamburguesa móvil
  dom.hamburger.addEventListener('click', () => {
    dom.navLinks.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en enlace
  dom.navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => dom.navLinks.classList.remove('active'));
  });

  // Filtros de categoría
  dom.filterBar.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    dom.filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    state.activeCategory = e.target.dataset.category;
    renderProducts();
  });

  // Buscador en tiempo real
  dom.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  // Delegación de eventos en el Grid de Productos
  dom.productsGrid.addEventListener('click', (e) => {
    const addId = e.target.dataset.add;
    const quickId = e.target.dataset.id;

    if (addId) addToCart(addId);
    if (quickId) openProductModal(quickId);
  });

  // Controles del Drawer de Carrito
  const toggleCart = (open) => {
    dom.cartDrawer.classList.toggle('open', open);
    dom.cartBackdrop.classList.toggle('open', open);
  };

  dom.cartTrigger.addEventListener('click', () => toggleCart(true));
  dom.closeCart.addEventListener('click', () => toggleCart(false));
  dom.cartBackdrop.addEventListener('click', () => toggleCart(false));

  dom.cartItems.addEventListener('click', (e) => {
    const id = e.target.dataset.qtyId;
    const delta = parseInt(e.target.dataset.delta, 10);
    if (id && delta) updateItemQty(id, delta);
  });

  dom.checkoutBtn.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('⚠ Tu carrito está vacío.');
      return;
    }
    state.cart = [];
    saveAndSyncCart();
    toggleCart(false);
    showToast('🚀 Orden procesada. Rastreo enviado a tu terminal.');
  });

  // Modal de producto
  dom.closeProductModal.addEventListener('click', () => {
    dom.productModal.classList.remove('open');
  });

  dom.productModal.addEventListener('click', (e) => {
    if (e.target === dom.productModal) dom.productModal.classList.remove('open');
  });

  // Reclamar Flash Drop
  dom.claimDropBtn.addEventListener('click', () => {
    addToCart('drop-solar');
  });

  // Formulario Newsletter
  dom.newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    dom.newsletterFeedback.textContent = '✓ Terminal vinculada. Recibirás alertas de Drops.';
    dom.newsletterForm.reset();
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast mono';
  toast.textContent = message;
  dom.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}