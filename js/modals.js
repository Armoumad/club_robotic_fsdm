/* ---------- MODAL UTILITIES ---------- */
function openBackdrop(b) {
  b.classList.add('open');
  b.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  b.querySelector('[data-close]').focus();
}

function closeBackdrop(b) {
  b.classList.remove('open');
  b.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ---------- GALLERY MODAL ---------- */
const galleryModal = qs('#galleryModal');
const galleryCurrent = qs('#galleryCurrent');
const galleryIndex = qs('#galleryIndex');
const galleryTotal = qs('#galleryTotal');
const galleryPrev = qs('#galleryPrev');
const galleryNext = qs('#galleryNext');
const galleryThumbs = qs('#galleryThumbs');
const galleryDownload = qs('#galleryDownload');

let currentGallery = null;
let currentImageIndex = 0;

function openGalleryModal(eventId, startIndex = 0) {
  const event = EVENTS.find(ev => ev.id === eventId);
  if (!event) return;
  
  const images = generateImagePaths(event); // ← Utiliser la nouvelle fonction
  currentGallery = { ...event, images }; // ← Ajouter les images générées
  currentImageIndex = startIndex;
  
  updateGallery();
  openBackdrop(galleryModal);
}

function updateGallery() {
  if (!currentGallery) return;
  
  const total = currentGallery.images.length;
  const currentImg = currentGallery.images[currentImageIndex];
  
  galleryCurrent.src = currentImg;
  galleryCurrent.alt = `${currentGallery.name} - Photo ${currentImageIndex + 1}`;
  galleryIndex.textContent = currentImageIndex + 1;
  galleryTotal.textContent = total;
  
  // Mettre à jour les boutons de navigation
  galleryPrev.disabled = currentImageIndex === 0;
  galleryNext.disabled = currentImageIndex === total - 1;
  
  // Mettre à jour le lien de téléchargement
  galleryDownload.href = currentImg;
  galleryDownload.download = `${currentGallery.name}-${currentImageIndex + 1}.jpg`;
  
  // Mettre à jour les miniatures
  galleryThumbs.innerHTML = currentGallery.images.map((img, index) => `
    <div class="gallery-thumb ${index === currentImageIndex ? 'active' : ''}" 
         data-index="${index}">
      <img src="${img}" alt="Miniature ${index + 1}" loading="lazy">
    </div>
  `).join('');
  
  // Ajouter les écouteurs d'événements pour les miniatures
  galleryThumbs.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentImageIndex = parseInt(thumb.dataset.index);
      updateGallery();
    });
  });
}

// Navigation dans la galerie
galleryPrev.addEventListener('click', () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateGallery();
  }
});

galleryNext.addEventListener('click', () => {
  if (currentImageIndex < currentGallery.images.length - 1) {
    currentImageIndex++;
    updateGallery();
  }
});

/* ---------- LIGHTBOX ---------- */
const lightbox = qs('#lightbox');
const lbImg = qs('#lightboxImg');
const lbClose = qs('#lightboxClose');

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

/* ---------- REUSE CLOSE BTNS ---------- */
function initModalCloseButtons() {
  qsa('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.backdrop');
      if (parent === teamModal) closeTeamModal();
      else if (parent === projectModal) closeProjectModal();
      else if (parent === competitionModal) closeBackdrop(competitionModal);
      else if (parent === galleryModal) closeBackdrop(galleryModal);
    });
  });
}

/* ---------- KEYBOARD NAVIGATION ---------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeTeamModal();
    closeProjectModal();
    closeLightbox();
    closeBackdrop(competitionModal);
    closeBackdrop(galleryModal);
  }
  
  // Gallery keyboard navigation
  if (galleryModal.classList.contains('open')) {
    if (e.key === 'ArrowLeft') {
      galleryPrev.click();
    } else if (e.key === 'ArrowRight') {
      galleryNext.click();
    }
  }
});