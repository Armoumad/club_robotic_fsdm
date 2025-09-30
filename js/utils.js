/* ---------- UTILITIES ---------- */
const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
const el = (t, c) => {
  const e = document.createElement(t); 
  if (c) e.className = c; 
  return e;
}
const root = document.documentElement;

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

// Check if news is new
const isNew = (dateString, days = 30) => {
  return (Date.now() - new Date(dateString).getTime()) / 86400000 <= days;
};