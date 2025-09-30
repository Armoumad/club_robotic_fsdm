/* ---------- GALLERY PAGE FUNCTIONALITY ---------- */
let selectedImages = new Set();

function initGalleryPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event');
  
  renderGalleryFilters();
  renderEventGalleries(eventId);
  initGalleryInteractions();
  updateSelectionCount();
}

function renderGalleryFilters() {
  const filterButtons = qs('#filterButtons');
  
  // Bouton "Tous"
  const allBtn = filterButtons.querySelector('[data-filter="all"]');
  allBtn.addEventListener('click', () => filterGalleries('all'));
  
  // Boutons pour chaque événement
  EVENTS.forEach(event => {
    const btn = el('button', 'filter-btn');
    btn.textContent = event.name;
    btn.dataset.filter = event.id;
    btn.addEventListener('click', () => filterGalleries(event.id));
    filterButtons.appendChild(btn);
  });
}

function renderEventGalleries(selectedEventId = null) {
  const eventGalleries = qs('#eventGalleries');
  eventGalleries.innerHTML = '';
  
  // Si un événement spécifique est sélectionné dans l'URL, activer son filtre
  if (selectedEventId && selectedEventId !== 'all') {
    qsa('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === selectedEventId);
    });
  }
  
  EVENTS.forEach(event => {
    // Si un événement spécifique est sélectionné, filtrer
    if (selectedEventId && selectedEventId !== 'all' && event.id !== selectedEventId) {
      return;
    }
    
    const images = generateImagePaths(event);
    const gallerySection = el('section', 'event-gallery fade');
    gallerySection.dataset.eventId = event.id;
    
    gallerySection.innerHTML = `
      <div class="event-gallery-header">
        <div class="event-gallery-title">
          <h2>${event.name}</h2>
          <div class="event-gallery-meta">
            <span><i class="fas fa-calendar"></i> ${formatDate(event.date)}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
            <span><i class="fas fa-images"></i> ${images.length} photos</span>
          </div>
        </div>
        <div class="event-gallery-actions">
          <button class="btn-small select-event-btn" data-event="${event.id}">
            <i class="fas fa-check-square"></i> Tout sélectionner
          </button>
          <button class="btn-small download-event-btn" data-event="${event.id}">
            <i class="fas fa-download"></i> Télécharger tout
          </button>
        </div>
      </div>
      <div class="images-grid">
        ${images.map((img, index) => `
          <div class="image-card" data-image="${img}" data-event="${event.id}">
            <img src="${img}" alt="${event.name} - Photo ${index + 1}" loading="lazy" onerror="this.style.opacity='.3';this.parentElement.style.display='none'">
            <div class="image-checkbox"></div>
            <div class="image-overlay">
              <div class="image-actions">
                <button class="download-btn-overlay" data-image="${img}" data-filename="${event.name}-${index + 1}.jpg">
                  <i class="fas fa-download"></i> Télécharger
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    eventGalleries.appendChild(gallerySection);
  });
}

function initGalleryInteractions() {
  // Sélection/désélection d'images
  document.addEventListener('click', (e) => {
    const imageCard = e.target.closest('.image-card');
    if (imageCard) {
      toggleImageSelection(imageCard);
    }
    
    // Cases à cocher
    const checkbox = e.target.closest('.image-checkbox');
    if (checkbox) {
      const imageCard = checkbox.closest('.image-card');
      toggleImageSelection(imageCard);
    }
    
    // Téléchargement individuel
    const downloadBtn = e.target.closest('.download-btn-overlay');
    if (downloadBtn) {
      e.stopPropagation();
      const imageUrl = downloadBtn.dataset.image;
      const filename = downloadBtn.dataset.filename;
      downloadImage(imageUrl, filename);
    }
    
    // Sélectionner tout un événement
    const selectEventBtn = e.target.closest('.select-event-btn');
    if (selectEventBtn) {
      e.stopPropagation();
      const eventId = selectEventBtn.dataset.event;
      selectAllEventImages(eventId);
    }
    
    // Télécharger tout un événement
    const downloadEventBtn = e.target.closest('.download-event-btn');
    if (downloadEventBtn) {
      e.stopPropagation();
      const eventId = downloadEventBtn.dataset.event;
      downloadEventImages(eventId);
    }
  });
  
  // Sélectionner toutes les images
  const selectAllBtn = qs('#selectAllBtn');
  selectAllBtn.addEventListener('click', selectAllImages);
  
  // Télécharger les images sélectionnées
  const downloadSelectedBtn = qs('#downloadSelectedBtn');
  downloadSelectedBtn.addEventListener('click', downloadSelectedImages);
}

function toggleImageSelection(imageCard) {
  const imageUrl = imageCard.dataset.image;
  const checkbox = imageCard.querySelector('.image-checkbox');
  
  if (selectedImages.has(imageUrl)) {
    selectedImages.delete(imageUrl);
    imageCard.classList.remove('selected');
    checkbox.classList.remove('checked');
  } else {
    selectedImages.add(imageUrl);
    imageCard.classList.add('selected');
    checkbox.classList.add('checked');
  }
  
  updateSelectionCount();
}

function selectAllEventImages(eventId) {
  const eventImages = qsa(`.image-card[data-event="${eventId}"]`);
  eventImages.forEach(card => {
    const imageUrl = card.dataset.image;
    selectedImages.add(imageUrl);
    card.classList.add('selected');
    card.querySelector('.image-checkbox').classList.add('checked');
  });
  updateSelectionCount();
}

function selectAllImages() {
  const allImages = qsa('.image-card');
  allImages.forEach(card => {
    const imageUrl = card.dataset.image;
    selectedImages.add(imageUrl);
    card.classList.add('selected');
    card.querySelector('.image-checkbox').classList.add('checked');
  });
  updateSelectionCount();
}

