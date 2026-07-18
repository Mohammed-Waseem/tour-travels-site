/* ============================================
   Shared site chrome: header, footer, WhatsApp float
   Loads content/settings.json so admin edits reflect
   across every page automatically.
   ============================================ */

async function loadSettings() {
  const res = await fetch('/content/settings.json');
  if (!res.ok) throw new Error('Could not load settings.json');
  return res.json();
}

function renderHeader(settings, activePage) {
  const el = document.getElementById('site-header');
  if (!el) return;
  const links = [
    ['index.html', 'Home'],
    ['packages.html', 'Packages'],
    ['about.html', 'About'],
    ['gallery.html', 'Gallery'],
    ['contact.html', 'Contact']
  ];
  const navHtml = links.map(([href, label]) => {
    const isActive = activePage === href ? 'class="active"' : '';
    return `<a href="${href}" ${isActive}>${label}</a>`;
  }).join('');

  el.innerHTML = `
    <div class="wrap">
      <a href="index.html" class="logo">${settings.site_name}<span class="dot">.</span></a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu">&#9776;</button>
      <nav class="main-nav" id="main-nav">${navHtml}</nav>
    </div>
  `;

  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

function renderFooter(settings) {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <h4>${settings.site_name}</h4>
          <p style="max-width: 38ch; font-size: 0.92rem;">${settings.tagline}. ${settings.address}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="packages.html">All Packages</a>
          <a href="about.html">About Us</a>
          <a href="gallery.html">Gallery</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:${settings.phone}">${settings.phone}</a>
          <a href="mailto:${settings.email}">${settings.email}</a>
          <a href="https://wa.me/${settings.whatsapp_number}" target="_blank" rel="noopener">WhatsApp Us</a>
        </div>
      </div>
      <div class="footer-bottom">&copy; ${new Date().getFullYear()} ${settings.site_name}. All rights reserved.</div>
    </div>
  `;
}

function renderWhatsAppFloat(settings) {
  const el = document.getElementById('whatsapp-float');
  if (!el) return;
  el.innerHTML = `
    <a class="whatsapp-float" href="https://wa.me/${settings.whatsapp_number}?text=Assalamu Alaikum! Mujhe Umrah/Hajj packages ke baare me jaankari chahiye." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      &#128241;
    </a>
  `;
}

function formatPrice(num) {
  return '\u20B9' + Number(num).toLocaleString('en-IN');
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const settings = await loadSettings();
    window.__settings = settings;
    const activePage = window.location.pathname.split('/').pop() || 'index.html';
    renderHeader(settings, activePage);
    renderFooter(settings);
    renderWhatsAppFloat(settings);
    document.dispatchEvent(new CustomEvent('settings-ready', { detail: settings }));
  } catch (err) {
    console.error(err);
  }
});
