// 1. ANIMACIONES (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

// Activa los elementos que ya existen en el HTML base
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// 2. CARGA DE COMPONENTES (Fetch) + LÓGICA DE HAMBURGUESA
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Error al cargar ${filePath}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    // Activa el fade-in para los elementos que acaban de ser inyectados
    document.querySelectorAll(`#${elementId} .fade-in`).forEach(el => observer.observe(el));

    // CONTROL DEL MENÚ HAMBURGUESA (Solo actúa si lo que se cargó fue el header)
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

// Carga automática al montar el DOM
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-container", "components/header.html");
  loadComponent("footer-container", "components/footer.html");
});