/* ============================================
   Renders boarding-pass style package cards.
   Used on index.html (featured) and packages.html (full grid + filter)
   ============================================ */

async function loadPackages() {
  const res = await fetch('/content/packages.json');
  if (!res.ok) throw new Error('Could not load packages.json');
  const data = await res.json();
  return data.items || [];
}

function packageCardHtml(pkg) {
  return `
    <a class="boarding-pass" href="package.html?slug=${encodeURIComponent(pkg.slug)}">
      <div class="bp-image">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
        <span class="bp-category">${pkg.category}</span>
      </div>
      <div class="bp-body">
        <div class="bp-route">${pkg.from_city} &#9992; ${pkg.to_city}</div>
        <h3>${pkg.title}</h3>
        <p class="bp-desc">${pkg.short_description}</p>
      </div>
      <div class="bp-perforation"></div>
      <div class="bp-footer">
        <div class="bp-price">${formatPrice(pkg.price)}<span>per person</span></div>
        <div class="bp-duration">${pkg.duration}</div>
      </div>
    </a>
  `;
}

async function renderFeaturedPackages(containerId, count = 3) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const packages = await loadPackages();
    container.innerHTML = packages.slice(0, count).map(packageCardHtml).join('');
  } catch (err) {
    container.innerHTML = '<p class="empty-state">Packages load nahi ho paaye. Thodi der baad try karein.</p>';
  }
}

async function renderPackagesPage(containerId, filterRowId) {
  const container = document.getElementById(containerId);
  const filterRow = document.getElementById(filterRowId);
  if (!container) return;

  let packages = [];
  try {
    packages = await loadPackages();
  } catch (err) {
    container.innerHTML = '<p class="empty-state">Packages load nahi ho paaye. Thodi der baad try karein.</p>';
    return;
  }

  const categories = ['All', ...new Set(packages.map(p => p.category))];

  function draw(list) {
    container.innerHTML = list.length
      ? list.map(packageCardHtml).join('')
      : '<p class="empty-state">Is category me abhi koi package available nahi hai.</p>';
  }

  if (filterRow) {
    filterRow.innerHTML = categories.map((cat, i) =>
      `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
    ).join('');

    filterRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      draw(cat === 'All' ? packages : packages.filter(p => p.category === cat));
    });
  }

  draw(packages);
}
