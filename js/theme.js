/* ---------- THEME & ACCENT ---------- */
const themeToggle = qs('#themeToggle');
const accentBtns = qsa('.accent-btn');

function initTheme() {
  const savedTheme = localStorage.getItem('theme-mode');
  const savedAccent = localStorage.getItem('accent-color');
  
  if (savedTheme) root.dataset.theme = savedTheme;
  if (savedAccent) root.dataset.accent = savedAccent;
  
  accentBtns.forEach(b => b.classList.toggle('active', b.dataset.accent === root.dataset.accent));
  setThemeIcon();
}

function setThemeIcon() {
  themeToggle.innerHTML = root.dataset.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme-mode', root.dataset.theme);
  setThemeIcon();
});

accentBtns.forEach(btn => btn.addEventListener('click', () => {
  root.dataset.accent = btn.dataset.accent;
  localStorage.setItem('accent-color', btn.dataset.accent);
  accentBtns.forEach(b => b.classList.toggle('active', b === btn));
}));