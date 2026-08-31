/* ============================================
   SCRIPT — PRATHIBHA AMBATI PORTFOLIO
   Animations, navigation, and interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initScrollToTop();
  initActiveNavHighlight();
  initContactForm();
});

/* --- Navigation --- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const links = navLinks.querySelectorAll('a');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navOverlay.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu on overlay click
  navOverlay.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navOverlay.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* --- Scroll Reveal Animation --- */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Make all elements visible immediately
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

/* --- Scroll To Top --- */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Active Navigation Highlight --- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-resume-btn)');

  const sectionMap = {};
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      sectionMap[href.substring(1)] = link;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach(link => link.classList.remove('active'));

        // Map java-focus and github-showcase to their nearest nav item
        let targetId = id;
        if (id === 'java-focus') targetId = 'skills';
        if (id === 'github-showcase') targetId = 'projects';
        if (id === 'resume') targetId = 'contact';

        if (sectionMap[targetId]) {
          sectionMap[targetId].classList.add('active');
        } else if (sectionMap[id]) {
          sectionMap[id].classList.add('active');
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: `-${72}px 0px -50% 0px`
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

/* --- Contact Form Handler --- */
function initContactForm() {
  // Handled by inline onsubmit
}

function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.querySelector('#contactName').value;
  const email = form.querySelector('#contactEmail').value;
  const message = form.querySelector('#contactMessage').value;

  // Open mailto with pre-filled data
  const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:prathibhareddy2003@gmail.com?subject=${subject}&body=${body}`;

  // Visual feedback
  const btn = form.querySelector('.form-submit');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>
    Opening Email Client...
  `;
  btn.style.pointerEvents = 'none';

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.pointerEvents = '';
    form.reset();
  }, 3000);
}

/* --- Smooth scroll for anchor links (fallback) --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
