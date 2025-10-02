/* Basic interactivity: mobile nav toggle, slider, contact form validation, smooth animations */

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle?.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    // Simple accessibility update
    navToggle.setAttribute('aria-expanded', mainNav.classList.contains('open'));
  });

  // Slider
  const slider = document.getElementById('slider');
  const slides = slider ? slider.querySelectorAll('.slide') : [];
  let index = 0;
  let sliding = false;

  const showSlide = (i) => {
    if (!slider) return;
    index = (i + slides.length) % slides.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
  };

  // Next / Prev controls
  document.getElementById('next')?.addEventListener('click', () => showSlide(index + 1));
  document.getElementById('prev')?.addEventListener('click', () => showSlide(index - 1));

  // Auto-play slider
  let sliderInterval = setInterval(() => {
    showSlide(index + 1);
  }, 5000);

  // Pause on hover
  slider?.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  slider?.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(() => showSlide(index + 1), 5000);
  });

  // Contact form handling (no backend — replace with AJAX endpoint)
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill all the fields.');
      return;
    }

    // Basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // In production: send to your server using fetch()/XHR
    // For now, show a friendly success message
    alert('Thanks, ' + (name || 'there') + '! Your message has been received. We will get back to you soon.');
    contactForm.reset();
  });

  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple scroll reveal for sections
  const revealElems = document.querySelectorAll('.section, .category-card, .gallery-item, .about-img');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('inview');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealElems.forEach(el => revealObserver.observe(el));
});
