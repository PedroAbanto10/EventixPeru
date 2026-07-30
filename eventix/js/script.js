document.addEventListener('DOMContentLoaded', () => {

  /* ===== Año dinámico en el footer ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Header: fondo al hacer scroll ===== */
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===== Menú móvil ===== */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===== Animación al hacer scroll (reveal) ===== */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ===== Formulario de contacto -> WhatsApp ===== */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const tipo = document.getElementById('tipo').value;
      const mensaje = document.getElementById('mensaje').value.trim();

      const texto =
        `Hola EVENTIX, mi nombre es ${nombre}.` +
        `%0ATipo de evento: ${tipo}.` +
        `%0ACorreo de contacto: ${email}.` +
        `%0ADetalles: ${mensaje}`;

      const whatsappURL = `https://wa.me/51955475301?text=${texto}`;

      formNote.textContent = 'Abriendo WhatsApp con tu solicitud...';
      window.open(whatsappURL, '_blank');
    });
  }

});
