/**
 * BharatNexgen — Shared Nav & Footer
 * Auto-detects whether the page is at root or in /pages/
 */
(function () {
  const inPages = window.location.pathname.includes('/pages/');
  const base    = inPages ? '../' : '';

  const NAV_HTML = `
<nav class="navbar" id="mainNav">
  <div class="container navbar-inner">
    <a href="${base}index.html" class="logo">
      <svg class="logo-icon" viewBox="0 0 60 60" fill="none">
        <polygon points="30,4 56,18 56,42 30,56 4,42 4,18" fill="none" stroke="#c8952a" stroke-width="2.5"/>
        <polygon points="30,14 46,23 46,37 30,46 14,37 14,23" fill="none" stroke="#00b4d8" stroke-width="1.5" opacity="0.7"/>
        <circle cx="30" cy="30" r="8" fill="#c8952a" opacity="0.9"/>
        <circle cx="30" cy="30" r="4" fill="#0a1628"/>
        <circle cx="30" cy="30" r="2" fill="#c8952a"/>
        <line x1="30" y1="4"  x2="30" y2="14" stroke="#c8952a" stroke-width="1.5"/>
        <line x1="56" y1="18" x2="46" y2="23" stroke="#c8952a" stroke-width="1.5"/>
        <line x1="56" y1="42" x2="46" y2="37" stroke="#c8952a" stroke-width="1.5"/>
        <line x1="30" y1="56" x2="30" y2="46" stroke="#c8952a" stroke-width="1.5"/>
        <line x1="4"  y1="42" x2="14" y2="37" stroke="#c8952a" stroke-width="1.5"/>
        <line x1="4"  y1="18" x2="14" y2="23" stroke="#c8952a" stroke-width="1.5"/>
      </svg>
      <div class="logo-text">
        <span class="brand">BharatNexgen</span>
        <span class="tagline">Automation Pvt. Ltd.</span>
      </div>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="${base}index.html" data-page="index">Home</a>
      <a href="${base}pages/about.html" data-page="about">About Us</a>
      <a href="${base}pages/products.html" data-page="products">Our Products</a>
      <a href="${base}pages/resources.html" data-page="resources">Resources</a>
      <a href="${base}pages/services.html" data-page="services">Services</a>
      <a href="${base}pages/collaborate.html" class="nav-cta" data-page="collaborate">Collaborate With Us</a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-nav" id="mobileNav">
    <a href="${base}index.html" data-page="index">🏠 Home</a>
    <a href="${base}pages/about.html" data-page="about">👥 About Us</a>
    <a href="${base}pages/products.html" data-page="products">🔧 Our Products</a>
    <a href="${base}pages/resources.html" data-page="resources">📦 Resources</a>
    <a href="${base}pages/services.html" data-page="services">⚙️ Services</a>
    <a href="${base}pages/collaborate.html" data-page="collaborate" style="color:var(--gold-light);font-weight:700;">🤝 Collaborate With Us</a>
  </div>
</nav>`;

  const yr = new Date().getFullYear();
  const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <svg width="36" height="36" viewBox="0 0 60 60" fill="none">
            <polygon points="30,4 56,18 56,42 30,56 4,42 4,18" fill="none" stroke="#c8952a" stroke-width="2.5"/>
            <circle cx="30" cy="30" r="8" fill="#c8952a" opacity="0.9"/>
            <circle cx="30" cy="30" r="4" fill="#0a1628"/>
          </svg>
          <div>
            <div style="font-family:'Orbitron',sans-serif;font-size:0.95rem;color:#c8952a;font-weight:900;">BharatNexgen</div>
            <div style="font-size:0.65rem;color:#8898b0;letter-spacing:2px;text-transform:uppercase;">Automation Pvt. Ltd.</div>
          </div>
        </div>
        <p style="font-size:0.83rem;color:#8898b0;line-height:1.75;max-width:280px;">AI-powered automation across Defence, Health, Agriculture, Industry &amp; Education. Incubated at TBIF, IIT Ropar.</p>
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
          <span style="font-size:0.72rem;background:rgba(200,149,42,0.15);color:#e8b84b;border:1px solid rgba(200,149,42,0.3);padding:4px 10px;border-radius:20px;">🏛️ TBIF, IIT Ropar</span>
          <span style="font-size:0.72rem;background:rgba(0,180,216,0.12);color:#00b4d8;border:1px solid rgba(0,180,216,0.25);padding:4px 10px;border-radius:20px;">🇮🇳 Made in India</span>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="${base}index.html">Home</a></li>
          <li><a href="${base}pages/about.html">About Us</a></li>
          <li><a href="${base}pages/products.html">Our Products</a></li>
          <li><a href="${base}pages/resources.html">Resources</a></li>
          <li><a href="${base}pages/services.html">Services</a></li>
          <li><a href="${base}pages/collaborate.html">Collaborate</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Focus Areas</h4>
        <ul>
          <li><a href="${base}pages/products.html#defence">🛡️ Defence AI</a></li>
          <li><a href="${base}pages/products.html#health">🏥 Healthcare</a></li>
          <li><a href="${base}pages/products.html#agriculture">🌾 Agriculture</a></li>
          <li><a href="${base}pages/products.html#industry">🏭 Industry 4.0</a></li>
          <li><a href="${base}pages/products.html#education">🎓 Education</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <ul>
          <li><a href="mailto:contact@bharatnexgen.com">📧 contact@bharatnexgen.com</a></li>
          <li><a href="https://www.bharatnexgen.com" target="_blank" rel="noopener">🌐 www.bharatnexgen.com</a></li>
          <li style="color:#8898b0;font-size:0.84rem;line-height:1.6;padding:4px 0;">📍 TBIF, IIT Ropar<br>Rupnagar, Punjab — 140001</li>
        </ul>
        <div style="margin-top:18px;">
          <a href="${base}pages/collaborate.html" style="display:inline-block;background:linear-gradient(135deg,#c8952a,#e8b84b);color:#0a1628;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:0.85rem;padding:9px 20px;border-radius:8px;text-transform:uppercase;letter-spacing:0.5px;transition:all .3s;">Get In Touch →</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${yr} BharatNexgen Automation Pvt. Ltd. All rights reserved.</p>
      <p>Incubated at <a href="https://www.iitrpr.ac.in" target="_blank" rel="noopener">IIT Ropar</a> · TBIF · Punjab, India</p>
    </div>
  </div>
</footer>
<button id="scrollTop" aria-label="Scroll to top" title="Back to top">↑</button>`;

  document.addEventListener('DOMContentLoaded', () => {
    const navEl    = document.getElementById('nav-placeholder');
    const footerEl = document.getElementById('footer-placeholder');
    if (navEl)    navEl.innerHTML    = NAV_HTML;
    if (footerEl) footerEl.innerHTML = FOOTER_HTML;

    const pageName = window.location.pathname.split('/').pop().replace('.html','') || 'index';
    document.querySelectorAll('[data-page]').forEach(link => {
      if (link.getAttribute('data-page') === pageName) link.classList.add('active');
    });
  });
})();
