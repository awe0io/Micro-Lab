import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

// ──────────────────────────────────────────────
// Main Page — Micro-interaction Lab
// ──────────────────────────────────────────────
app.get('/', (c) => {
  return c.render(
    <>
      {/* ═══════════ HERO / NAV ═══════════ */}
      <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#0a0a0a]/70 border-b border-gray-200/50 dark:border-white/5">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-apple-blue to-apple-purple flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span class="font-semibold text-lg tracking-tight">Micro Lab</span>
            <span class="text-xs font-mono px-2 py-0.5 rounded-full bg-apple-blue/10 text-apple-blue dark:bg-apple-blue/20">v1.0</span>
          </div>
          <div class="flex items-center gap-4">
            <a href="#buttons" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:inline">Buttons</a>
            <a href="#cards" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:inline">Cards</a>
            <a href="#inputs" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:inline">Inputs</a>
            <a href="#loaders" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:inline">Loaders</a>
            <button id="theme-toggle" class="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 active:scale-90" aria-label="Toggle theme">
              <svg id="sun-icon" class="w-4 h-4 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-linecap="round" stroke-width="2"/></svg>
              <svg id="moon-icon" class="w-4 h-4 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated gradient mesh background */}
        <div class="absolute inset-0 overflow-hidden">
          <div class="hero-gradient-orb absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full bg-gradient-to-br from-apple-blue/20 to-apple-purple/20 dark:from-apple-blue/10 dark:to-apple-purple/10 blur-3xl animate-float" />
          <div class="hero-gradient-orb absolute w-[500px] h-[500px] -bottom-40 -right-40 rounded-full bg-gradient-to-br from-apple-pink/20 to-apple-orange/20 dark:from-apple-pink/10 dark:to-apple-orange/10 blur-3xl animate-float" style="animation-delay: -3s" />
          <div class="hero-gradient-orb absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-apple-teal/15 to-apple-green/15 dark:from-apple-teal/5 dark:to-apple-green/5 blur-3xl animate-float" style="animation-delay: -1.5s" />
          {/* Grid pattern overlay */}
          <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-sm mb-8 hero-fade-in" style="animation-delay: 0.1s">
            <span class="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">前端微交互实验室</span>
          </div>
          <h1 class="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6 hero-fade-in" style="animation-delay: 0.2s">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">Micro</span>
            <br />
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-apple-blue via-apple-purple to-apple-pink bg-[size:200%_200%] animate-gradient-shift">Interaction</span>
            <br />
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">Lab</span>
          </h1>
          <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 hero-fade-in" style="animation-delay: 0.4s">
            探索动画边界 · 提升交互愉悦感<br />
            <span class="text-sm text-gray-400 dark:text-gray-500">Apple-style Motion · 60fps Silk-smooth · Premium UI Components</span>
          </p>
          <div class="flex flex-wrap justify-center gap-4 hero-fade-in" style="animation-delay: 0.6s">
            <a href="#buttons" class="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm overflow-hidden transition-transform duration-300 active:scale-95 hover:shadow-xl hover:shadow-gray-900/20 dark:hover:shadow-white/20">
              <span class="relative z-10">探索组件</span>
              <svg class="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-medium text-sm border border-gray-200 dark:border-white/10 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/15 active:scale-95">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Source
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-fade-in" style="animation-delay: 1s">
          <span class="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">Scroll</span>
          <div class="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 flex justify-center pt-2">
            <div class="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION: MAGICAL BUTTONS ═══════════ */}
      <section id="buttons" class="relative py-32 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-20">
            <span class="inline-block text-xs font-mono tracking-widest uppercase text-apple-blue mb-4">01 / Buttons</span>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Magical Buttons</h2>
            <p class="text-lg text-gray-500 dark:text-gray-400 max-w-xl">流光边框 · 物理按压 · 光影追随<br/>每一次点击都是一次视觉享受</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Button 1: Aurora Glow */}
            <div class="component-card group relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[280px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Aurora Glow</span>
              <button class="magical-btn aurora-btn relative px-8 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 active:scale-[0.97]">
                <span class="aurora-bg absolute inset-0 bg-gradient-to-r from-apple-blue via-apple-purple to-apple-pink bg-[size:200%_200%] animate-gradient-shift" />
                <span class="aurora-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent bg-[size:200%_100%] animate-shimmer" />
                <span class="relative z-10">Get Started</span>
              </button>
              <p class="mt-6 text-xs text-gray-400 dark:text-gray-600 text-center">渐变流光 + 光泽扫过效果</p>
            </div>

            {/* Button 2: Neon Border */}
            <div class="component-card group relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[280px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Neon Border</span>
              <div class="neon-btn-wrapper relative p-[2px] rounded-xl overflow-hidden">
                <div class="neon-border absolute inset-0 bg-[conic-gradient(from_0deg,#007AFF,#AF52DE,#FF2D55,#FF9500,#34C759,#007AFF)] animate-[spin_3s_linear_infinite]" />
                <button class="relative px-8 py-3.5 rounded-[10px] bg-gray-900 dark:bg-[#0a0a0a] text-white font-semibold text-sm transition-all duration-300 active:scale-[0.97] hover:bg-gray-800 dark:hover:bg-gray-900/80">
                  Subscribe
                </button>
              </div>
              <p class="mt-6 text-xs text-gray-400 dark:text-gray-600 text-center">旋转彩虹边框 + 按压反馈</p>
            </div>

            {/* Button 3: Magnetic Pull */}
            <div class="component-card group relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[280px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Magnetic</span>
              <button class="magnetic-btn relative px-8 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:shadow-white/30">
                <span class="relative z-10 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                  Explore
                </span>
              </button>
              <p class="mt-6 text-xs text-gray-400 dark:text-gray-600 text-center">鼠标靠近时的磁力吸附效果</p>
            </div>

            {/* Button 4: Ripple Effect */}
            <div class="component-card group relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[280px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Ripple</span>
              <button class="ripple-btn relative px-8 py-3.5 rounded-xl bg-apple-blue text-white font-semibold text-sm overflow-hidden transition-all duration-300 active:scale-[0.97] hover:bg-apple-blue/90">
                <span class="relative z-10">Click Me</span>
              </button>
              <p class="mt-6 text-xs text-gray-400 dark:text-gray-600 text-center">Material Design 水波纹扩散</p>
            </div>

            {/* Button 5: Morphing */}
            <div class="component-card group relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[280px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Morphing</span>
              <button class="morph-btn relative px-8 py-3.5 rounded-xl bg-apple-green text-white font-semibold text-sm transition-all duration-500 active:scale-[0.97]" data-state="idle">
                <span class="morph-text relative z-10">Submit</span>
                <svg class="morph-spinner absolute inset-0 m-auto w-5 h-5 opacity-0 transition-opacity duration-300" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                <svg class="morph-check absolute inset-0 m-auto w-5 h-5 opacity-0 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </button>
              <p class="mt-6 text-xs text-gray-400 dark:text-gray-600 text-center">Submit → Loading → Success 变形</p>
            </div>

            {/* Button 6: Spotlight */}
            <div class="component-card group relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[280px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="absolute top-4 left-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Spotlight</span>
              <button class="spotlight-btn relative px-8 py-3.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-semibold text-sm border border-gray-200/80 dark:border-white/10 overflow-hidden transition-all duration-300 active:scale-[0.97] hover:border-gray-300 dark:hover:border-white/20">
                <span class="spotlight-effect absolute w-32 h-32 rounded-full bg-white/50 dark:bg-white/10 blur-xl pointer-events-none opacity-0 transition-opacity duration-300" />
                <span class="relative z-10">Hover Me</span>
              </button>
              <p class="mt-6 text-xs text-gray-400 dark:text-gray-600 text-center">鼠标追踪的聚光灯光效</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION: SMOOTH CARDS ═══════════ */}
      <section id="cards" class="relative py-32 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-20">
            <span class="inline-block text-xs font-mono tracking-widest uppercase text-apple-purple mb-4">02 / Cards</span>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Smooth Cards</h2>
            <p class="text-lg text-gray-500 dark:text-gray-400 max-w-xl">3D 视差位移 · 光影追踪 · 深度感知<br/>让平面设计拥有空间纵深感</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: 3D Tilt */}
            <div class="tilt-card perspective-container">
              <div class="tilt-card-inner relative rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-white/[0.04] dark:to-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 min-h-[340px] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-gray-300/80 dark:hover:border-white/10 cursor-pointer will-change-transform">
                <div class="tilt-card-glare absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                <div class="relative z-10">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-apple-blue to-apple-indigo flex items-center justify-center mb-6 shadow-lg shadow-apple-blue/20 tilt-card-float">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                  </div>
                  <h3 class="text-xl font-semibold mb-3 tilt-card-float" style="transition-delay: 50ms">3D Tilt Effect</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed tilt-card-float" style="transition-delay: 100ms">鼠标悬浮时卡片随鼠标位置产生倾斜，内部元素层级不同产生视差位移。</p>
                  <div class="mt-8 flex items-center gap-2 text-apple-blue text-sm font-medium tilt-card-float" style="transition-delay: 150ms">
                    <span>Learn more</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Glow Border */}
            <div class="glow-card group relative rounded-2xl overflow-hidden cursor-pointer min-h-[340px]">
              <div class="glow-card-border absolute inset-0 bg-gradient-to-r from-apple-purple via-apple-pink to-apple-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div class="glow-card-content relative m-[1px] rounded-[15px] bg-white dark:bg-[#0a0a0a] p-8 h-[calc(100%-2px)] transition-all duration-500">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-apple-purple to-apple-pink flex items-center justify-center mb-6 shadow-lg shadow-apple-purple/20">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3">Glow Border</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">悬浮时边框渐变发光，内部背景保持纯净，形成精致的光晕镶边效果。</p>
                <div class="mt-8 flex items-center gap-2 text-apple-purple text-sm font-medium">
                  <span>Learn more</span>
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>

            {/* Card 3: Glass Morphism */}
            <div class="glass-card relative rounded-2xl overflow-hidden cursor-pointer min-h-[340px] group">
              <div class="absolute inset-0 bg-gradient-to-br from-apple-teal/20 via-apple-blue/20 to-apple-indigo/20 dark:from-apple-teal/10 dark:via-apple-blue/10 dark:to-apple-indigo/10" />
              <div class="glass-card-inner relative backdrop-blur-xl bg-white/30 dark:bg-white/5 border border-white/50 dark:border-white/10 p-8 h-full rounded-2xl transition-all duration-500 hover:bg-white/40 dark:hover:bg-white/[0.07]">
                <div class="w-12 h-12 rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/50 dark:border-white/20">
                  <svg class="w-6 h-6 text-apple-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3">Glassmorphism</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">毛玻璃拟态设计，背景虚化与透明叠加，呈现苹果风格的精致层次。</p>
                <div class="mt-8 flex gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/10 text-apple-teal">Blur</span>
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/10 text-apple-blue">Layer</span>
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/10 text-apple-indigo">Depth</span>
                </div>
              </div>
            </div>

            {/* Card 4: Reveal Card */}
            <div class="reveal-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] overflow-hidden cursor-pointer min-h-[340px] group">
              <div class="absolute inset-0 bg-gradient-to-br from-apple-green/5 to-apple-teal/5 dark:from-apple-green/[0.02] dark:to-apple-teal/[0.02]" />
              <div class="relative p-8 z-10">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-apple-green to-apple-teal flex items-center justify-center mb-6 shadow-lg shadow-apple-green/20">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3">Reveal Effect</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">鼠标移入时从底部滑入隐藏内容，提供渐进式信息展示体验。</p>
              </div>
              <div class="reveal-content absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900/95 to-gray-900/80 dark:from-black/95 dark:to-black/80 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <p class="text-white text-sm leading-relaxed mb-4">这是一个完美的渐进式内容展示模式，用户只需悬浮即可获取更多信息。</p>
                <div class="flex items-center gap-2 text-apple-green text-sm font-medium">
                  <span>View Details</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>

            {/* Card 5: Stacked Layers */}
            <div class="stacked-card relative cursor-pointer min-h-[340px] group" style="perspective: 600px">
              <div class="absolute inset-4 rounded-2xl bg-apple-orange/10 dark:bg-apple-orange/5 border border-apple-orange/20 dark:border-apple-orange/10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-2" />
              <div class="absolute inset-2 rounded-2xl bg-apple-pink/10 dark:bg-apple-pink/5 border border-apple-pink/20 dark:border-apple-pink/10 transition-transform duration-500 group-hover:-translate-y-4 group-hover:-rotate-1" />
              <div class="relative rounded-2xl bg-white dark:bg-[#111] border border-gray-200/60 dark:border-white/[0.06] p-8 h-full transition-transform duration-500 group-hover:-translate-y-6 z-10">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-apple-orange to-apple-red flex items-center justify-center mb-6 shadow-lg shadow-apple-orange/20">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3">Stacked Layers</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">多层卡片堆叠效果，悬浮时层层展开，展示空间深度与层次结构。</p>
                <div class="mt-8 flex items-center gap-2 text-apple-orange text-sm font-medium">
                  <span>Learn more</span>
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>

            {/* Card 6: Spotlight Card */}
            <div class="spotlight-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] overflow-hidden cursor-pointer min-h-[340px] group">
              <div class="spotlight-card-light absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(0,122,255,0.08) 0%, transparent 70%)" />
              <div class="relative p-8 z-10">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-apple-indigo to-apple-blue flex items-center justify-center mb-6 shadow-lg shadow-apple-indigo/20">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                </div>
                <h3 class="text-xl font-semibold mb-3">Spotlight Reveal</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">鼠标追踪的柔和聚光灯效果，为卡片增添精致的交互光感。</p>
                <div class="mt-8 flex items-center gap-2 text-apple-indigo text-sm font-medium">
                  <span>Learn more</span>
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION: INPUT FEEDBACK ═══════════ */}
      <section id="inputs" class="relative py-32 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-20">
            <span class="inline-block text-xs font-mono tracking-widest uppercase text-apple-green mb-4">03 / Inputs</span>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Input Feedback</h2>
            <p class="text-lg text-gray-500 dark:text-gray-400 max-w-xl">灵感来自 Linear / Vercel<br/>每一次输入都伴随着精准的视觉反馈</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Input 1: Focus Glow */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase mb-6 block">Focus Glow</span>
              <div class="space-y-4">
                <div class="input-focus-glow relative">
                  <div class="input-glow-border absolute -inset-[1px] rounded-xl bg-gradient-to-r from-apple-blue to-apple-purple opacity-0 transition-opacity duration-300 blur-[2px]" />
                  <input type="text" placeholder="Enter your email..." class="relative w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm outline-none transition-all duration-300 focus:border-apple-blue/50 dark:focus:border-apple-blue/30 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>
                <p class="text-xs text-gray-400 dark:text-gray-600">聚焦时外发光渐变边框</p>
              </div>
            </div>

            {/* Input 2: Float Label */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase mb-6 block">Float Label</span>
              <div class="space-y-4">
                <div class="float-label-wrapper relative">
                  <input type="text" id="float-input" class="float-input peer w-full px-4 py-3 pt-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm outline-none transition-all duration-300 focus:border-apple-blue/50 dark:focus:border-apple-blue/30" placeholder=" " />
                  <label for="float-input" class="float-label absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-600 transition-all duration-300 pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-apple-blue peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs">Username</label>
                </div>
                <p class="text-xs text-gray-400 dark:text-gray-600">输入时标签上浮动画</p>
              </div>
            </div>

            {/* Input 3: Validation */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase mb-6 block">Validation Feedback</span>
              <div class="space-y-4">
                <div class="validation-wrapper relative">
                  <input type="email" placeholder="email@example.com" class="validation-input w-full px-4 py-3 pr-10 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                  <div class="validation-icon absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center opacity-0 transition-all duration-300 scale-50">
                    <svg class="valid-icon w-5 h-5 text-apple-green hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    <svg class="invalid-icon w-5 h-5 text-apple-red hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </div>
                  <p class="validation-msg text-xs mt-2 transition-all duration-300 opacity-0 translate-y-2"></p>
                </div>
                <p class="text-xs text-gray-400 dark:text-gray-600">实时邮箱格式验证反馈</p>
              </div>
            </div>

            {/* Input 4: Search with kbd */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <span class="text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase mb-6 block">Command Search</span>
              <div class="space-y-4">
                <div class="search-wrapper relative group">
                  <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600 transition-colors duration-300 group-focus-within:text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input type="text" placeholder="Search components..." class="search-input w-full pl-10 pr-16 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm outline-none transition-all duration-300 focus:border-apple-blue/50 dark:focus:border-apple-blue/30 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                  <kbd class="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-[10px] font-mono text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-white/10">⌘K</kbd>
                </div>
                <p class="text-xs text-gray-400 dark:text-gray-600">Vercel 风格搜索 + 快捷键提示</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION: MICRO LOADERS ═══════════ */}
      <section id="loaders" class="relative py-32 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-20">
            <span class="inline-block text-xs font-mono tracking-widest uppercase text-apple-orange mb-4">04 / Loaders</span>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Micro Loaders</h2>
            <p class="text-lg text-gray-500 dark:text-gray-400 max-w-xl">不只是等待 · 更是视觉享受<br/>让加载过程变成缓解焦虑的趣味动画</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Loader 1: Orbit */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <div class="loader-orbit relative w-10 h-10">
                <div class="absolute inset-0 rounded-full border-2 border-apple-blue/20" />
                <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-apple-blue animate-spin" style="animation-duration: 0.8s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Orbit</span>
            </div>

            {/* Loader 2: Pulse Dots */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <div class="loader-dots flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-apple-purple animate-pulse" style="animation-delay: 0s" />
                <div class="w-2.5 h-2.5 rounded-full bg-apple-purple animate-pulse" style="animation-delay: 0.2s" />
                <div class="w-2.5 h-2.5 rounded-full bg-apple-purple animate-pulse" style="animation-delay: 0.4s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Pulse</span>
            </div>

            {/* Loader 3: Wave Bars */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <div class="loader-wave flex items-end gap-1 h-8">
                <div class="w-1 bg-apple-green rounded-full animate-wave-bar" style="--delay: 0s; animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0s" />
                <div class="w-1 bg-apple-green rounded-full animate-wave-bar" style="--delay: 0.1s; animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0.1s" />
                <div class="w-1 bg-apple-green rounded-full animate-wave-bar" style="--delay: 0.2s; animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0.2s" />
                <div class="w-1 bg-apple-green rounded-full animate-wave-bar" style="--delay: 0.3s; animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0.3s" />
                <div class="w-1 bg-apple-green rounded-full animate-wave-bar" style="--delay: 0.4s; animation: wave-bar 1.2s ease-in-out infinite; animation-delay: 0.4s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Wave</span>
            </div>

            {/* Loader 4: Morphing Square */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <div class="loader-morph-square w-8 h-8 bg-apple-orange rounded-md" style="animation: morph-square 2s ease-in-out infinite" />
              <span class="mt-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Morph</span>
            </div>

            {/* Loader 5: Bounce */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <div class="loader-bounce flex gap-2">
                <div class="w-3 h-3 rounded-full bg-apple-pink" style="animation: bounce-loader 0.6s ease-in-out infinite alternate; animation-delay: 0s" />
                <div class="w-3 h-3 rounded-full bg-apple-pink" style="animation: bounce-loader 0.6s ease-in-out infinite alternate; animation-delay: 0.15s" />
                <div class="w-3 h-3 rounded-full bg-apple-pink" style="animation: bounce-loader 0.6s ease-in-out infinite alternate; animation-delay: 0.3s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Bounce</span>
            </div>

            {/* Loader 6: Gradient Ring */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <div class="loader-gradient-ring relative w-10 h-10">
                <svg class="w-10 h-10 animate-spin" style="animation-duration: 1.5s" viewBox="0 0 40 40">
                  <defs>
                    <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#007AFF" />
                      <stop offset="50%" stop-color="#AF52DE" />
                      <stop offset="100%" stop-color="#FF2D55" />
                    </linearGradient>
                  </defs>
                  <circle cx="20" cy="20" r="16" fill="none" stroke="url(#ring-grad)" stroke-width="3" stroke-linecap="round" stroke-dasharray="80 100" />
                </svg>
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Gradient</span>
            </div>

            {/* Loader 7: DNA Helix */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <div class="loader-dna flex gap-1 h-8 items-center">
                <div class="w-1.5 h-1.5 rounded-full bg-apple-teal" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0s" />
                <div class="w-1.5 h-1.5 rounded-full bg-apple-blue" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0.15s" />
                <div class="w-1.5 h-1.5 rounded-full bg-apple-indigo" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0.3s" />
                <div class="w-1.5 h-1.5 rounded-full bg-apple-purple" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0.45s" />
                <div class="w-1.5 h-1.5 rounded-full bg-apple-pink" style="animation: dna-helix 1.5s ease-in-out infinite; animation-delay: 0.6s" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">DNA</span>
            </div>

            {/* Loader 8: Progress */}
            <div class="component-card relative rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-300/80 dark:hover:border-white/10 transition-all duration-500">
              <div class="w-24 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-apple-blue to-apple-purple" style="animation: progress-bar 2s ease-in-out infinite" />
              </div>
              <span class="mt-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 tracking-wider uppercase">Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer class="relative py-16 px-6 border-t border-gray-200/50 dark:border-white/5">
        <div class="max-w-6xl mx-auto text-center">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-apple-blue to-apple-purple flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span class="font-semibold">Micro Lab</span>
          </div>
          <p class="text-sm text-gray-400 dark:text-gray-600 mb-2">Crafted with obsessive attention to detail</p>
          <p class="text-xs text-gray-300 dark:text-gray-700">Apple-style Motion &middot; 60fps &middot; Premium UI Components</p>
        </div>
      </footer>
    </>
  )
})

// ──────────────────────────────────────────────
// API endpoint
// ──────────────────────────────────────────────
app.get('/api/info', (c) => {
  return c.json({
    name: 'Micro-interaction Lab',
    version: '1.0.0',
    components: ['Magical Buttons', 'Smooth Cards', 'Input Feedback', 'Micro Loaders'],
    author: 'Micro Lab'
  })
})

export default app
