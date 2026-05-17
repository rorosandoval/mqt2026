const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Error al cargar ${filePath}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    document.querySelectorAll(`#${elementId} .fade-in`).forEach(el => observer.observe(el));

    if (elementId === "header-container") {
      const toggleBtn = document.querySelector('.nav-toggle');
      const navLinks = document.querySelector('.nav-links');

      if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
          navLinks.classList.toggle('active');
        });
      }
    }

  } catch (error) {
    console.error("Hubo un problema cargando un componente:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-container", "components/header.html");
  loadComponent("footer-container", "components/footer.html");
});