/* =============================================
   BharatNexgen Automation — Main JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ---- Hamburger / mobile nav ---- */
  document.addEventListener('click', e => {
    const ham = e.target.closest('#hamburger');
    const nav = document.getElementById('mobileNav');
    if (!ham || !nav) return;
    const open = nav.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
    nav.setAttribute('aria-hidden', !open);
  });

  /* Close mobile nav on link click */
  document.addEventListener('click', e => {
    const nav = document.getElementById('mobileNav');
    if (nav && nav.contains(e.target) && e.target.tagName === 'A') {
      nav.classList.remove('open');
      const ham = document.getElementById('hamburger');
      if (ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded', false); }
    }
  });

  /* Close mobile nav on outside click */
  document.addEventListener('click', e => {
    const nav  = document.getElementById('mobileNav');
    const ham  = document.getElementById('hamburger');
    const main = document.getElementById('mainNav');
    if (nav && nav.classList.contains('open') && main && !main.contains(e.target)) {
      nav.classList.remove('open');
      if (ham) ham.classList.remove('open');
    }
  });

  /* ---- Hero Slider ---- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  let current  = 0;
  let timer;

  function goTo(n) {
    slides[current]?.classList.remove('active');
    dots[current]?.classList.remove('active');
    current = ((n % slides.length) + slides.length) % slides.length;
    slides[current]?.classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  if (slides.length) {
    goTo(0);
    startAuto();
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

    /* Swipe support */
    let tx = 0;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
      hero.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
      }, { passive: true });
    }
  }

  /* ---- Scroll Reveal ---- */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ---- Animated counters ---- */
  if ('IntersectionObserver' in window) {
    const cobs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = +el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        const dur    = 1400;
        const start  = performance.now();
        const initial = 0;
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(initial + (target - initial) * ease) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        cobs.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-target]').forEach(el => cobs.observe(el));
  }

  /* ---- Scroll-to-top ---- */
  const topBtn = document.getElementById('scrollTop');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Collaborate form ---- */
  const form = document.getElementById('collabForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const orig = btn.textContent;
      btn.textContent = '⏳ Sending…';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1200));
      btn.textContent = '✅ Message Sent! We\'ll respond within 48 hours.';
      btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 5000);
    });
  }

  /* ---- Roadmap tab switching ---- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tabs-container');
      if (!group) return;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector('#' + btn.getAttribute('data-tab'));
      if (panel) panel.classList.add('active');
    });
  });

});
