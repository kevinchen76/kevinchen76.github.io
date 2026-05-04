$ cat /home/user/kevinchen76.github.io/js/main.js

/* =============================================
   MAIN.JS — navigation, accordions, cert toggles
   ============================================= */

// ---- Copyright year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ---- Active nav highlight on scroll ----
const sections  = document.querySelectorAll('main .section[id]');
const navItems  = document.querySelectorAll('.nav-link[data-section]');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',
  }
);

sections.forEach(sec => sectionObserver.observe(sec));

// ---- Accordion (projects & publications) ----
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const expanded = header.getAttribute('aria-expanded') === 'true';
    const body     = header.nextElementSibling;

    // Collapse all siblings first (optional: remove these lines for multi-open)
    const list = header.closest('.accordion-list');
    list.querySelectorAll('.accordion-header').forEach(h => {
      h.setAttribute('aria-expanded', 'false');
      const b = h.nextElementSibling;
      if (b) b.classList.remove('open');
    });

    if (!expanded) {
      header.setAttribute('aria-expanded', 'true');
      if (body) body.classList.add('open');
    }
  });
});

// ---- Certification card toggles (multi-open) ----
document.querySelectorAll('.cert-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const details  = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    btn.setAttribute('aria-expanded', !expanded);
    details.classList.toggle('open', !expanded);

    // Update button label
    btn.textContent = expanded ? 'Details +' : 'Details −';
  });
});

// ---- Smooth scroll for in-page anchor clicks ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height'), 10) || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});