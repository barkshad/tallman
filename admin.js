// --- KEYS (Must match constants.ts) ---
const KEYS = {
  PORTFOLIO: 'TALL_ALTINAY_PORTFOLIO',
  SERVICES: 'TALL_ALTINAY_SERVICES',
  TESTIMONIALS: 'TALL_ALTINAY_TESTIMONIALS',
  CONTENT: 'TALL_ALTINAY_CONTENT'
};

// --- DEFAULT DATA (Fallbacks in case LocalStorage is empty) ---
const DEFAULT_CONTENT = {
  tagline: "Capturing the Soul of the Moment",
  aboutImage: "https://picsum.photos/id/338/800/1200",
  contactEmail: "hello@tallaltinay.com",
  aboutText: [
    "Tall began with a simple philosophy: photography should feel less like a record and more like a memory.",
    "Our approach is distinctly minimalist and cinematic."
  ]
};

const DEFAULT_PORTFOLIO = [
  { id: 1, src: "https://picsum.photos/seed/101/800/1200", category: "Portrait", title: "Ethereal Gaze" },
  { id: 2, src: "https://picsum.photos/seed/205/1200/800", category: "Landscape", title: "Midnight Dunes" },
  { id: 3, src: "https://picsum.photos/seed/309/800/1000", category: "Fashion", title: "Urban Noir" }
];

const DEFAULT_SERVICES = [
  { title: "Portrait Session", price: "$350", description: "Individual or couple shoots.", features: ["2 Hour Session", "20 Images"] },
  { title: "Event Coverage", price: "$1,200", description: "Corporate or parties.", features: ["6 Hours", "Full Gallery"] },
  { title: "Editorial", price: "$2,500+", description: "High-end production.", features: ["Full Day", "Commercial Rights"] }
];

// --- STATE MANAGEMENT ---
let siteContent = JSON.parse(localStorage.getItem(KEYS.CONTENT)) || DEFAULT_CONTENT;
let portfolioItems = JSON.parse(localStorage.getItem(KEYS.PORTFOLIO)) || DEFAULT_PORTFOLIO;
let servicePackages = JSON.parse(localStorage.getItem(KEYS.SERVICES)) || DEFAULT_SERVICES;

// --- DOM ELEMENTS ---
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password-input');
const loginError = document.getElementById('login-error');

// --- AUTHENTICATION ---
function checkAuth() {
  if (sessionStorage.getItem('LUMOS_ADMIN_LOGGED_IN') === 'true') {
    showDashboard();
  } else {
    loginScreen.classList.remove('hidden');
    dashboard.classList.add('hidden');
  }
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (passwordInput.value === '12345') {
    sessionStorage.setItem('LUMOS_ADMIN_LOGGED_IN', 'true');
    showDashboard();
  } else {
    loginError.classList.remove('hidden');
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  sessionStorage.removeItem('LUMOS_ADMIN_LOGGED_IN');
  location.reload();
});

function showDashboard() {
  loginScreen.classList.add('hidden');
  dashboard.classList.remove('hidden');
  initDashboard();
}

// --- TABS LOGIC ---
const tabs = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Reset styles
    tabs.forEach(t => {
      t.classList.remove('tab-active');
      t.classList.add('tab-inactive');
    });
    panes.forEach(p => p.classList.add('hidden'));

    // Activate clicked
    tab.classList.add('tab-active');
    tab.classList.remove('tab-inactive');
    document.getElementById(`tab-${tab.dataset.tab}`).classList.remove('hidden');
  });
});

// --- CONTENT EDITOR ---
function initDashboard() {
  // Populate Content Fields
  document.getElementById('site-tagline').value = siteContent.tagline || '';
  document.getElementById('site-email').value = siteContent.contactEmail || '';
  document.getElementById('about-image').value = siteContent.aboutImage || '';
  document.getElementById('about-image-preview').src = siteContent.aboutImage || '';
  document.getElementById('about-text').value = (siteContent.aboutText || []).join('\n\n');

  renderPortfolio();
  renderServices();
}

