/* ---------- NEWS IMPROVED ---------- */
function renderNews() {
  const newsWrap = qs('[data-section="news"]');
  const heroNewsList = qs('#heroNewsList');
  
  // Clear containers
  newsWrap.innerHTML = '';
  heroNewsList.innerHTML = '';
  
  // Sort news by date (newest first) and featured first
  const sortedNews = [...NEWS].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date) - new Date(a.date);
  });
  
  // Render main news grid (section actualités)
  sortedNews.forEach((n, i) => {
    const card = el('article', `news-card fade ${n.featured ? 'featured' : ''}`);
    card.style.animationDelay = `${0.05 * i}s`;
    
    card.innerHTML = `
      <div class="news-cover">
        <img src="${n.cover}" alt="${n.title}" loading="lazy" onerror="this.style.opacity='.3'">
        <div class="news-badge ${n.featured ? 'featured' : ''}">
          ${n.featured ? 'À la une' : n.category}
        </div>
      </div>
      <div class="news-content">
        <div class="news-meta">
          <div class="news-date">${formatDate(n.date)}</div>
          ${!n.featured ? `<div class="news-category">${n.category}</div>` : ''}
        </div>
        <h3>${n.title}</h3>
        <div class="news-excerpt">${n.excerpt}</div>
        <div class="news-tags">
          ${n.tags.slice(0, 3).map(tag => `<span class="news-tag">${tag}</span>`).join('')}
        </div>
        <div class="news-read-more">
          Lire la suite <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => openNewsFull(n));
    newsWrap.appendChild(card);
  });
  
  // Render hero news feed (accueil) - Style liste amélioré
  const heroNews = sortedNews.slice(0, 3);
  heroNews.forEach((n, index) => {
    const li = document.createElement('li');
    li.className = 'hero-news-item';
    li.style.animationDelay = `${0.1 + (index * 0.1)}s`;
    
    li.innerHTML = `
      <div class="hero-news-content">
        <div class="hero-news-meta">
          <span class="hero-news-category">${n.category}</span>
          <span class="hero-news-date">${formatDate(n.date)}</span>
        </div>
        <strong class="hero-news-title">${n.title}</strong>
        <div class="hero-news-excerpt">${n.excerpt}</div>
      </div>
    `;
    
    li.addEventListener('click', () => openNewsFull(n));
    heroNewsList.appendChild(li);
  });
  
  // Ajouter la classe fade aux éléments de la liste hero
  setTimeout(() => {
    qsa('.hero-news-item').forEach((item, i) => {
      item.classList.add('fade');
    });
  }, 100);
}

function openNewsFull(n) {
  prTitle.textContent = n.title;
  prDesc.textContent = n.content;
  prTags.textContent = [formatDate(n.date), n.category.toUpperCase()].join(' • ');
  prTech.innerHTML = n.tags.map(t => `<span class="chip">${t}</span>`).join('');
  prLinks.innerHTML = '';
  
  // Use news cover image in modal
  prAvatar.innerHTML = n.cover ? 
    `<img src="${n.cover}" alt="${n.title}" onerror="this.style.opacity='.3'">` :
    `<div style="width:100%;height:100%;display:grid;place-items:center;color:var(--accent-alt);font-weight:800;font-size:1.1rem;background:color-mix(in srgb,var(--accent) 20%,transparent)">${n.category}</div>`;
  
  openBackdrop(projectModal);
}