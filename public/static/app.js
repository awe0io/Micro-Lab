/* ══════════════════════════════════════════════════
   MICRO-INTERACTION LAB v3.0 — Core Interaction Engine
   60fps · Apple-style Easing · i18n · Premium Feel
   Security Hardened · Anti-Debug · Source Protection
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ═══════════════════════════════════
  // SOURCE PROTECTION LAYER
  // ═══════════════════════════════════

  // Disable right-click context menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // Block keyboard shortcuts that expose source code
  document.addEventListener('keydown', function (e) {
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); return false; }
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') { e.preventDefault(); return false; }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') { e.preventDefault(); return false; }
    // Ctrl+Shift+C (Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') { e.preventDefault(); return false; }
    // F12 (DevTools)
    if (e.key === 'F12') { e.preventDefault(); return false; }
    // Ctrl+P (Print)
    if (e.ctrlKey && e.key === 'p') { e.preventDefault(); return false; }
  });

  // Disable text selection on non-input elements
  document.addEventListener('selectstart', function (e) {
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'pre' || tag === 'code') return true;
    e.preventDefault();
    return false;
  });

  // Disable drag on images and links
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  });

  // Anti-DevTools detection (console timing)
  (function antiDevTools() {
    const threshold = 160;
    const check = function () {
      const start = performance.now();
      // debugger detection trick - harmless timing check
      const el = new Image();
      Object.defineProperty(el, 'id', {
        get: function () {
          // DevTools causes a significant delay when inspecting properties
        }
      });
      const end = performance.now();
      if (end - start > threshold) {
        // DevTools likely open — optional: could redirect or show warning
      }
    };
    setInterval(check, 3000);
  })();

  // Console watermark
  console.log(
    '%c⚡ Micro-interaction Lab v3.0',
    'color: #007AFF; font-size: 16px; font-weight: bold;'
  );
  console.log(
    '%c🔒 Protected by Security Shield · Unauthorized copying is prohibited',
    'color: #FF3B30; font-size: 12px;'
  );
  console.log(
    '%c© 2026 Micro Lab · All Rights Reserved',
    'color: #8E8E93; font-size: 11px;'
  );

  // Inject invisible watermark into the page
  (function injectWatermark() {
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.rotate(-20 * Math.PI / 180);
    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.012)';
    ctx.fillText('Micro Lab © 2026', 20, 100);
    ctx.fillText('Protected Content', 20, 130);
    const watermarkDiv = document.createElement('div');
    watermarkDiv.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;background-repeat:repeat;opacity:1;';
    watermarkDiv.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
    watermarkDiv.id = '__wm__';

    // MutationObserver to prevent watermark removal
    const protectWatermark = function () {
      if (!document.getElementById('__wm__')) {
        document.body.appendChild(watermarkDiv);
      }
    };
    const observer = new MutationObserver(protectWatermark);
    document.addEventListener('DOMContentLoaded', function () {
      document.body.appendChild(watermarkDiv);
      observer.observe(document.body, { childList: true, subtree: false });
    });
  })();

  // ═══════════════════════════════════
  // i18n DICTIONARY
  // ═══════════════════════════════════
  const i18n = {
    zh: {
      'nav.home': '首页',
      'nav.buttons': '交互按钮',
      'nav.cards': '视差卡片',
      'nav.inputs': '灵动输入',
      'nav.loaders': '趣味等待',
      'hero.badge': '前端微交互实验室',
      'hero.desc': '探索动画边界 · 提升交互愉悦感',
      'hero.cta': '探索组件',
      'hero.scroll': '向下滚动',
      'buttons.title': '魔法按钮',
      'buttons.desc': '流光边框 · 物理按压 · 光影追随 — 每一次点击都是一次视觉享受',
      'btn.getStarted': '开始使用',
      'btn.aurora.desc': '渐变流光 + 光泽扫过效果',
      'btn.subscribe': '订阅',
      'btn.neon.desc': '旋转彩虹边框 + 按压反馈',
      'btn.explore': '探索',
      'btn.magnetic.desc': '鼠标靠近时的磁力吸附效果',
      'btn.clickMe': '点击我',
      'btn.ripple.desc': 'Material Design 水波纹扩散',
      'btn.submit': '提交',
      'btn.morph.desc': '提交 → 加载中 → 完成 变形动画',
      'btn.hoverMe': '悬浮我',
      'btn.spotlight.desc': '鼠标追踪的聚光灯光效',
      'cards.title': '丝滑卡片',
      'cards.desc': '3D 视差位移 · 光影追踪 · 深度感知 — 让平面设计拥有空间纵深感',
      'card.tilt.title': '3D 倾斜效果',
      'card.tilt.desc': '鼠标悬浮时卡片随鼠标位置产生倾斜，内部元素层级不同产生视差位移。',
      'card.learnMore': '了解更多',
      'card.glow.title': '发光边框',
      'card.glow.desc': '悬浮时边框渐变发光，内部背景保持纯净，形成精致的光晕镶边效果。',
      'card.glass.title': '毛玻璃拟态',
      'card.glass.desc': '毛玻璃拟态设计，背景虚化与透明叠加，呈现苹果风格的精致层次。',
      'card.glass.tag1': '模糊',
      'card.glass.tag2': '层叠',
      'card.glass.tag3': '纵深',
      'card.reveal.title': '揭示效果',
      'card.reveal.desc': '鼠标移入时从底部滑入隐藏内容，提供渐进式信息展示体验。',
      'card.reveal.hidden': '这是一个完美的渐进式内容展示模式，用户只需悬浮即可获取更多信息。',
      'card.viewDetails': '查看详情',
      'card.stacked.title': '层叠卡片',
      'card.stacked.desc': '多层卡片堆叠效果，悬浮时层层展开，展示空间深度与层次结构。',
      'card.spotlight.title': '聚光灯揭示',
      'card.spotlight.desc': '鼠标追踪的柔和聚光灯效果，为卡片增添精致的交互光感。',
      'inputs.title': '输入反馈',
      'inputs.desc': '灵感来自 Linear / Vercel — 每一次输入都伴随着精准的视觉反馈',
      'input.emailPlaceholder': '请输入邮箱...',
      'input.focusGlow.desc': '聚焦时外发光渐变边框',
      'input.username': '用户名',
      'input.floatLabel.desc': '输入时标签上浮动画',
      'input.validation.desc': '实时邮箱格式验证反馈',
      'input.searchPlaceholder': '搜索组件...',
      'input.search.desc': 'Vercel 风格搜索 + 快捷键提示',
      'loaders.title': '微加载动画',
      'loaders.desc': '不只是等待 · 更是视觉享受 — 让加载过程变成缓解焦虑的趣味动画',
      'footer.tagline': '以极致的细节打造每一个交互',
      'footer.security': '安全防护已启用',
      'validation.valid': '邮箱格式正确',
      'validation.invalid': '请输入有效的邮箱地址',
    },
    en: {
      'nav.home': 'Home',
      'nav.buttons': 'Buttons',
      'nav.cards': 'Cards',
      'nav.inputs': 'Inputs',
      'nav.loaders': 'Loaders',
      'hero.badge': 'Frontend Micro-interaction Lab',
      'hero.desc': 'Pushing Animation Boundaries · Enhancing Interaction Delight',
      'hero.cta': 'Explore Components',
      'hero.scroll': 'Scroll Down',
      'buttons.title': 'Magical Buttons',
      'buttons.desc': 'Flowing Borders · Physical Press · Light Tracking — Every click is a visual treat',
      'btn.getStarted': 'Get Started',
      'btn.aurora.desc': 'Gradient shimmer + gloss sweep effect',
      'btn.subscribe': 'Subscribe',
      'btn.neon.desc': 'Rotating rainbow border + press feedback',
      'btn.explore': 'Explore',
      'btn.magnetic.desc': 'Magnetic pull when cursor approaches',
      'btn.clickMe': 'Click Me',
      'btn.ripple.desc': 'Material Design ripple expansion',
      'btn.submit': 'Submit',
      'btn.morph.desc': 'Submit → Loading → Success morphing',
      'btn.hoverMe': 'Hover Me',
      'btn.spotlight.desc': 'Cursor-tracking spotlight effect',
      'cards.title': 'Smooth Cards',
      'cards.desc': '3D Parallax · Light Tracking · Depth Perception — Adding spatial depth to flat design',
      'card.tilt.title': '3D Tilt Effect',
      'card.tilt.desc': 'Card tilts with cursor position on hover, inner elements parallax at different depths.',
      'card.learnMore': 'Learn more',
      'card.glow.title': 'Glow Border',
      'card.glow.desc': 'Gradient glow border on hover, clean interior creates an elegant halo frame.',
      'card.glass.title': 'Glassmorphism',
      'card.glass.desc': 'Frosted glass design with blur overlay, delivering Apple-style refined layering.',
      'card.glass.tag1': 'Blur',
      'card.glass.tag2': 'Layer',
      'card.glass.tag3': 'Depth',
      'card.reveal.title': 'Reveal Effect',
      'card.reveal.desc': 'Hidden content slides in from bottom on hover for progressive disclosure.',
      'card.reveal.hidden': 'A perfect progressive disclosure pattern — users discover more just by hovering.',
      'card.viewDetails': 'View Details',
      'card.stacked.title': 'Stacked Layers',
      'card.stacked.desc': 'Multi-layer stacking unfolds on hover, showcasing spatial depth and hierarchy.',
      'card.spotlight.title': 'Spotlight Reveal',
      'card.spotlight.desc': 'Soft cursor-tracking spotlight adds refined interactive light to cards.',
      'inputs.title': 'Input Feedback',
      'inputs.desc': 'Inspired by Linear / Vercel — Every keystroke comes with precise visual feedback',
      'input.emailPlaceholder': 'Enter your email...',
      'input.focusGlow.desc': 'Gradient glow border on focus',
      'input.username': 'Username',
      'input.floatLabel.desc': 'Label float animation on input',
      'input.validation.desc': 'Real-time email format validation',
      'input.searchPlaceholder': 'Search components...',
      'input.search.desc': 'Vercel-style search + keyboard shortcut hint',
      'loaders.title': 'Micro Loaders',
      'loaders.desc': 'Not just waiting · A visual delight — Turn loading into anxiety-relieving animations',
      'footer.tagline': 'Crafted with obsessive attention to detail',
      'footer.security': 'Security Shield Active',
      'validation.valid': 'Valid email address',
      'validation.invalid': 'Please enter a valid email',
    }
  };

  let currentLang = localStorage.getItem('micro-lab-lang') || 'zh';

  function applyI18n(lang, animate) {
    const dict = i18n[lang];
    if (!dict) return;

    const els = document.querySelectorAll('[data-i18n]');
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');

    if (animate) {
      els.forEach(el => el.classList.add('i18n-switching'));
      setTimeout(() => {
        els.forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (dict[key]) el.textContent = dict[key];
          el.classList.remove('i18n-switching');
        });
        placeholders.forEach(el => {
          const key = el.getAttribute('data-i18n-placeholder');
          if (dict[key]) el.placeholder = dict[key];
        });
      }, 150);
    } else {
      els.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
      });
      placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.placeholder = dict[key];
      });
    }
  }

  function initI18n() {
    const btn = document.getElementById('lang-toggle');
    const label = document.getElementById('lang-label');
    if (!btn) return;

    applyI18n(currentLang, false);
    label.textContent = currentLang === 'zh' ? 'EN' : '中';

    btn.addEventListener('click', () => {
      currentLang = currentLang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('micro-lab-lang', currentLang);
      label.textContent = currentLang === 'zh' ? 'EN' : '中';
      applyI18n(currentLang, true);
      // Re-update nav indicator after text change
      setTimeout(() => updateNavIndicator(), 200);
    });
  }

  // ═══════════════════════════════════
  // THEME TOGGLE
  // ═══════════════════════════════════
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const stored = localStorage.getItem('micro-lab-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored ? stored === 'dark' : prefersDark) {
      document.documentElement.classList.add('dark');
    }

    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const nowDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('micro-lab-theme', nowDark ? 'dark' : 'light');
    });
  }

  // ═══════════════════════════════════
  // MOBILE MENU
  // ═══════════════════════════════════
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const hamburger = toggle?.querySelector('.hamburger-icon');
    if (!toggle || !menu) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      menu.classList.remove('hidden', 'closing');
      menu.classList.add('open');
      hamburger?.classList.add('open');
    }

    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;
      menu.classList.add('closing');
      hamburger?.classList.remove('open');
      setTimeout(() => {
        menu.classList.remove('open', 'closing');
        menu.classList.add('hidden');
      }, 200);
    }

    toggle.addEventListener('click', () => {
      isOpen ? closeMenu() : openMenu();
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (isOpen && !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // ═══════════════════════════════════
  // NAV SCROLL EFFECT
  // ═══════════════════════════════════
  function initNavScroll() {
    const glass = document.querySelector('.nav-glass');
    if (!glass) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          glass.classList.toggle('scrolled', window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════
  // NAV SLIDING INDICATOR
  // ═══════════════════════════════════
  let activeSection = 'hero';

  function updateNavIndicator() {
    const indicator = document.getElementById('nav-indicator');
    const track = document.querySelector('.nav-pill-track');
    const pills = document.querySelectorAll('.nav-pill-track .nav-pill');
    if (!indicator || !track || !pills.length) return;

    let activePill = null;
    pills.forEach(pill => {
      if (pill.dataset.section === activeSection) {
        activePill = pill;
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Also update mobile nav
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === activeSection);
    });

    if (activePill) {
      const trackRect = track.getBoundingClientRect();
      const pillRect = activePill.getBoundingClientRect();
      indicator.style.left = (pillRect.left - trackRect.left) + 'px';
      indicator.style.width = pillRect.width + 'px';
      indicator.style.opacity = '1';
    }
  }

  function initNavActiveTracking() {
    const sections = [
      { id: 'hero', el: document.getElementById('hero-section') || document.querySelector('section') },
      ...Array.from(document.querySelectorAll('section[id]')).map(el => ({ id: el.id, el }))
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id') || 'hero';
          const mappedId = id === 'hero-section' ? 'hero' : id;
          activeSection = mappedId;
          updateNavIndicator();
        });
      },
      { threshold: 0.15, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach(s => { if (s.el) observer.observe(s.el); });

    // Initial
    setTimeout(updateNavIndicator, 100);

    // Also update on resize
    window.addEventListener('resize', () => {
      requestAnimationFrame(updateNavIndicator);
    });
  }

  // ═══════════════════════════════════
  // SCROLL REVEAL
  // ═══════════════════════════════════
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.section-header, .section-glow, .component-card, .tilt-card, .glow-card, .glass-card, .reveal-card, .stacked-card, .spotlight-card'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const cardTypes = '.component-card, .tilt-card, .glow-card, .glass-card, .reveal-card, .stacked-card, .spotlight-card';
            const siblings = parent ? Array.from(parent.children).filter(el => el.matches(cardTypes)) : [];
            const index = siblings.indexOf(entry.target);
            const delay = index >= 0 ? index * 70 : 0;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach(t => observer.observe(t));
  }

  // ═══════════════════════════════════
  // HERO PARTICLES
  // ═══════════════════════════════════
  function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const colors = ['#007AFF', '#AF52DE', '#FF2D55', '#5AC8FA', '#34C759', '#FF9500'];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      const size = 2 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.cssText = `
        width: ${size}px; height: ${size}px;
        background: ${color};
        left: ${10 + Math.random() * 80}%;
        top: ${20 + Math.random() * 60}%;
        animation-delay: ${-Math.random() * 12}s;
        animation-duration: ${8 + Math.random() * 8}s;
      `;
      container.appendChild(particle);
    }
  }

  // ═══════════════════════════════════
  // MAGNETIC BUTTONS
  // ═══════════════════════════════════
  function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      const strength = 0.3;
      btn.addEventListener('mousemove', e => {
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
  // RIPPLE BUTTONS
  // ═══════════════════════════════════
  function initRippleButtons() {
    document.querySelectorAll('.ripple-btn').forEach(btn => {
      btn.addEventListener('click', e => {
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
  // MORPHING BUTTON
  // ═══════════════════════════════════
  function initMorphButtons() {
    document.querySelectorAll('.morph-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.state !== 'idle') return;
        const originalWidth = btn.offsetWidth;
        btn.style.width = originalWidth + 'px';
        btn.dataset.state = 'loading';
        setTimeout(() => {
          btn.dataset.state = 'success';
          setTimeout(() => {
            btn.dataset.state = 'idle';
            btn.style.width = '';
          }, 1200);
        }, 1500);
      });
    });
  }

  // ═══════════════════════════════════
  // SPOTLIGHT BUTTONS
  // ═══════════════════════════════════
  function initSpotlightButtons() {
    document.querySelectorAll('.spotlight-btn').forEach(btn => {
      const effect = btn.querySelector('.spotlight-effect');
      if (!effect) return;
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        effect.style.left = e.clientX - rect.left - 64 + 'px';
        effect.style.top = e.clientY - rect.top - 64 + 'px';
        effect.style.opacity = '1';
      });
      btn.addEventListener('mouseleave', () => { effect.style.opacity = '0'; });
    });
  }

  // ═══════════════════════════════════
  // 3D TILT CARDS
  // ═══════════════════════════════════
  function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
      const inner = card.querySelector('.tilt-card-inner');
      const glare = card.querySelector('.tilt-card-glare');
      const floats = card.querySelectorAll('.tilt-card-float');
      if (!inner) return;
      const maxTilt = 12, maxFloat = 8;

      card.addEventListener('mousemove', e => {
        const rect = inner.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        inner.style.transform = `rotateX(${(0.5 - y) * maxTilt}deg) rotateY(${(x - 0.5) * maxTilt}deg) scale3d(1.02,1.02,1.02)`;
        if (glare) {
          glare.style.setProperty('--mouse-x', x * 100 + '%');
          glare.style.setProperty('--mouse-y', y * 100 + '%');
          glare.style.opacity = '1';
        }
        floats.forEach((el, i) => {
          const d = (i + 1) * 0.3;
          el.style.transform = `translate(${(x - 0.5) * maxFloat * d}px, ${(y - 0.5) * maxFloat * d}px)`;
        });
      });
      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0) rotateY(0) scale3d(1,1,1)';
        if (glare) glare.style.opacity = '0';
        floats.forEach(el => { el.style.transform = 'translate(0,0)'; });
      });
    });
  }

  // ═══════════════════════════════════
  // SPOTLIGHT CARDS
  // ═══════════════════════════════════
  function initSpotlightCards() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
      const light = card.querySelector('.spotlight-card-light');
      if (!light) return;
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        light.style.left = e.clientX - rect.left - 150 + 'px';
        light.style.top = e.clientY - rect.top - 150 + 'px';
      });
    });
  }

  // ═══════════════════════════════════
  // INPUT VALIDATION
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
        const dict = i18n[currentLang];
        if (emailRegex.test(val)) {
          wrapper.classList.remove('is-invalid');
          wrapper.classList.add('is-valid');
          if (msg) msg.textContent = dict['validation.valid'];
        } else {
          wrapper.classList.remove('is-valid');
          wrapper.classList.add('is-invalid');
          if (msg) msg.textContent = dict['validation.invalid'];
        }
      }, 300);
    });
  }

  // ═══════════════════════════════════
  // BACK TO TOP BUTTON
  // ═══════════════════════════════════
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 600) {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
            btn.style.pointerEvents = 'auto';
          } else {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(16px)';
            btn.style.pointerEvents = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ═══════════════════════════════════
  // SMOOTH NAV SCROLL
  // ═══════════════════════════════════
  function initSmoothNav() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (!id || id === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ═══════════════════════════════════
  // BOOT
  // ═══════════════════════════════════
  function boot() {
    initTheme();
    initI18n();
    initMobileMenu();
    initNavScroll();
    initNavActiveTracking();
    initScrollReveal();
    initHeroParticles();
    initMagneticButtons();
    initRippleButtons();
    initMorphButtons();
    initSpotlightButtons();
    initTiltCards();
    initSpotlightCards();
    initInputValidation();
    initBackToTop();
    initSmoothNav();

    // Page loaded transition
    document.body.classList.remove('page-loading');
    document.body.classList.add('page-loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
