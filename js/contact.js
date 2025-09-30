/* ---------- CONTACT FORM ---------- */
function initContactForm() {
  const form = qs('#contactForm');
  const statusEl = qs('#formStatus');
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    statusEl.textContent = 'Envoi...';
    
    setTimeout(() => {
      statusEl.textContent = 'Message envoyé ✅';
      statusEl.className = 'form-status status-ok';
      form.reset();
    }, 1000);
  });
}