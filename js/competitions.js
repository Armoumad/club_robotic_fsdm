/* ---------- COMPETITIONS ---------- */
function renderCompetitions() {
  const compWrap = qs('[data-section="competitions"]');
  compWrap.innerHTML = '';
  
  COMPETITIONS.forEach((c, i) => {
    const card = el('div', 'comp-card fade');
    card.style.animationDelay = `${0.05 * i}s`;
    const status = c.status.toLowerCase() === 'upcoming' ? 'upcoming' : (c.status.toLowerCase() === 'past' ? 'past' : 'active');
    
    card.innerHTML = `
      ${c.highlight ? '<div class="comp-badge">À VENIR</div>' : ''}
      <div class="comp-cover">
        <img src="${c.cover}" alt="${c.name}" loading="lazy" onerror="this.style.opacity='.3'">
      </div>
      <div class="comp-meta">
        <span class="comp-tag comp-status ${status}">${c.status.toUpperCase()}</span>
        <span class="comp-tag">${formatDate(c.date)}</span>
        <span class="comp-tag">${c.location}</span>
      </div>
      <h3>${c.name}</h3>
      <p class="project-desc" style="font-size:.74rem;">${c.short}</p>
      <div class="team-stack">
        ${c.team.slice(0, 5).map((n, j) => {
          const m = findMember(n);
          return `<img src="${m ? m.photo : 'assets/members/future.jpg'}" alt="${n}" style="z-index:${20 - j};">`;
        }).join('')}
      </div>`;
    
    card.addEventListener('click', () => openCompetitionModal(c.id));
    compWrap.appendChild(card);
  });
}

function findMember(name) {
  return TEAM.find(m => m.name.toLowerCase() === name.toLowerCase());
}

/* ---------- COMPETITION MODAL ---------- */
const competitionModal = qs('#competitionModal');
const cpAvatar = qs('#cpAvatar');
const cpTitle = qs('#cpTitle');
const cpStatus = qs('#cpStatus');
const cpDesc = qs('#cpDesc');
const cpTags = qs('#cpTags');
const cpRoster = qs('#cpRoster');
const cpLinks = qs('#cpLinks');

function openCompetitionModal(id) {
  const c = COMPETITIONS.find(x => x.id === id);
  if (!c) return;
  
  cpTitle.textContent = c.name;
  cpStatus.textContent = c.status.toUpperCase();
  cpDesc.textContent = c.description;
  cpTags.innerHTML = c.tags.map(t => `<span class="chip">${t}</span>`).join('');
  cpRoster.innerHTML = c.team.map(p => `<span class="chip">${p}</span>`).join('');
  cpLinks.innerHTML = '';
  cpAvatar.innerHTML = `<img src="${c.cover}" alt="${c.name}" onerror="this.style.opacity='.3'">`;
  
  openBackdrop(competitionModal);
}