/* ===========================
   Boogie's BBQ — Main Script
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Mobile Navigation ----- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when a nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ----- Active Navigation Link ----- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----- Header scroll effect ----- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ----- Menu Tabs ----- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCategories = document.querySelectorAll('.menu-category');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.category;

      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      menuCategories.forEach(cat => {
        cat.classList.remove('active');
        if (cat.id === target) {
          cat.classList.add('active');
        }
      });
    });
  });

  /* ----- Contact Form Validation ----- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      let isValid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      contactForm.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

      // Required fields
      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          const errorEl = field.parentElement.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Dieses Feld ist erforderlich.';
            errorEl.style.display = 'block';
          }
        }
      });

      // Email validation
      const emailField = contactForm.querySelector('#email');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          isValid = false;
          emailField.classList.add('error');
          const errorEl = emailField.parentElement.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'Bitte eine gültige E-Mail-Adresse eingeben.';
            errorEl.style.display = 'block';
          }
        }
      }

      if (!isValid) {
        e.preventDefault();
      }
    });
  }

  /* ----- Scroll animations (Intersection Observer) ----- */
  const animateElements = document.querySelectorAll('.card, .feature-item, .menu-item, .team-member, .gallery-item');

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

});