// Listen for About Image file changes
document.getElementById('about-image-file').addEventListener('change', function(e) {
  if (this.files && this.files[0]) {
     const reader = new FileReader();
     reader.onload = (e) => {
       document.getElementById('about-image').value = e.target.result;
       document.getElementById('about-image-preview').src = e.target.result;
     };
     reader.readAsDataURL(this.files[0]);
  }
});

window.saveContent = function() {
  siteContent.tagline = document.getElementById('site-tagline').value;
  siteContent.contactEmail = document.getElementById('site-email').value;
  siteContent.aboutImage = document.getElementById('about-image').value;
  siteContent.aboutText = document.getElementById('about-text').value.split('\n\n');

  localStorage.setItem(KEYS.CONTENT, JSON.stringify(siteContent));
  alert('Content saved successfully!');
};

// --- PORTFOLIO LOGIC ---
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = '';

  portfolioItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'relative group bg-neutral-900 rounded overflow-hidden border border-neutral-800';
    card.innerHTML = `
      <div class="aspect-square relative">
        <img src="${item.src}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div class="p-3">
        <p class="font-bold truncate text-sm text-white">${item.title}</p>
        <p class="text-xs text-neutral-500 uppercase">${item.category}</p>
      </div>
      <button onclick="deletePhoto(${item.id})" class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded shadow opacity-0 group-hover:opacity-100 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
    `;
    grid.appendChild(card);
  });
}

window.addPhoto = function() {
  const title = document.getElementById('img-title').value;
  const category = document.getElementById('img-category').value;
  const urlInput = document.getElementById('img-url');
  const fileInput = document.getElementById('img-file');
  
  if (!title) return alert('Title is required');

  const addItem = (src) => {
    const newItem = {
      id: Date.now(),
      title,
      category,
      src
    };
    portfolioItems.unshift(newItem); // Add to top
    localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(portfolioItems));
    renderPortfolio();
    
    // Reset inputs
    document.getElementById('img-title').value = '';
    urlInput.value = '';
    fileInput.value = '';
  };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => addItem(e.target.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else if (urlInput.value) {
    addItem(urlInput.value);
  } else {
    alert('Please provide an image URL or upload a file.');
  }
};

window.deletePhoto = function(id) {
  if(confirm('Are you sure you want to delete this photo?')) {
    portfolioItems = portfolioItems.filter(p => p.id !== id);
    localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(portfolioItems));
    renderPortfolio();
  }
};

// --- SERVICES LOGIC ---
function renderServices() {
  const container = document.getElementById('services-list');
  container.innerHTML = '';

  servicePackages.forEach((svc, index) => {
    const el = document.createElement('div');
    el.className = 'bg-neutral-900 p-4 rounded border border-neutral-800 space-y-3';
    el.innerHTML = `
      <h3 class="text-neutral-500 text-xs uppercase font-bold">Package ${index + 1}</h3>
      <input type="text" value="${svc.title}" onchange="updateService(${index}, 'title', this.value)" class="w-full bg-black p-2 border border-neutral-700 rounded text-white font-serif" placeholder="Title">
      <input type="text" value="${svc.price}" onchange="updateService(${index}, 'price', this.value)" class="w-full bg-black p-2 border border-neutral-700 rounded text-white" placeholder="Price">
      <textarea rows="2" onchange="updateService(${index}, 'description', this.value)" class="w-full bg-black p-2 border border-neutral-700 rounded text-white text-sm" placeholder="Description">${svc.description}</textarea>
      <textarea rows="4" onchange="updateService(${index}, 'features', this.value)" class="w-full bg-black p-2 border border-neutral-700 rounded text-white text-xs font-mono" placeholder="Features (one per line)">${svc.features.join('\n')}</textarea>
    `;
    container.appendChild(el);
  });
}

window.updateService = function(index, field, value) {
  if (field === 'features') {
    servicePackages[index][field] = value.split('\n');
  } else {
    servicePackages[index][field] = value;
  }
};

window.saveServices = function() {
  localStorage.setItem(KEYS.SERVICES, JSON.stringify(servicePackages));
  alert('Services saved!');
};

// Start
checkAuth();