function updateSelectionCount() {
  const downloadSelectedBtn = qs('#downloadSelectedBtn');
  const count = selectedImages.size;
  if (count > 0) {
    downloadSelectedBtn.innerHTML = `<i class="fas fa-download"></i> Télécharger la sélection (${count})`;
    downloadSelectedBtn.disabled = false;
    downloadSelectedBtn.style.opacity = '1';
  } else {
    downloadSelectedBtn.innerHTML = `<i class="fas fa-download"></i> Télécharger la sélection`;
    downloadSelectedBtn.disabled = true;
    downloadSelectedBtn.style.opacity = '0.6';
  }
}

async function downloadImage(imageUrl, filename) {
  try {
    // Afficher un indicateur de chargement
    const originalText = qs('#downloadSelectedBtn').innerHTML;
    qs('#downloadSelectedBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
    
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Restaurer le texte original
    qs('#downloadSelectedBtn').innerHTML = originalText;
    
    // Afficher une notification de succès
    showDownloadNotification(`"${filename}" téléchargé avec succès!`);
    
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    
    // Restaurer le texte original
    qs('#downloadSelectedBtn').innerHTML = '<i class="fas fa-download"></i> Télécharger la sélection';
    
    // Afficher une notification d'erreur
    showDownloadNotification('Erreur lors du téléchargement', 'error');
  }
}

function showDownloadNotification(message, type = 'success') {
  const notification = el('div', 'download-notification');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? 'var(--accent)' : '#ef4444'};
    color: white;
    border-radius: 12px;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

async function downloadSelectedImages() {
  if (selectedImages.size === 0) {
    showDownloadNotification('Veuillez sélectionner au moins une image', 'error');
    return;
  }
  
  const selectedArray = Array.from(selectedImages);
  let successCount = 0;
  let errorCount = 0;
  
  // Désactiver le bouton pendant le téléchargement
  const downloadBtn = qs('#downloadSelectedBtn');
  const originalText = downloadBtn.innerHTML;
  downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
  downloadBtn.disabled = true;
  
  for (let i = 0; i < selectedArray.length; i++) {
    const imageUrl = selectedArray[i];
    
    // Trouver l'événement et l'index de l'image
    let filename = 'image.jpg';
    for (const event of EVENTS) {
      const images = generateImagePaths(event);
      const index = images.indexOf(imageUrl);
      if (index !== -1) {
        filename = `${event.name}-${index + 1}.jpg`;
        break;
      }
    }
    
    try {
      await downloadImage(imageUrl, filename);
      successCount++;
    } catch (error) {
      console.error(`Erreur sur ${filename}:`, error);
      errorCount++;
    }
    
    // Petit délai entre les téléchargements pour éviter de surcharger
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mettre à jour la progression
    const progress = Math.round(((i + 1) / selectedArray.length) * 100);
    downloadBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${progress}% (${i + 1}/${selectedArray.length})`;
  }
  
  // Restaurer le bouton
  downloadBtn.innerHTML = originalText;
  downloadBtn.disabled = false;
  updateSelectionCount();
  
  // Afficher le résumé
  if (errorCount === 0) {
    showDownloadNotification(`${successCount} image(s) téléchargée(s) avec succès!`);
  } else {
    showDownloadNotification(`${successCount} succès, ${errorCount} erreur(s)`, 'error');
  }
}

async function downloadEventImages(eventId) {
  const event = EVENTS.find(ev => ev.id === eventId);
  if (!event) return;
  
  const images = generateImagePaths(event);
  let successCount = 0;
  let errorCount = 0;
  
  // Désactiver le bouton pendant le téléchargement
  const downloadBtn = qs(`.download-event-btn[data-event="${eventId}"]`);
  const originalText = downloadBtn.innerHTML;
  downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
  downloadBtn.disabled = true;
  
  for (let i = 0; i < images.length; i++) {
    const imageUrl = images[i];
    const filename = `${event.name}-${i + 1}.jpg`;
    
    try {
      await downloadImage(imageUrl, filename);
      successCount++;
    } catch (error) {
      console.error(`Erreur sur ${filename}:`, error);
      errorCount++;
    }
    
    // Petit délai entre les téléchargements
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mettre à jour la progression
    const progress = Math.round(((i + 1) / images.length) * 100);
    downloadBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${progress}%`;
  }
  
  // Restaurer le bouton
  downloadBtn.innerHTML = originalText;
  downloadBtn.disabled = false;
  
  // Afficher le résumé
  if (errorCount === 0) {
    showDownloadNotification(`Toutes les images de "${event.name}" téléchargées!`);
  } else {
    showDownloadNotification(`${successCount} succès, ${errorCount} erreur(s) pour "${event.name}"`, 'error');
  }
}

function filterGalleries(eventId) {
  // Mettre à jour les boutons de filtre
  qsa('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === eventId);
  });
  
  // Afficher/masquer les galeries
  qsa('.event-gallery').forEach(gallery => {
    if (eventId === 'all' || gallery.dataset.eventId === eventId) {
      gallery.style.display = 'block';
      // Animation d'apparition
      gallery.style.animation = 'fadeIn 0.5s ease';
    } else {
      gallery.style.display = 'none';
    }
  });
  
  // Mettre à jour l'URL sans recharger la page
  const newUrl = eventId === 'all' ? 'gallery.html' : `gallery.html?event=${eventId}`;
  window.history.replaceState({}, '', newUrl);
}

// Initialiser la page galerie
document.addEventListener('DOMContentLoaded', initGalleryPage);