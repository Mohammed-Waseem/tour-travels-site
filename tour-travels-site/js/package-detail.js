/* ============================================
   Renders a single package's detail page.
   Reads ?slug=xyz from the URL and finds the matching item.
   ============================================ */

async function renderPackageDetail() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const container = document.getElementById('detail-root');
  if (!container) return;

  if (!slug) {
    container.innerHTML = '<div class="wrap"><p class="empty-state">Package nahi mila. <a href="packages.html">Sabhi packages dekhein &rarr;</a></p></div>';
    return;
  }

  let packages = [];
  try {
    const res = await fetch('/content/packages.json');
    const data = await res.json();
    packages = data.items || [];
  } catch (err) {
    container.innerHTML = '<div class="wrap"><p class="empty-state">Kuch gadbad ho gayi. Dobara try karein.</p></div>';
    return;
  }

  const pkg = packages.find(p => p.slug === slug);
  if (!pkg) {
    container.innerHTML = '<div class="wrap"><p class="empty-state">Package nahi mila. <a href="packages.html">Sabhi packages dekhein &rarr;</a></p></div>';
    return;
  }

  document.title = pkg.title + ' — ' + (window.__settings ? window.__settings.site_name : 'WanderTag');

  const whatsappNum = window.__settings ? window.__settings.whatsapp_number : '';
  const whatsappMsg = encodeURIComponent(`Hi! Mujhe "${pkg.title}" package ke baare me jaankari chahiye.`);

  const galleryHtml = (pkg.gallery || []).map(src => `<img src="${src}" alt="${pkg.title}">`).join('');
  const highlightsHtml = (pkg.highlights || []).map(h => `<li>${h}</li>`).join('');
  const itineraryHtml = (pkg.itinerary || []).map(day => `
    <div class="itinerary-day">
      <h4>${day.day}</h4>
      <p>${day.detail}</p>
    </div>
  `).join('');
  const inclusionsHtml = (pkg.inclusions || []).map(i => `<li><span>&#10003; ${i}</span></li>`).join('');
  const exclusionsHtml = (pkg.exclusions || []).map(i => `<li><span>&#10007; ${i}</span></li>`).join('');

  container.innerHTML = `
    <section class="detail-hero">
      <div class="wrap">
        <div class="route-code">
          <span>${pkg.from_city}</span><span class="line"></span>&#9992;<span class="line"></span><span>${pkg.to_city}</span>
        </div>
        <h1>${pkg.title}</h1>
        <p class="lede" style="margin-top:10px;">${pkg.short_description}</p>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="detail-grid">
          <div>
            <div class="detail-gallery">
              <img src="${pkg.image}" alt="${pkg.title}">
              ${galleryHtml}
            </div>

            <h2 style="margin-bottom:16px;">Trip Highlights</h2>
            <ul class="tag-list" style="margin-bottom:40px;">
              ${(pkg.highlights || []).map(h => `<span>${h}</span>`).join('')}
            </ul>

            <h2 style="margin-bottom:20px;">Itinerary</h2>
            <div style="margin-bottom:40px;">${itineraryHtml}</div>

            <div class="form-grid-2">
              <div>
                <h3 style="margin-bottom:12px;">Inclusions</h3>
                <ul style="list-style:none;">${inclusionsHtml}</ul>
              </div>
              <div>
                <h3 style="margin-bottom:12px;">Exclusions</h3>
                <ul style="list-style:none;">${exclusionsHtml}</ul>
              </div>
            </div>
          </div>

          <aside>
            <div class="summary-ticket">
              <span class="eyebrow">Starting from</span>
              <div class="price-big">${formatPrice(pkg.price)}</div>
              <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--ink-soft);">per person, twin sharing</span>
              <ul>
                <li><span>Duration</span><span>${pkg.duration}</span></li>
                <li><span>Category</span><span>${pkg.category}</span></li>
                <li><span>Route</span><span>${pkg.from_city} &rarr; ${pkg.to_city}</span></li>
              </ul>
              <a class="btn btn-primary" style="width:100%; justify-content:center; margin-bottom:10px;" href="https://wa.me/${whatsappNum}?text=${whatsappMsg}" target="_blank" rel="noopener">Enquire on WhatsApp</a>
              <a class="btn btn-dark" style="width:100%; justify-content:center;" href="contact.html?package=${encodeURIComponent(pkg.title)}">Send Enquiry Form</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}

document.addEventListener('settings-ready', renderPackageDetail);
