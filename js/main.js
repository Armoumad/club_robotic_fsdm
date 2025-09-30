/* ---------- MAIN INITIALIZATION ---------- */
function initApp() {
  // Initialize theme and navigation
  initTheme();
  initNavigation();
  
  // Render all sections
  renderTeam();
  renderProjects();
  renderNews();
  renderEvents();
  renderCompetitions();
  renderAchievements();
  
  // Initialize forms and modals
  initContactForm();
  initModalCloseButtons();
  
  // Set current year
  qs('#year').textContent = new Date().getFullYear();
  
  // Initialize scroll events
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);