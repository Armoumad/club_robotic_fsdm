/* ---------- HEADER SCROLL ---------- */
const siteHeader = qs('#siteHeader');
const progress = qs('#scrollProgress');

function updateHeader() {
  const y = window.scrollY;
  siteHeader.classList.toggle('scrolled', y > 10);
  
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h ? (y / h) * 100 : 0) + '%';
}

/* ---------- NAV ACTIVE ---------- */
const navLinks = qs('#navLinks');
const menuBtn = qs('#menuBtn');

function initNavigation() {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.innerHTML = navLinks.classList.contains('open') ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
  });

  navLinks.addEventListener('click', e => {
    if (e.target.matches('a')) {
      navLinks.classList.remove('open');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  window.addEventListener('scroll', () => {
    const y = window.scrollY + window.innerHeight * 0.2;
    qsa('.nav-links a').forEach(a => {
      const sec = qs(a.getAttribute('href'));
      if (sec && sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }, { passive: true });
}