/* ---------- EVENTS ---------- */
function renderEvents() {
  const eventsWrap = qs('[data-section="events"]');
  eventsWrap.innerHTML = '';
  
  console.log('Événements à afficher:', EVENTS); // Debug
  
  EVENTS.forEach((ev, i) => {
    const images = generateImagePaths(ev);
    console.log(`Événement ${ev.name}:`, images.length, 'images'); // Debug
    
    const displayImages = images.slice(0, 4);
    
    const card = el('div', 'event-card fade');
    card.style.animationDelay = `${0.05 * i}s`;
    card.innerHTML = `
      <div class="event-cover">
        <img src="${ev.cover}" alt="${ev.name}" loading="lazy" onerror="this.style.opacity='.3'; console.error('Erreur cover:', '${ev.cover}')">
      </div>
      <div class="event-meta">
        <span>${formatDate(ev.date)}</span>
        <span>${ev.location}</span>
      </div>
      <h3>${ev.name}</h3>
      <div class="thumbs">
        ${displayImages.map((img, index) => 
          `<img src="${img}" alt="Image ${ev.name} ${index + 1}" loading="lazy" data-full="${img}" onerror="this.style.opacity='.3'; console.error('Erreur image:', '${img}')">`
        ).join('')}
        ${images.length > 4 ? 
          `<div style="width:56px;height:56px;border-radius:14px;display:grid;place-items:center;font-size:.7rem;font-weight:700;background:color-mix(in srgb,var(--accent) 18%,transparent);border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);">+${images.length - 4}</div>` 
          : ''}
      </div>
      <div class="event-actions">
        <a href="gallery.html?event=${ev.id}" class="gallery-link-btn">
          <i class="fas fa-images"></i> Voir toutes les photos (${images.length})
        </a>
      </div>`;
    
    // Ouvrir le lightbox au clic sur les miniatures
    card.addEventListener('click', e => {
      const imgEl = e.target.closest('.thumbs img');
      if (imgEl) {
        const imageUrl = imgEl.dataset.full;
        const event = EVENTS.find(ev => {
          const eventImages = generateImagePaths(ev);
          return eventImages.includes(imageUrl);
        });
        if (event) {
          const images = generateImagePaths(event);
          const imageIndex = images.indexOf(imageUrl);
          openGalleryModal(event.id, imageIndex);
        }
      }
    });
    
    eventsWrap.appendChild(card);
  });
}

// FONCTION POUR GÉNÉRER LES CHEMINS D'IMAGES
function generateImagePaths(event) {
  const images = [];
  if (!event || !event.imagesFolder || !event.imageCount) {
    console.warn('Événement invalide:', event);
    return images;
  }
  
  // S'assurer que le chemin se termine par /
  const folder = event.imagesFolder.endsWith('/') ? event.imagesFolder : event.imagesFolder + '/';
  
  for (let i = 1; i <= event.imageCount; i++) {
    // Générer le chemin de l'image
    const imagePath = `${folder}${i}.jpg`;
    images.push(imagePath);
  }
  return images;
}

// FONCTION POUR OBTENIR LES IMAGES D'UN ÉVÉNEMENT
function getEventImages(eventId) {
  const event = EVENTS.find(ev => ev.id === eventId);
  if (!event) {
    console.warn(`Événement ${eventId} non trouvé`);
    return [];
  }
  
  const images = generateImagePaths(event);
  console.log(`Images pour ${event.name}:`, images);
  return images;
}

// FONCTION DE TEST POUR VÉRIFIER LES IMAGES
function testEventImages() {
  console.log('=== TEST DES IMAGES DES ÉVÉNEMENTS ===');
  
  EVENTS.forEach(event => {
    console.log(`\n=== ${event.name} ===`);
    console.log('ID:', event.id);
    console.log('Cover:', event.cover);
    console.log('Dossier:', event.imagesFolder);
    console.log('Nombre d\'images:', event.imageCount);
    
    const images = generateImagePaths(event);
    console.log('Images générées:', images);
    
    // Tester chaque image
    let loadedCount = 0;
    let errorCount = 0;
    
    images.forEach((img, index) => {
      const testImg = new Image();
      testImg.onload = () => {
        loadedCount++;
        console.log(`✓ ${img} - OK`);
        if (loadedCount + errorCount === images.length) {
          console.log(`Résultat: ${loadedCount}/${images.length} images chargées, ${errorCount} erreurs`);
        }
      };
      testImg.onerror = () => {
        errorCount++;
        console.log(`✗ ${img} - ERREUR`);
        if (loadedCount + errorCount === images.length) {
          console.log(`Résultat: ${loadedCount}/${images.length} images chargées, ${errorCount} erreurs`);
        }
      };
      testImg.src = img;
    });
  });
}

// FONCTION POUR VÉRIFIER LA STRUCTURE DES ÉVÉNEMENTS
function validateEvents() {
  console.log('=== VALIDATION DES ÉVÉNEMENTS ===');
  
  EVENTS.forEach((event, index) => {
    console.log(`\nÉvénement ${index + 1}:`);
    
    // Vérifier les champs requis
    const requiredFields = ['id', 'name', 'date', 'location', 'cover', 'imagesFolder', 'imageCount'];
    const missingFields = requiredFields.filter(field => !event[field]);
    
    if (missingFields.length > 0) {
      console.log(`❌ Champs manquants: ${missingFields.join(', ')}`);
    } else {
      console.log('✅ Tous les champs requis sont présents');
    }
    
    // Vérifier l'unicité de l'ID
    const duplicateIds = EVENTS.filter(ev => ev.id === event.id);
    if (duplicateIds.length > 1) {
      console.log(`❌ ID dupliqué: ${event.id}`);
    } else {
      console.log('✅ ID unique');
    }
    
    // Vérifier le format du dossier
    if (!event.imagesFolder.endsWith('/')) {
      console.log(`⚠️  Dossier sans / final: ${event.imagesFolder}`);
    } else {
      console.log('✅ Format de dossier correct');
    }
    
    // Vérifier le nombre d'images
    if (event.imageCount <= 0) {
      console.log(`❌ Nombre d'images invalide: ${event.imageCount}`);
    } else {
      console.log(`✅ Nombre d'images: ${event.imageCount}`);
    }
  });
}

// Exécuter la validation au chargement (optionnel)
document.addEventListener('DOMContentLoaded', () => {
  console.log('Validation des événements...');
  validateEvents();
  
  // Pour tester les images, décommentez la ligne suivante:
  // testEventImages();
});