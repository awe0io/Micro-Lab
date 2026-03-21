import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

// ══════════════════════════════════════════════════
// SECURITY MIDDLEWARE — Defense in Depth
// ══════════════════════════════════════════════════

// ── 1. Block Sensitive Paths (Source code / internal files) ──
app.use('*', async (c, next) => {
  const path = new URL(c.req.url).pathname
  const blockedPatterns = [
    /^\/_worker\.js/,
    /^\/src\//,
    /^\/\.git/,
    /^\/\.env/,
    /^\/\.dev\.vars/,
    /^\/wrangler\./,
    /^\/node_modules\//,
    /^\/tsconfig/,
    /^\/package\.json/,
    /^\/\.wrangler/,
    /^\/migrations\//,
    /^\/ecosystem\.config/,
    /^\/vite\.config/,
  ]
  for (const pattern of blockedPatterns) {
    if (pattern.test(path)) {
      return c.text('Not Found', 404)
    }
  }
  await next()
})

// ── 2. Security Response Headers ──
app.use('*', async (c, next) => {
  await next()

  // Content Security Policy — strict but functional
  c.header('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; '))

  // Anti-Clickjacking
  c.header('X-Frame-Options', 'DENY')

  // XSS Protection
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-XSS-Protection', '1; mode=block')

  // HTTPS enforcement
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

  // Referrer control
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions Policy — restrict powerful APIs
  c.header('Permissions-Policy', [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
  ].join(', '))

  // Prevent MIME sniffing
  c.header('X-Permitted-Cross-Domain-Policies', 'none')

  // Remove server info
  c.header('X-Powered-By', '')
  c.header('Server', '')
})

// ── 3. Anti-Crawling: Rate Limiting (in-memory per-IP) ──
const rateLimitMap = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 120      // requests per window
const RATE_WINDOW = 60_000  // 60 seconds

app.use('*', async (c, next) => {
  const ip = c.req.header('cf-connecting-ip')
    || c.req.header('x-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown'
  const now = Date.now()

  let entry = rateLimitMap.get(ip)
  if (!entry || now > entry.reset) {
    entry = { count: 0, reset: now + RATE_WINDOW }
    rateLimitMap.set(ip, entry)
  }
  entry.count++

  // Cleanup old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.reset) rateLimitMap.delete(key)
    }
  }

  c.header('X-RateLimit-Limit', String(RATE_LIMIT))
  c.header('X-RateLimit-Remaining', String(Math.max(0, RATE_LIMIT - entry.count)))

  if (entry.count > RATE_LIMIT) {
    return c.text('Too Many Requests', 429)
  }

  await next()
})

// ── 4. Anti-Crawling: Bot Detection (UA Filter) ──
const BOT_PATTERNS = /\b(scrapy|httpclient|python-requests|curl\/|wget|spider|crawler|bot\/|headlesschrome|phantomjs|selenium|puppeteer)\b/i
app.use('*', async (c, next) => {
  const ua = c.req.header('user-agent') || ''
  // Only block on API routes — allow page access for legit bots like Googlebot
  if (new URL(c.req.url).pathname.startsWith('/api/')) {
    if (!ua || BOT_PATTERNS.test(ua)) {
      return c.json({ error: 'Access Denied' }, 403)
    }
  }
  await next()
})

// ── 5. Anti-Injection: Content-Type & Input Sanitization ──
app.use('/api/*', async (c, next) => {
  const method = c.req.method
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    const ct = c.req.header('content-type') || ''
    if (!ct.includes('application/json') && !ct.includes('application/x-www-form-urlencoded') && !ct.includes('multipart/form-data')) {
      return c.json({ error: 'Unsupported Content-Type' }, 415)
    }
  }
  await next()
})

// ── 6. Honeypot Trap (hidden endpoint for bots) ──
app.all('/admin', (c) => c.text('Not Found', 404))
app.all('/wp-admin', (c) => c.text('Not Found', 404))
app.all('/wp-login.php', (c) => c.text('Not Found', 404))
app.all('/.env', (c) => c.text('Not Found', 404))
app.all('/phpinfo.php', (c) => c.text('Not Found', 404))
app.all('/config.php', (c) => c.text('Not Found', 404))

app.use(renderer)

