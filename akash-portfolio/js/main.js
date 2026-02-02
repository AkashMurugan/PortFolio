/* =========
   Small helper utils
========= */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

/* =========
   Mouse glow
========= */
const glow = $('.cursor-glow');
window.addEventListener('mousemove', (e) => {
  if(!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

/* =========
   Mobile menu
========= */
const navToggle = $('.nav-toggle');
const nav = $('.nav');
if (navToggle && nav){
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click (mobile)
  $$('.nav__link', nav).forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========
   Reveal on scroll
========= */
const revealEls = $$('.reveal');
const io = new IntersectionObserver((entries) => {
  for (const entry of entries){
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.14 });

revealEls.forEach(el => io.observe(el));

/* =========
   Counter animation (for stats)
========= */
const counters = $$('.count');
if (counters.length){
  const counterIO = new IntersectionObserver((entries) => {
    for (const entry of entries){
      if(!entry.isIntersecting) continue;
      const el = entry.target;
      const to = Number(el.dataset.to || '0');
      const duration = 900;
      const start = performance.now();
      const from = 0;

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const val = Math.floor(from + (to - from) * (t * (2 - t)));
        el.textContent = String(val);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    }
  }, { threshold: 0.6 });

  counters.forEach(c => counterIO.observe(c));
}

/* =========
   Typed effect (simple, no library)
========= */
const typedEl = $('.typed');
if (typedEl){
  const items = JSON.parse(typedEl.dataset.typed || '[]');
  let i = 0, j = 0;
  let deleting = false;

  const type = () => {
    const current = items[i] || typedEl.textContent || '';
    const visible = current.slice(0, j);
    typedEl.textContent = visible;

    const speed = deleting ? 34 : 54;
    if(!deleting && j < current.length){
      j++;
    } else if(deleting && j > 0){
      j--;
    } else {
      if(!deleting){
        deleting = true;
        setTimeout(type, 900);
        return;
      } else {
        deleting = false;
        i = (i + 1) % items.length;
      }
    }
    setTimeout(type, speed);
  };

  if(items.length > 0) type();
}

/* =========
   Scrollspy (active nav link)
========= */
const sections = ['home','services','about','projects','contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = $$('.nav__link');

const setActive = (id) => {
  navLinks.forEach(a => {
    const match = a.getAttribute('href') === '#' + id;
    a.classList.toggle('is-active', match);
  });
};

if (sections.length){
  const spy = new IntersectionObserver((entries) => {
    // choose the entry with highest intersection ratio
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

    if(visible) setActive(visible.target.id);
  }, { threshold: [0.2,0.4,0.6] });

  sections.forEach(s => spy.observe(s));
}

/* =========
   Footer year
========= */
const y = $('#year');
if(y) y.textContent = String(new Date().getFullYear());
