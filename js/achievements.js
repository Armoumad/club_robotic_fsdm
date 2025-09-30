/* ---------- ACHIEVEMENTS ---------- */
function renderAchievements() {
  const achWrap = qs('[data-section="achievements"]');
  achWrap.innerHTML = '';
  
  ACHIEVEMENTS.forEach((a, i) => {
    const ms = el('div', 'milestone fade');
    ms.style.animationDelay = `${0.06 * i}s`;
    ms.innerHTML = `
      <time>${a.year}</time>
      <h3>${a.title}</h3>
      <p>${a.text}</p>`;
    achWrap.appendChild(ms);
  });
}