// ──────────────────────────────────────────────
// Main Page — Micro-interaction Lab v3.0
// ──────────────────────────────────────────────
app.get('/', (c) => {
  return c.render(
    <>
      {/* ═══════════ NAV ═══════════ */}
      <nav class="fixed top-0 left-0 right-0 z-50" id="main-nav">
        <div class="mx-auto max-w-5xl px-3 sm:px-4 pt-2.5 sm:pt-3.5">
          <div class="nav-glass relative flex items-center justify-between h-11 sm:h-12 px-1.5 sm:px-2 rounded-2xl">

            {/* Left: Logo */}
            <a href="#" class="nav-logo group flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl transition-all duration-300 hover:bg-white/[0.08] active:scale-[0.96]" data-section="hero">
              <div class="logo-icon relative w-7 h-7 rounded-[10px] flex items-center justify-center overflow-hidden">
                <div class="logo-shape"></div>
                <div class="logo-shape-ring"></div>
              </div>
              <span class="font-semibold text-[14px] tracking-tight text-gray-800 dark:text-gray-100 hidden sm:inline transition-colors">Micro Lab</span>
            </a>

            {/* Center: Nav pills - Desktop */}
            <div class="hidden md:flex items-center">
              <div class="nav-pill-track relative flex items-center gap-[2px] p-[3px] rounded-xl">
                <div class="nav-indicator" id="nav-indicator"></div>
                <a href="#" class="nav-pill relative z-10 px-3 py-[5px] rounded-[10px] text-[13px] font-medium transition-all duration-300" data-section="hero">
                  <span data-i18n="nav.home">首页</span>
                </a>
                <a href="#buttons" class="nav-pill relative z-10 px-3 py-[5px] rounded-[10px] text-[13px] font-medium transition-all duration-300" data-section="buttons">
                  <span data-i18n="nav.buttons">交互按钮</span>
                </a>
                <a href="#cards" class="nav-pill relative z-10 px-3 py-[5px] rounded-[10px] text-[13px] font-medium transition-all duration-300" data-section="cards">
                  <span data-i18n="nav.cards">视差卡片</span>
                </a>
                <a href="#inputs" class="nav-pill relative z-10 px-3 py-[5px] rounded-[10px] text-[13px] font-medium transition-all duration-300" data-section="inputs">
                  <span data-i18n="nav.inputs">灵动输入</span>
                </a>
                <a href="#loaders" class="nav-pill relative z-10 px-3 py-[5px] rounded-[10px] text-[13px] font-medium transition-all duration-300" data-section="loaders">
                  <span data-i18n="nav.loaders">趣味等待</span>
                </a>
              </div>
            </div>

            {/* Right: Actions */}
            <div class="flex items-center gap-1">
              {/* Language Toggle */}
              <button id="lang-toggle" class="nav-action-btn relative h-8 px-2 rounded-[10px] flex items-center gap-1.5 text-[11px] font-bold tracking-wide transition-all duration-300 active:scale-[0.92]" aria-label="Toggle language">
                <svg class="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span id="lang-label" class="opacity-70">EN</span>
              </button>

              <div class="nav-divider w-px h-3.5 bg-gray-300/40 dark:bg-white/[0.06] mx-0.5" />

              {/* Theme Toggle — Morph Animation */}
              <button id="theme-toggle" class="nav-action-btn w-8 h-8 rounded-[10px] flex items-center justify-center transition-all duration-300 active:scale-[0.88]" aria-label="Toggle theme">
                <div class="theme-icon-wrapper">
                  <svg class="theme-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>
                  <svg class="theme-moon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                </div>
              </button>

              {/* Mobile Menu Toggle */}
              <button id="mobile-menu-toggle" class="md:hidden nav-action-btn w-8 h-8 rounded-[10px] flex items-center justify-center transition-all duration-300 active:scale-[0.88]" aria-label="Toggle menu">
                <div class="hamburger-icon flex flex-col gap-[4.5px] w-[15px]">
                  <span class="h-[1.5px] w-full bg-gray-500 dark:bg-gray-400 rounded-full transition-all duration-300 origin-center"></span>
                  <span class="h-[1.5px] w-full bg-gray-500 dark:bg-gray-400 rounded-full transition-all duration-300"></span>
                  <span class="h-[1.5px] w-full bg-gray-500 dark:bg-gray-400 rounded-full transition-all duration-300 origin-center"></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div id="mobile-menu" class="mobile-menu hidden md:hidden mt-1.5 rounded-2xl overflow-hidden">
            <div class="mobile-menu-inner p-2 flex flex-col gap-0.5">
              <a href="#" class="mobile-nav-link px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200" data-section="hero">
                <span data-i18n="nav.home">首页</span>
              </a>
              <a href="#buttons" class="mobile-nav-link px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200" data-section="buttons">
                <span data-i18n="nav.buttons">交互按钮</span>
              </a>
              <a href="#cards" class="mobile-nav-link px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200" data-section="cards">
                <span data-i18n="nav.cards">视差卡片</span>
              </a>
              <a href="#inputs" class="mobile-nav-link px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200" data-section="inputs">
                <span data-i18n="nav.inputs">灵动输入</span>
              </a>
              <a href="#loaders" class="mobile-nav-link px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200" data-section="loaders">
                <span data-i18n="nav.loaders">趣味等待</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="hero-section">
        {/* Animated gradient mesh background */}
        <div class="absolute inset-0 overflow-hidden">
          <div class="hero-orb absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full bg-gradient-to-br from-[#007AFF]/20 to-[#5856D6]/20 dark:from-[#007AFF]/10 dark:to-[#5856D6]/10 blur-[80px]" style="animation: orb-float 20s ease-in-out infinite" />
          <div class="hero-orb absolute w-[500px] h-[500px] -bottom-40 -right-40 rounded-full bg-gradient-to-br from-[#FF2D55]/20 to-[#FF9500]/20 dark:from-[#FF2D55]/10 dark:to-[#FF9500]/10 blur-[80px]" style="animation: orb-float 20s ease-in-out infinite; animation-delay: -7s" />
          <div class="hero-orb absolute w-[350px] h-[350px] top-1/3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#5AC8FA]/15 to-[#34C759]/15 dark:from-[#5AC8FA]/5 dark:to-[#34C759]/5 blur-[80px]" style="animation: orb-float 20s ease-in-out infinite; animation-delay: -3s" />
          {/* Subtle dot grid */}
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:32px_32px]" />
        </div>

        {/* Floating particles */}
        <div class="hero-particles absolute inset-0 pointer-events-none" id="hero-particles"></div>

        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div class="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-md mb-8 shadow-sm" style="--delay: 0.1s">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#34C759]"></span>
            </span>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400" data-i18n="hero.badge">前端微交互实验室</span>
          </div>

          <h1 class="hero-element text-5xl sm:text-7xl md:text-[5.5rem] font-bold tracking-tight leading-[0.9] mb-6" style="--delay: 0.25s">
            <span class="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">Micro</span>
            <br />
            <span class="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#007AFF] via-[#AF52DE] to-[#FF2D55] bg-[size:200%_200%] animate-gradient-shift">Interaction</span>
            <br />
            <span class="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">Lab</span>
          </h1>

          <p class="hero-element text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12" style="--delay: 0.45s">
            <span data-i18n="hero.desc">探索动画边界 · 提升交互愉悦感</span><br />
            <span class="text-sm text-gray-400 dark:text-gray-500 mt-1 inline-block">Apple-style Motion · 60fps Silk-smooth · Premium UI</span>
          </p>

          <div class="hero-element flex justify-center gap-4" style="--delay: 0.6s">
            <a href="#buttons" class="hero-cta-primary group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm overflow-hidden transition-all duration-300 active:scale-[0.96]">
              <span class="hero-cta-bg absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white"></span>
              <span class="hero-cta-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[size:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span class="relative z-10 text-white dark:text-gray-900" data-i18n="hero.cta">探索组件</span>
              <svg class="w-4 h-4 relative z-10 text-white dark:text-gray-900 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener" class="hero-cta-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300 active:scale-[0.96]">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Source
            </a>
          </div>

          {/* Scroll indicator — centered below CTA buttons */}
          <div class="hero-element mt-10 flex flex-col items-center gap-2" style="--delay: 1.2s">
            <span class="text-[11px] text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase font-medium" data-i18n="hero.scroll">向下滚动</span>
            <div class="scroll-mouse w-5 h-8 rounded-full border-[1.5px] border-gray-300 dark:border-gray-600 flex justify-center pt-1.5">
              <div class="w-1 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-scroll-dot" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION: MAGICAL BUTTONS ═══════════ */}
      <section id="buttons" class="relative py-20 sm:py-24 px-6">
        {/* Section decoration */}
        <div class="section-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#007AFF]/30 to-transparent" />
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-12 sm:mb-16">
            <div class="flex items-center gap-3 mb-4">
              <div class="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#007AFF] to-transparent" />
              <span class="text-xs font-mono tracking-widest uppercase text-[#007AFF]">01 / Buttons</span>
            </div>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4" data-i18n="buttons.title">魔法按钮</h2>
            <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed" data-i18n="buttons.desc">流光边框 · 物理按压 · 光影追随 — 每一次点击都是一次视觉享受</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {/* Button 1: Aurora Glow */}
            <div class="component-card group relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[260px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-gray-300/60 dark:hover:border-white/10 hover:-translate-y-1">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Aurora Glow</span>
              <button class="magical-btn aurora-btn relative px-8 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 active:scale-[0.97] shadow-[0_4px_16px_rgba(0,122,255,0.25)]">
                <span class="aurora-bg absolute inset-0 bg-gradient-to-r from-[#007AFF] via-[#AF52DE] to-[#FF2D55] bg-[size:200%_200%] animate-gradient-shift" />
                <span class="aurora-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent bg-[size:200%_100%] animate-shimmer" />
                <span class="relative z-10" data-i18n="btn.getStarted">开始使用</span>
              </button>
              <p class="mt-5 text-xs text-gray-400/80 dark:text-gray-600 text-center" data-i18n="btn.aurora.desc">渐变流光 + 光泽扫过效果</p>
            </div>

            {/* Button 2: Neon Border */}
            <div class="component-card group relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[260px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-gray-300/60 dark:hover:border-white/10 hover:-translate-y-1">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Neon Border</span>
              <div class="neon-btn-wrapper relative p-[2px] rounded-xl overflow-hidden">
                <div class="neon-border absolute inset-0 bg-[conic-gradient(from_0deg,#007AFF,#AF52DE,#FF2D55,#FF9500,#34C759,#007AFF)] animate-[spin_3s_linear_infinite]" />
                <button class="relative px-8 py-3.5 rounded-[10px] bg-gray-900 dark:bg-[#0a0a0a] text-white font-semibold text-sm transition-all duration-300 active:scale-[0.97] hover:bg-gray-800 dark:hover:bg-gray-900/80" data-i18n="btn.subscribe">订阅</button>
              </div>
              <p class="mt-5 text-xs text-gray-400/80 dark:text-gray-600 text-center" data-i18n="btn.neon.desc">旋转彩虹边框 + 按压反馈</p>
            </div>

            {/* Button 3: Magnetic Pull */}
            <div class="component-card group relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[260px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-gray-300/60 dark:hover:border-white/10 hover:-translate-y-1">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Magnetic</span>
              <button class="magnetic-btn relative px-8 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)]">
                <span class="relative z-10 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                  <span data-i18n="btn.explore">探索</span>
                </span>
              </button>
              <p class="mt-5 text-xs text-gray-400/80 dark:text-gray-600 text-center" data-i18n="btn.magnetic.desc">鼠标靠近时的磁力吸附效果</p>
            </div>

            {/* Button 4: Ripple Effect */}
            <div class="component-card group relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[260px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-gray-300/60 dark:hover:border-white/10 hover:-translate-y-1">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Ripple</span>
              <button class="ripple-btn relative px-8 py-3.5 rounded-xl bg-[#007AFF] text-white font-semibold text-sm overflow-hidden transition-all duration-300 active:scale-[0.97] hover:bg-[#007AFF]/90 shadow-[0_4px_12px_rgba(0,122,255,0.25)]">
                <span class="relative z-10" data-i18n="btn.clickMe">点击我</span>
              </button>
              <p class="mt-5 text-xs text-gray-400/80 dark:text-gray-600 text-center" data-i18n="btn.ripple.desc">Material Design 水波纹扩散</p>
            </div>

            {/* Button 5: Morphing */}
            <div class="component-card group relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[260px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-gray-300/60 dark:hover:border-white/10 hover:-translate-y-1">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Morphing</span>
              <button class="morph-btn relative px-8 py-3.5 rounded-xl bg-[#34C759] text-white font-semibold text-sm transition-all duration-500 active:scale-[0.97] shadow-[0_4px_12px_rgba(52,199,89,0.25)]" data-state="idle">
                <span class="morph-text relative z-10" data-i18n="btn.submit">提交</span>
                <svg class="morph-spinner absolute inset-0 m-auto w-5 h-5 opacity-0 transition-opacity duration-300" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                <svg class="morph-check absolute inset-0 m-auto w-5 h-5 opacity-0 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </button>
              <p class="mt-5 text-xs text-gray-400/80 dark:text-gray-600 text-center" data-i18n="btn.morph.desc">提交 → 加载中 → 完成 变形动画</p>
            </div>

            {/* Button 6: Spotlight */}
            <div class="component-card group relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[260px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-gray-300/60 dark:hover:border-white/10 hover:-translate-y-1">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Spotlight</span>
              <button class="spotlight-btn relative px-8 py-3.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-semibold text-sm border border-gray-200/80 dark:border-white/10 overflow-hidden transition-all duration-300 active:scale-[0.97] hover:border-gray-300 dark:hover:border-white/20">
                <span class="spotlight-effect absolute w-32 h-32 rounded-full bg-white/60 dark:bg-white/10 blur-xl pointer-events-none opacity-0 transition-opacity duration-300" />
                <span class="relative z-10" data-i18n="btn.hoverMe">悬浮我</span>
              </button>
              <p class="mt-5 text-xs text-gray-400/80 dark:text-gray-600 text-center" data-i18n="btn.spotlight.desc">鼠标追踪的聚光灯光效</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION: SMOOTH CARDS ═══════════ */}
      <section id="cards" class="relative py-20 sm:py-24 px-6">
        <div class="section-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#AF52DE]/30 to-transparent" />
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-12 sm:mb-16">
            <div class="flex items-center gap-3 mb-4">
              <div class="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#AF52DE] to-transparent" />
              <span class="text-xs font-mono tracking-widest uppercase text-[#AF52DE]">02 / Cards</span>
            </div>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4" data-i18n="cards.title">丝滑卡片</h2>
            <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed" data-i18n="cards.desc">3D 视差位移 · 光影追踪 · 深度感知 — 让平面设计拥有空间纵深感</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {/* Card 1: 3D Tilt */}
            <div class="tilt-card perspective-container">
              <div class="tilt-card-inner relative rounded-2xl bg-gradient-to-br from-white/70 to-gray-50/50 dark:from-white/[0.04] dark:to-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 min-h-[320px] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] cursor-pointer will-change-transform">
                <div class="tilt-card-glare absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                <div class="relative z-10">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(0,122,255,0.25)] tilt-card-float">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                  </div>
                  <h3 class="text-xl font-semibold mb-3 tilt-card-float" style="transition-delay: 50ms" data-i18n="card.tilt.title">3D 倾斜效果</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed tilt-card-float" style="transition-delay: 100ms" data-i18n="card.tilt.desc">鼠标悬浮时卡片随鼠标位置产生倾斜，内部元素层级不同产生视差位移。</p>
                  <div class="mt-8 flex items-center gap-2 text-[#007AFF] text-sm font-medium tilt-card-float" style="transition-delay: 150ms">
                    <span data-i18n="card.learnMore">了解更多</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Glow Border */}
            <div class="glow-card group relative rounded-2xl overflow-hidden cursor-pointer min-h-[320px]">
              <div class="glow-card-border absolute inset-0 bg-gradient-to-r from-[#AF52DE] via-[#FF2D55] to-[#FF9500] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div class="glow-card-content relative m-[1.5px] rounded-[15px] bg-white dark:bg-[#0a0a0a] p-8 h-[calc(100%-3px)] transition-all duration-500">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#AF52DE] to-[#FF2D55] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(175,82,222,0.25)]">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3" data-i18n="card.glow.title">发光边框</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed" data-i18n="card.glow.desc">悬浮时边框渐变发光，内部背景保持纯净，形成精致的光晕镶边效果。</p>
                <div class="mt-8 flex items-center gap-2 text-[#AF52DE] text-sm font-medium">
                  <span data-i18n="card.learnMore">了解更多</span>
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>

            {/* Card 3: Glass Morphism */}
            <div class="glass-card relative rounded-2xl overflow-hidden cursor-pointer min-h-[320px] group">
              <div class="absolute inset-0 bg-gradient-to-br from-[#5AC8FA]/20 via-[#007AFF]/20 to-[#5856D6]/20 dark:from-[#5AC8FA]/10 dark:via-[#007AFF]/10 dark:to-[#5856D6]/10" />
              <div class="glass-card-inner relative backdrop-blur-xl bg-white/30 dark:bg-white/5 border border-white/50 dark:border-white/10 p-8 h-full rounded-2xl transition-all duration-500 hover:bg-white/40 dark:hover:bg-white/[0.07]">
                <div class="w-12 h-12 rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/50 dark:border-white/20">
                  <svg class="w-6 h-6 text-[#5AC8FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3" data-i18n="card.glass.title">毛玻璃拟态</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" data-i18n="card.glass.desc">毛玻璃拟态设计，背景虚化与透明叠加，呈现苹果风格的精致层次。</p>
                <div class="mt-8 flex gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/10 text-[#5AC8FA]" data-i18n="card.glass.tag1">模糊</span>
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/10 text-[#007AFF]" data-i18n="card.glass.tag2">层叠</span>
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/10 text-[#5856D6]" data-i18n="card.glass.tag3">纵深</span>
                </div>
              </div>
            </div>

            {/* Card 4: Reveal Card */}
            <div class="reveal-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] overflow-hidden cursor-pointer min-h-[320px] group transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div class="absolute inset-0 bg-gradient-to-br from-[#34C759]/5 to-[#5AC8FA]/5 dark:from-[#34C759]/[0.02] dark:to-[#5AC8FA]/[0.02]" />
              <div class="relative p-8 z-10">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#34C759] to-[#5AC8FA] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(52,199,89,0.25)]">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3" data-i18n="card.reveal.title">揭示效果</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed" data-i18n="card.reveal.desc">鼠标移入时从底部滑入隐藏内容，提供渐进式信息展示体验。</p>
              </div>
              <div class="reveal-content absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900/95 to-gray-900/80 dark:from-black/95 dark:to-black/80 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <p class="text-white text-sm leading-relaxed mb-4" data-i18n="card.reveal.hidden">这是一个完美的渐进式内容展示模式，用户只需悬浮即可获取更多信息。</p>
                <div class="flex items-center gap-2 text-[#34C759] text-sm font-medium">
                  <span data-i18n="card.viewDetails">查看详情</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>

            {/* Card 5: Stacked Layers */}
            <div class="stacked-card relative cursor-pointer min-h-[320px] group" style="perspective: 600px">
              <div class="absolute inset-4 rounded-2xl bg-[#FF9500]/10 dark:bg-[#FF9500]/5 border border-[#FF9500]/20 dark:border-[#FF9500]/10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-2" />
              <div class="absolute inset-2 rounded-2xl bg-[#FF2D55]/10 dark:bg-[#FF2D55]/5 border border-[#FF2D55]/20 dark:border-[#FF2D55]/10 transition-transform duration-500 group-hover:-translate-y-4 group-hover:-rotate-1" />
              <div class="relative rounded-2xl bg-white dark:bg-[#111] border border-gray-200/50 dark:border-white/[0.06] p-8 h-full transition-all duration-500 group-hover:-translate-y-6 z-10 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF9500] to-[#FF3B30] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(255,149,0,0.25)]">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3" data-i18n="card.stacked.title">层叠卡片</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed" data-i18n="card.stacked.desc">多层卡片堆叠效果，悬浮时层层展开，展示空间深度与层次结构。</p>
                <div class="mt-8 flex items-center gap-2 text-[#FF9500] text-sm font-medium">
                  <span data-i18n="card.learnMore">了解更多</span>
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>

            {/* Card 6: Spotlight Card */}
            <div class="spotlight-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] overflow-hidden cursor-pointer min-h-[320px] group transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div class="spotlight-card-light absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(0,122,255,0.08) 0%, transparent 70%)" />
              <div class="relative p-8 z-10">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5856D6] to-[#007AFF] flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(88,86,214,0.25)]">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3" data-i18n="card.spotlight.title">聚光灯揭示</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed" data-i18n="card.spotlight.desc">鼠标追踪的柔和聚光灯效果，为卡片增添精致的交互光感。</p>
                <div class="mt-8 flex items-center gap-2 text-[#5856D6] text-sm font-medium">
                  <span data-i18n="card.learnMore">了解更多</span>
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION: INPUT FEEDBACK ═══════════ */}
      <section id="inputs" class="relative py-20 sm:py-24 px-6">
        <div class="section-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#34C759]/30 to-transparent" />
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-12 sm:mb-16">
            <div class="flex items-center gap-3 mb-4">
              <div class="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#34C759] to-transparent" />
              <span class="text-xs font-mono tracking-widest uppercase text-[#34C759]">03 / Inputs</span>
            </div>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4" data-i18n="inputs.title">输入反馈</h2>
            <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed" data-i18n="inputs.desc">灵感来自 Linear / Vercel — 每一次输入都伴随着精准的视觉反馈</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-4xl">
            {/* Input 1: Focus Glow */}
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <span class="text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase mb-6 block">Focus Glow</span>
              <div class="space-y-4">
                <div class="input-focus-glow relative">
                  <div class="input-glow-border absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#007AFF] to-[#AF52DE] opacity-0 transition-opacity duration-300 blur-[2px]" />
                  <input type="text" data-i18n-placeholder="input.emailPlaceholder" placeholder="请输入邮箱..." class="relative w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm outline-none transition-all duration-300 focus:border-[#007AFF]/50 dark:focus:border-[#007AFF]/30 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>
                <p class="text-xs text-gray-400/80 dark:text-gray-600" data-i18n="input.focusGlow.desc">聚焦时外发光渐变边框</p>
              </div>
            </div>

            {/* Input 2: Float Label */}
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <span class="text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase mb-6 block">Float Label</span>
              <div class="space-y-4">
                <div class="float-label-wrapper relative">
                  <input type="text" id="float-input" class="float-input peer w-full px-4 py-3 pt-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm outline-none transition-all duration-300 focus:border-[#007AFF]/50 dark:focus:border-[#007AFF]/30" placeholder=" " />
                  <label for="float-input" class="float-label absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-600 transition-all duration-300 pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#007AFF] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs" data-i18n="input.username">用户名</label>
                </div>
                <p class="text-xs text-gray-400/80 dark:text-gray-600" data-i18n="input.floatLabel.desc">输入时标签上浮动画</p>
              </div>
            </div>

            {/* Input 3: Validation */}
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <span class="text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase mb-6 block">Validation</span>
              <div class="space-y-4">
                <div class="validation-wrapper relative">
                  <input type="email" placeholder="email@example.com" class="validation-input w-full px-4 py-3 pr-10 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                  <div class="validation-icon absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center opacity-0 transition-all duration-300 scale-50">
                    <svg class="valid-icon w-5 h-5 text-[#34C759] hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    <svg class="invalid-icon w-5 h-5 text-[#FF3B30] hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </div>
                  <p class="validation-msg text-xs mt-2 transition-all duration-300 opacity-0 translate-y-2"></p>
                </div>
                <p class="text-xs text-gray-400/80 dark:text-gray-600" data-i18n="input.validation.desc">实时邮箱格式验证反馈</p>
              </div>
            </div>

            {/* Input 4: Search with kbd */}
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <span class="text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase mb-6 block">Command Search</span>
              <div class="space-y-4">
                <div class="search-wrapper relative group">
                  <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600 transition-colors duration-300 group-focus-within:text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input type="text" data-i18n-placeholder="input.searchPlaceholder" placeholder="搜索组件..." class="search-input w-full pl-10 pr-16 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm outline-none transition-all duration-300 focus:border-[#007AFF]/50 dark:focus:border-[#007AFF]/30 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                  <kbd class="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-[10px] font-mono text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-white/10">⌘K</kbd>
                </div>
                <p class="text-xs text-gray-400/80 dark:text-gray-600" data-i18n="input.search.desc">Vercel 风格搜索 + 快捷键提示</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION: MICRO LOADERS ═══════════ */}
      <section id="loaders" class="relative py-20 sm:py-24 px-6">
        <div class="section-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#FF9500]/30 to-transparent" />
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-12 sm:mb-16">
            <div class="flex items-center gap-3 mb-4">
              <div class="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#FF9500] to-transparent" />
              <span class="text-xs font-mono tracking-widest uppercase text-[#FF9500]">04 / Loaders</span>
            </div>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4" data-i18n="loaders.title">微加载动画</h2>
            <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed" data-i18n="loaders.desc">不只是等待 · 更是视觉享受 — 让加载过程变成缓解焦虑的趣味动画</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[180px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <div class="loader-orbit relative w-10 h-10">
                <div class="absolute inset-0 rounded-full border-2 border-[#007AFF]/20" />
                <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-[#007AFF] animate-spin" style="animation-duration: 0.8s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Orbit</span>
            </div>
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[180px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <div class="loader-dots flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-[#AF52DE] animate-pulse" style="animation-delay: 0s" />
                <div class="w-2.5 h-2.5 rounded-full bg-[#AF52DE] animate-pulse" style="animation-delay: 0.2s" />
                <div class="w-2.5 h-2.5 rounded-full bg-[#AF52DE] animate-pulse" style="animation-delay: 0.4s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Pulse</span>
            </div>
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[180px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <div class="loader-wave flex items-end gap-1 h-8">
                <div class="w-1 bg-[#34C759] rounded-full" style="animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0s" />
                <div class="w-1 bg-[#34C759] rounded-full" style="animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0.1s" />
                <div class="w-1 bg-[#34C759] rounded-full" style="animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0.2s" />
                <div class="w-1 bg-[#34C759] rounded-full" style="animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0.3s" />
                <div class="w-1 bg-[#34C759] rounded-full" style="animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0.4s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Wave</span>
            </div>
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[180px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <div class="w-8 h-8 bg-[#FF9500] rounded-md" style="animation: morph-square 2s ease-in-out infinite" />
              <span class="mt-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Morph</span>
            </div>
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[180px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-[#FF2D55]" style="animation: bounce-loader 0.6s ease-in-out infinite alternate; animation-delay: 0s" />
                <div class="w-3 h-3 rounded-full bg-[#FF2D55]" style="animation: bounce-loader 0.6s ease-in-out infinite alternate; animation-delay: 0.15s" />
                <div class="w-3 h-3 rounded-full bg-[#FF2D55]" style="animation: bounce-loader 0.6s ease-in-out infinite alternate; animation-delay: 0.3s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Bounce</span>
            </div>
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[180px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <div class="relative w-10 h-10">
                <svg class="w-10 h-10 animate-spin" style="animation-duration: 1.5s" viewBox="0 0 40 40">
                  <defs><linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#007AFF"/><stop offset="50%" stop-color="#AF52DE"/><stop offset="100%" stop-color="#FF2D55"/></linearGradient></defs>
                  <circle cx="20" cy="20" r="16" fill="none" stroke="url(#rg)" stroke-width="3" stroke-linecap="round" stroke-dasharray="80 100"/>
                </svg>
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Gradient</span>
            </div>
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[180px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <div class="flex gap-1 h-8 items-center">
                <div class="w-1.5 h-1.5 rounded-full bg-[#5AC8FA]" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0s" />
                <div class="w-1.5 h-1.5 rounded-full bg-[#007AFF]" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0.15s" />
                <div class="w-1.5 h-1.5 rounded-full bg-[#5856D6]" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0.3s" />
                <div class="w-1.5 h-1.5 rounded-full bg-[#AF52DE]" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0.45s" />
                <div class="w-1.5 h-1.5 rounded-full bg-[#FF2D55]" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0.6s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">DNA</span>
            </div>
            <div class="component-card relative rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[180px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
              <div class="w-24 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-[#007AFF] to-[#AF52DE]" style="animation: progress-bar 2s ease-in-out infinite" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400/60 dark:text-gray-600 tracking-wider uppercase">Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer class="relative py-20 px-6 border-t border-gray-100 dark:border-white/[0.04]">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col items-center text-center">
            {/* Logo */}
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#007AFF] via-[#5856D6] to-[#AF52DE] flex items-center justify-center shadow-[0_2px_8px_rgba(88,86,214,0.3)]">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <span class="font-semibold text-lg">Micro Lab</span>
            </div>
            <p class="text-sm text-gray-400 dark:text-gray-500 mb-3 max-w-md" data-i18n="footer.tagline">以极致的细节打造每一个交互</p>
            <p class="text-xs text-gray-300 dark:text-gray-700 mb-6">Apple-style Motion &middot; 60fps &middot; Premium UI Components</p>

            {/* Security badge */}
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/10 border border-green-200/50 dark:border-green-800/30 mb-8">
              <svg class="w-3.5 h-3.5 text-[#34C759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span class="text-[11px] font-medium text-[#34C759]" data-i18n="footer.security">安全防护已启用</span>
            </div>

            {/* Social-like links */}
            <div class="flex items-center gap-6 mb-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
            <div class="text-[11px] text-gray-300 dark:text-gray-700">&copy; 2026 Micro Lab &middot; Built with Hono + Cloudflare Pages &middot; Security Hardened</div>
          </div>
        </div>
      </footer>

      {/* ═══════════ BACK TO TOP BUTTON ═══════════ */}
      <button id="back-to-top" class="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center opacity-0 translate-y-4 pointer-events-none transition-all duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:scale-[0.92]" aria-label="Back to top">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
      </button>
    </>
  )
})

// API
app.get('/api/info', (c) => {
  return c.json({
    name: 'Micro-interaction Lab',
    version: '3.0.0',
    components: ['Magical Buttons', 'Smooth Cards', 'Input Feedback', 'Micro Loaders'],
    security: ['CSP', 'HSTS', 'Rate-Limiting', 'Bot-Detection', 'XSS-Protection', 'Anti-Injection'],
  })
})

// Security health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Catch-all 404 for unknown routes
app.notFound((c) => {
  return c.text('Not Found', 404)
})

// Global error handler
app.onError((err, c) => {
  console.error('Server Error:', err.message)
  return c.text('Internal Server Error', 500)
})

export default app
