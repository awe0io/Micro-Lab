/* ══════════════════════════════════════════════════
   MICRO-INTERACTION LAB — Core Interaction Engine
   60fps · Apple-style Easing · Premium Feel
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Easing Presets ──
  const EASE = {
    spring: 'cubic-bezier(0.23, 1, 0.32, 1)',
    outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  };

  // ═══════════════════════════════════
  // 1. THEME TOGGLE
  // ═══════════════════════════════════
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Check system preference or stored
    const stored = localStorage.getItem('micro-lab-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;

    if (isDark) document.documentElement.classList.add('dark');

    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const nowDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('micro-lab-theme', nowDark ? 'dark' : 'light');
    });
  }

  // ═══════════════════════════════════
  // 2. INTERSECTION OBSERVER (Scroll Reveal)
  // ═══════════════════════════════════
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.section-header, .component-card, .tilt-card, .glow-card, .glass-card, .reveal-card, .stacked-card, .spotlight-card'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings
            const parent = entry.target.parentElement;
            const siblings = parent ? Array.from(parent.children).filter(
              (el) => el.matches('.component-card, .tilt-card, .glow-card, .glass-card, .reveal-card, .stacked-card, .spotlight-card')
            ) : [];
            const index = siblings.indexOf(entry.target);
            const delay = index >= 0 ? index * 80 : 0;

            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((t) => observer.observe(t));
  }

  // ═══════════════════════════════════
  // 3. MAGNETIC BUTTONS
  // ═══════════════════════════════════
  function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      const strength = 0.3;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ═══════════════════════════════════
  // 4. RIPPLE BUTTONS
  // ═══════════════════════════════════
  function initRippleButtons() {
    document.querySelectorAll('.ripple-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);

        ripple.className = 'ripple-effect';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  // ═══════════════════════════════════
  // 5. MORPHING BUTTON
  // ═══════════════════════════════════
  function initMorphButtons() {
    document.querySelectorAll('.morph-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.state !== 'idle') return;

        const originalWidth = btn.offsetWidth;
        btn.style.width = originalWidth + 'px';

        // → Loading
        btn.dataset.state = 'loading';

        // → Success after 1.5s
        setTimeout(() => {
          btn.dataset.state = 'success';

          // → Reset after 1.2s
          setTimeout(() => {
            btn.dataset.state = 'idle';
            btn.style.width = '';
          }, 1200);
        }, 1500);
      });
    });
  }

  // ═══════════════════════════════════
  // 6. SPOTLIGHT BUTTONS
  // ═══════════════════════════════════
  function initSpotlightButtons() {
    document.querySelectorAll('.spotlight-btn').forEach((btn) => {
      const effect = btn.querySelector('.spotlight-effect');
      if (!effect) return;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        effect.style.left = e.clientX - rect.left - 64 + 'px';
        effect.style.top = e.clientY - rect.top - 64 + 'px';
        effect.style.opacity = '1';
      });

      btn.addEventListener('mouseleave', () => {
        effect.style.opacity = '0';
      });
    });
  }

  // ═══════════════════════════════════
  // 7. 3D TILT CARDS
  // ═══════════════════════════════════
  function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      const inner = card.querySelector('.tilt-card-inner');
      const glare = card.querySelector('.tilt-card-glare');
      const floats = card.querySelectorAll('.tilt-card-float');
      if (!inner) return;

      const maxTilt = 12; // degrees
      const maxFloat = 8; // px parallax

      card.addEventListener('mousemove', (e) => {
        const rect = inner.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (0.5 - y) * maxTilt;
        const tiltY = (x - 0.5) * maxTilt;

        inner.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Glare
        if (glare) {
          glare.style.setProperty('--mouse-x', x * 100 + '%');
          glare.style.setProperty('--mouse-y', y * 100 + '%');
          glare.style.opacity = '1';
        }

        // Parallax float
        floats.forEach((el, i) => {
          const depth = (i + 1) * 0.3;
          el.style.transform = `translate(${(x - 0.5) * maxFloat * depth}px, ${(y - 0.5) * maxFloat * depth}px)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        if (glare) glare.style.opacity = '0';
        floats.forEach((el) => {
          el.style.transform = 'translate(0, 0)';
        });
      });
    });
  }

  // ═══════════════════════════════════
  // 8. SPOTLIGHT CARDS (mouse follow light)
  // ═══════════════════════════════════
  function initSpotlightCards() {
    document.querySelectorAll('.spotlight-card').forEach((card) => {
      const light = card.querySelector('.spotlight-card-light');
      if (!light) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        light.style.left = e.clientX - rect.left - 150 + 'px';
        light.style.top = e.clientY - rect.top - 150 + 'px';
      });
    });
  }

  // ═══════════════════════════════════
  // 9. INPUT VALIDATION
  // ═══════════════════════════════════
  function initInputValidation() {
    const wrapper = document.querySelector('.validation-wrapper');
    const input = wrapper?.querySelector('.validation-input');
    const msg = wrapper?.querySelector('.validation-msg');
    if (!input || !wrapper) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const val = input.value.trim();

      if (val === '') {
        wrapper.classList.remove('is-valid', 'is-invalid');
        if (msg) msg.textContent = '';
        return;
      }

      debounceTimer = setTimeout(() => {
        if (emailRegex.test(val)) {
          wrapper.classList.remove('is-invalid');
          wrapper.classList.add('is-valid');
          if (msg) msg.textContent = 'Valid email address';
        } else {
          wrapper.classList.remove('is-valid');
          wrapper.classList.add('is-invalid');
          if (msg) msg.textContent = 'Please enter a valid email';
        }
      }, 300);
    });
  }

  // ═══════════════════════════════════
  // 10. SMOOTH NAV SCROLL
  // ═══════════════════════════════════
  function initSmoothNav() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ═══════════════════════════════════
  // 11. NAV BACKGROUND ON SCROLL
  // ═══════════════════════════════════
  function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
          } else {
            nav.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ═══════════════════════════════════
  // BOOT
  // ═══════════════════════════════════
  function boot() {
    initTheme();
    initScrollReveal();
    initMagneticButtons();
    initRippleButtons();
    initMorphButtons();
    initSpotlightButtons();
    initTiltCards();
    initSpotlightCards();
    initInputValidation();
    initSmoothNav();
    initNavScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
