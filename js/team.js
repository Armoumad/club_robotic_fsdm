/* ---------- TEAM RENDER ---------- */
function renderTeam() {
  const teamWrap = qs('[data-section="team"]');
  teamWrap.innerHTML = '';
  
  TEAM.forEach((m, i) => {
    const card = el('div', 'member-card fade');
    card.style.animationDelay = `${0.05 * i}s`;
    card.innerHTML = `
      <div class="member-photo">
        <img src="${m.photo}" alt="${m.name}" loading="lazy" onerror="this.style.opacity='.25'">
      </div>
      <div class="member-info">
        <h3>${m.name}</h3>
        <p>${m.role}</p>
      </div>
      <div class="member-actions">
        ${m.github ? `<button class="icon-btn" data-gh="${m.github}" aria-label="GitHub ${m.name}"><i class="fab fa-github"></i></button>` : ''}
        ${m.linkedin ? `<button class="icon-btn" data-li="${m.linkedin}" aria-label="LinkedIn ${m.name}"><i class="fab fa-linkedin"></i></button>` : ''}
        <button class="icon-btn" data-view="${i}" aria-label="Voir ${m.name}"><i class="fas fa-user"></i></button>
      </div>`;
    
    card.addEventListener('click', e => {
      if (e.target.closest('[data-gh]')) {
        window.open(m.github, '_blank');
        return;
      }
      if (e.target.closest('[data-li]')) {
        window.open(m.linkedin, '_blank');
        return;
      }
      openTeamModal(i);
    });
    
    teamWrap.appendChild(card);
  });
}

/* ---------- TEAM MODAL ---------- */
const teamModal = qs('#teamModal');
const tmName = qs('#tmName');
const tmRole = qs('#tmRole');
const tmBio = qs('#tmBio');
const tmSkills = qs('#tmSkills');
const tmLinks = qs('#tmLinks');
const tmAvatar = qs('#tmAvatar');

let lastFocus = null;

function openTeamModal(i) {
  const m = TEAM[i];
  lastFocus = document.activeElement;
  
  tmName.textContent = m.name;
  tmRole.textContent = m.role.toUpperCase();
  tmBio.textContent = m.bio;
  tmSkills.innerHTML = m.expertise.map(s => `<span class="chip">${s}</span>`).join('');
  
  tmLinks.innerHTML = `
    ${m.github ? `<a href="${m.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
    ${m.linkedin ? `<a href="${m.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}`;
  
  tmAvatar.innerHTML = `<img src="${m.photo}" alt="${m.name}" onerror="this.style.opacity='.35'">`;
  
  openBackdrop(teamModal);
}

function closeTeamModal() {
  closeBackdrop(teamModal);
  if (lastFocus) lastFocus.focus();
}