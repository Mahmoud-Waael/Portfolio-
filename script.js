// =============================================
//   MAHMOUD WAEL — PORTFOLIO SCRIPTS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. NAVBAR: scroll effect + active link ----
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {

    // Shrink navbar on scroll
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Highlight active nav link
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

  });

  // ---- 2. SMOOTH SCROLL for nav links ----
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu if open
          const navCollapse = document.getElementById('menu');
          if (navCollapse.classList.contains('show')) {
            navCollapse.classList.remove('show');
          }
        }
      }
    });
  });

  // ---- 3. REVEAL ANIMATION on scroll ----
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  // ---- 4. SKILL BARS animation ----
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-w');
        fill.style.width = width + '%';
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  // ---- 5. COUNTER ANIMATION for stats ----
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const rawText = el.textContent;
        const numMatch = rawText.match(/\d+/);
        if (!numMatch) return;

        const target = parseInt(numMatch[0]);
        const suffix = rawText.replace(/\d+/, '');
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 30);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.7 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ---- 6. TYPED EFFECT on hero role badges ----
  const roleBadges = document.querySelectorAll('.role-badge');
  roleBadges.forEach((badge, i) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(10px)';
    setTimeout(() => {
      badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }, 600 + i * 200);
  });

  // ---- 7. HERO name entrance ----
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.style.opacity = '0';
    heroName.style.transform = 'translateY(20px)';
    setTimeout(() => {
      heroName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroName.style.opacity = '1';
      heroName.style.transform = 'translateY(0)';
    }, 100);
  }

  // ---- 8. PROJECT CARDS: stagger reveal ----
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  console.log('✅ Portfolio loaded successfully!');
});
