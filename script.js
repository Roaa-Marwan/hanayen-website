const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.querySelector('.lightbox-close');
const revealEls = document.querySelectorAll('.reveal');
const tiltCards = document.querySelectorAll('.tilt-card');
const glow = document.querySelector('.cursor-glow');

document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = entry.target.dataset.delay || 0;
    entry.target.style.setProperty('--delay', `${delay}ms`);
    entry.target.classList.add('in');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

document.querySelectorAll('.open-lightbox').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.dataset.alt || '';
    lightbox.showModal();
  });
});

closeLightbox?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.open) lightbox.close();
});

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canHover && !reducedMotion) {
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  document.addEventListener('mousemove', (e) => {
    glow.style.opacity = '1';
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}
