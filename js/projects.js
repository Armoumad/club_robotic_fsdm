/* ---------- PROJECTS ---------- */
function renderProjects() {
  const projectWrap = qs('[data-section="projects"]');
  projectWrap.innerHTML = '';
  
  PROJECTS.forEach((p, i) => {
    const card = el('div', 'project-card fade');
    card.style.animationDelay = `${0.05 * i}s`;
    card.innerHTML = `
      <div class="project-thumb">
        ${p.cover ? `<img src="${p.cover}" alt="${p.title}" loading="lazy" onerror="this.style.opacity='.3'">` : '<i class="fas fa-microchip"></i>'}
      </div>
      <h3>${p.title}</h3>
      <div class="project-meta">${(p.tags || []).map(t => `<span class="badge">${t}</span>`).join('')}</div>
      <div class="project-desc">${p.summary}</div>
      <div class="more-link">Détails <i class="fas fa-arrow-right"></i></div>`;
    
    card.addEventListener('click', () => openProjectModal(p.id));
    projectWrap.appendChild(card);
  });
}

const projectModal = qs('#projectModal');
const prAvatar = qs('#prAvatar');
const prTitle = qs('#prTitle');
const prDesc = qs('#prDesc');
const prTags = qs('#prTags');
const prTech = qs('#prTech');
const prLinks = qs('#prLinks');

let lastFocusProject = null;

function openProjectModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  
  lastFocusProject = document.activeElement;
  prTitle.textContent = p.title;
  prDesc.textContent = p.description;
  prTags.textContent = (p.tags || []).map(t => t.toUpperCase()).join(' • ');
  prTech.innerHTML = (p.tech || []).map(t => `<span class="chip">${t}</span>`).join('');
  
  prLinks.innerHTML = `
    ${p.repo ? `<a href="${p.repo}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
    ${p.demo ? `<a href="${p.demo}" target="_blank"><i class="fas fa-link"></i></a>` : ''}`;
  
  prAvatar.innerHTML = `<img src="${(p.images && p.images[0]) || p.cover}" alt="Aperçu ${p.title}" onerror="this.style.opacity='.3'">`;
  
  openBackdrop(projectModal);
}

function closeProjectModal() {
  closeBackdrop(projectModal);
  if (lastFocusProject) lastFocusProject.focus();
}