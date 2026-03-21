<p align="center">
  <img src="https://img.shields.io/badge/version-3.0.0-007AFF?style=flat-square&labelColor=1a1a2e" alt="version" />
  <img src="https://img.shields.io/badge/Hono-v4-FF6F00?style=flat-square&logo=hono&logoColor=white" alt="Hono" />
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Security-Hardened-34C759?style=flat-square" alt="Security Hardened" />
</p>

<h1 align="center">Micro-interaction Lab</h1>

<p align="center">
  <strong>A premium micro-interaction component laboratory showcasing Apple-style motion design</strong><br/>
  <sub>探索动画边界 · 提升交互愉悦感 · 安全加固的前端微交互实验室</sub>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#security">Security</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#project-structure">Structure</a> ·
  <a href="#api-reference">API</a> ·
  <a href="#architecture">Architecture</a>
</p>

---

## Overview

**Micro-interaction Lab** is a curated showcase of premium UI micro-interactions built with obsessive attention to detail. Inspired by Apple's Human Interface Guidelines, Linear, and Vercel, every animation targets **60fps silk-smooth rendering** with custom easing curves and spring physics.

The project is fully **security-hardened** with 6 layers of defense-in-depth protection, making it both a beautiful interactive demo and a reference implementation for secure edge-deployed web applications.

### What makes it special?

- **Apple-style Motion** — Custom cubic-bezier easing tokens (`--ease-spring`, `--ease-out-expo`, `--ease-bounce`) for natural, physics-based animations
- **Zero Dependencies Frontend** — No React, no Vue, no build-time CSS framework — pure vanilla JS + Tailwind CDN + hand-crafted CSS
- **Security-First** — CSP, HSTS, rate limiting, bot detection, anti-injection, source code protection
- **Edge-Native** — Built for Cloudflare Workers/Pages, globally distributed with <50ms cold start
- **Bilingual i18n** — Full Chinese/English support with animated language switching
- **Dark Mode** — System-aware theme toggle with smooth 500ms cross-fade transitions

---

## Features

### 1. Magical Buttons

| Component | Effect | Key Technique |
|-----------|--------|---------------|
| **Aurora Glow** | Gradient shimmer + gloss sweep | `background-size: 200%` + `animate-shimmer` |
| **Neon Border** | Rotating rainbow border | `conic-gradient` + `animate-spin` |
| **Magnetic Pull** | Cursor-attracted movement | `mousemove` event + strength factor 0.3 |
| **Ripple Effect** | Material Design water ripple | Dynamic `<span>` insertion + `scale(0→4)` |
| **Morphing Button** | Submit → Loading → Success | State machine with `data-state` + CSS transitions |
| **Spotlight** | Cursor-tracking light effect | `mousemove` + absolute positioned radial gradient |

### 2. Smooth Cards

| Component | Effect | Key Technique |
|-----------|--------|---------------|
| **3D Tilt** | Parallax depth on hover | `perspective: 800px` + `rotateX/Y` + `preserve-3d` |
| **Glow Border** | Gradient border reveal | `1.5px` inner offset + `opacity` transition |
| **Glassmorphism** | Frosted glass overlay | `backdrop-filter: blur(xl)` + `bg-white/30` |
| **Reveal Card** | Bottom slide-in content | `translate-y-full → 0` with spring easing |
| **Stacked Layers** | Multi-layer hover expand | 3 stacked elements with staggered `translate-y` |
| **Spotlight Card** | Cursor-tracking light | 300px radial gradient following mouse position |

### 3. Input Feedback

| Component | Effect | Key Technique |
|-----------|--------|---------------|
| **Focus Glow** | Gradient glow border on focus | `blur(2px)` overlay + `:focus-within` trigger |
| **Float Label** | Label floats up on input | CSS `peer` selector + `top` transition |
| **Validation** | Real-time email checking | Regex + 300ms debounce + icon scale animation |
| **Command Search** | Vercel-style search bar | `⌘K` keyboard hint + icon color transition |

### 4. Micro Loaders

8 distinct loading animations: **Orbit**, **Pulse**, **Wave**, **Morph**, **Bounce**, **Gradient**, **DNA Helix**, **Progress Bar** — each using pure CSS keyframes with no JavaScript.

### 5. Global Features

- **Frosted Glass Navigation** — `backdrop-filter: blur(20px) saturate(1.8)` with sliding pill indicator
- **Scroll-Reveal System** — `IntersectionObserver` with staggered 70ms delays
- **Floating Particles** — 12 randomly colored dots with `12s` float cycle
- **Back-to-Top Button** — Appears at 600px scroll with spring animation
- **Mobile Hamburger Menu** — Animated X toggle with backdrop blur panel
- **Reduced Motion Support** — Full `prefers-reduced-motion` media query

---

<a id="security"></a>
## Security Architecture

The application implements **6 layers of defense-in-depth protection**:

```
Request → [Path Block] → [Security Headers] → [Rate Limit] → [Bot Filter] → [Input Validation] → [Honeypot] → App
```

### Layer 1: Sensitive Path Blocking

All source code and configuration files are blocked at the routing level:

```
/_worker.js    → 404    /src/*         → 404    /.git/*        → 404
/.env          → 404    /package.json  → 404    /wrangler.*    → 404
/node_modules  → 404    /tsconfig*     → 404    /vite.config*  → 404
/.wrangler/*   → 404    /migrations/*  → 404    /ecosystem.*   → 404
```

### Layer 2: Security Response Headers

Every response includes:

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | Strict whitelist | Prevent XSS, injection |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Force HTTPS |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer leakage |
| `Permissions-Policy` | Disable camera/mic/geo/payment/usb/etc. | Restrict browser APIs |
| `X-Permitted-Cross-Domain-Policies` | `none` | Block Flash/PDF cross-domain |

### Layer 3: Rate Limiting

- **120 requests per 60-second window** per IP address
- Automatic cleanup when map exceeds 10,000 entries
- `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers in every response
- Returns `429 Too Many Requests` when exceeded

### Layer 4: Bot Detection

API routes (`/api/*`) are protected with User-Agent filtering:

```
Blocked: scrapy, python-requests, curl, wget, spider, crawler,
         headlesschrome, phantomjs, selenium, puppeteer
```

Returns `403 Access Denied` for detected bot user agents.

### Layer 5: Content-Type Enforcement

`POST`, `PUT`, `PATCH` requests to `/api/*` must include valid Content-Type:

```
Allowed: application/json, application/x-www-form-urlencoded, multipart/form-data
Other:   → 415 Unsupported Media Type
```

### Layer 6: Honeypot Traps

Common attack target paths return `404` silently:

```
/admin  /wp-admin  /wp-login.php  /.env  /phpinfo.php  /config.php
```

### Client-Side Source Protection

| Protection | Method |
|------------|--------|
| **Disable right-click** | `contextmenu` event blocked |
| **Block shortcuts** | `Ctrl+U`, `Ctrl+S`, `F12`, `Ctrl+Shift+I/J/C`, `Ctrl+P` intercepted |
| **Disable selection** | `selectstart` blocked on non-input elements |
| **Disable drag** | `dragstart` blocked on all elements |
| **DevTools detection** | Timing-based detection with `performance.now()` |
| **Console watermark** | Branded messages with copyright notice |
| **DOM watermark** | Canvas-rendered invisible watermark with `MutationObserver` self-repair |

---

<a id="tech-stack"></a>
## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| **Runtime** | [Cloudflare Workers](https://workers.cloudflare.com/) | Edge computing platform |
| **Framework** | [Hono v4](https://hono.dev/) | Ultrafast web framework (14KB) |
| **Build** | [Vite](https://vitejs.dev/) | Frontend tooling |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (CDN) | Utility-first CSS |
| **Fonts** | [Inter](https://rsms.me/inter/) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | Typography |
| **Language** | TypeScript + JSX | Type-safe server rendering |
| **Deploy** | [Cloudflare Pages](https://pages.cloudflare.com/) | Global CDN deployment |
| **Dev Tools** | [Wrangler](https://developers.cloudflare.com/workers/wrangler/) + PM2 | Local dev & process management |

### Why This Stack?

- **Hono** — 14KB framework vs 500KB+ for Express/Next.js. Perfect for edge computing.
- **Cloudflare Pages** — 0ms cold start, 300+ PoPs globally, free tier generous.
- **Tailwind CDN** — Zero build-time CSS processing. Instant prototyping.
- **Vanilla JS** — No framework overhead. Direct DOM manipulation at 60fps.
- **JSX on Server** — Type-safe HTML generation without client-side hydration cost.

---

<a id="quick-start"></a>
## Quick Start

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/zhuj3188-ship-it/prospective.git
cd prospective

# Install dependencies
npm install
```

### Development

```bash
# Start Vite dev server (with hot reload)
npm run dev

# Or start with Wrangler (simulates Cloudflare Pages)
npm run build
npm run preview
```

### Production Build

```bash
# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

---

<a id="project-structure"></a>
## Project Structure

```
micro-interaction-lab/
├── src/
│   ├── index.tsx           # Main application — routes + security middleware + JSX UI
│   └── renderer.tsx        # HTML shell — meta tags, fonts, Tailwind config, favicon
├── public/
│   └── static/
│       ├── app.js          # Client-side engine — i18n, interactions, source protection
│       └── style.css       # Master stylesheet — easing tokens, animations, dark mode
├── dist/                   # Build output (generated)
│   └── _worker.js          # Compiled Cloudflare Worker
├── ecosystem.config.cjs    # PM2 process configuration
├── wrangler.jsonc          # Cloudflare Workers configuration
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

### File Responsibilities

| File | Lines | Responsibility |
|------|-------|----------------|
| `src/index.tsx` | ~726 | Security middleware (6 layers), routing, full JSX page rendering |
| `src/renderer.tsx` | ~73 | HTML document shell, Tailwind config, favicon, font loading |
| `public/static/app.js` | ~737 | i18n engine, theme toggle, scroll reveal, button/card interactions, source protection |
| `public/static/style.css` | ~485 | CSS custom properties, easing tokens, all animations, responsive rules |

---

<a id="api-reference"></a>
## API Reference

### `GET /`
Returns the full HTML page with all micro-interaction components.

### `GET /api/info`
Returns application metadata.

```json
{
  "name": "Micro-interaction Lab",
  "version": "3.0.0",
  "components": ["Magical Buttons", "Smooth Cards", "Input Feedback", "Micro Loaders"],
  "security": ["CSP", "HSTS", "Rate-Limiting", "Bot-Detection", "XSS-Protection", "Anti-Injection"]
}
```

### `GET /api/health`
Health check endpoint.

```json
{
  "status": "ok",
  "timestamp": "2026-03-21T07:00:47.431Z"
}
```

### Error Responses

| Code | Condition |
|------|-----------|
| `403` | Bot user-agent detected on API routes |
| `404` | Unknown route / blocked sensitive path / honeypot trap |
| `415` | Invalid Content-Type on POST/PUT/PATCH |
| `429` | Rate limit exceeded (120 req/min) |
| `500` | Internal server error (caught by global handler) |

---

<a id="architecture"></a>
## Architecture

### Request Flow

```
Client Request
     │
     ▼
┌─────────────────────┐
│  Path Blocker        │ ← Blocks /_worker.js, /src/*, /.git/*, etc.
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Security Headers    │ ← CSP, HSTS, X-Frame-Options, etc.
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Rate Limiter        │ ← 120 req/min per IP → 429
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Bot Detector        │ ← UA pattern matching → 403
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Content-Type Guard  │ ← POST/PUT/PATCH validation → 415
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Honeypot Traps      │ ← /admin, /wp-admin, etc. → 404
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  JSX Renderer        │ ← HTML document shell
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Route Handler       │ ← GET / (page) | GET /api/* (JSON)
└──────────┬──────────┘
           ▼
       Response
```

### CSS Easing System

The project uses a custom easing token system for consistent Apple-style motion:

```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);     /* Dramatic deceleration */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);     /* Smooth deceleration */
--ease-spring:    cubic-bezier(0.23, 1, 0.32, 1);     /* Spring overshoot */
--ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1);       /* Material standard */
--ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* Playful bounce */
```

### i18n System

The bilingual system supports 70+ translation keys across all UI components:

```javascript
// Language toggle with animated switch
currentLang = currentLang === 'zh' ? 'en' : 'zh';
// Elements fade out (150ms) → text swap → fade in (150ms)
```

Stored in `localStorage` as `micro-lab-lang` for persistence.

---

## Custom Animations Reference

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `hero-enter` | 0.9s | `--ease-out-expo` | Hero section entrance |
| `orb-float` | 20s | `ease-in-out` | Background gradient orbs |
| `particle-float` | 8-16s | `ease-in-out` | Floating particles |
| `scroll-dot` | 1.5s | `ease-in-out` | Scroll indicator |
| `wave-bar` | 1.2s | `ease-in-out` | Wave loader bars |
| `morph-square` | 2s | `ease-in-out` | Morphing square loader |
| `bounce-loader` | 0.6s | `ease-in-out` | Bouncing dots |
| `dna-helix` | 1.5s | `ease-in-out` | DNA helix dots |
| `progress-bar` | 2s | `ease-in-out` | Progress bar fill |
| `gradient-shift` | 8s | `ease` | Hero title gradient |
| `shimmer` | 2.5s | `linear` | Button gloss sweep |
| `menu-enter` | 0.3s | `--ease-spring` | Mobile menu open |
| `menu-exit` | 0.2s | `--ease-smooth` | Mobile menu close |
| `ripple-expand` | 0.6s | `--ease-out-expo` | Button ripple |

---

## Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 90+ | Full support |
| Safari | 15+ | Full support |
| Edge | 90+ | Full support |
| Mobile Safari | 15+ | Touch interactions adapted |
| Chrome Android | 90+ | Touch interactions adapted |

Requires `backdrop-filter` support for glass effects. Graceful degradation on older browsers via `prefers-reduced-motion` media query.

---

## Performance

| Metric | Value |
|--------|-------|
| **Bundle size** | ~104 KB (compiled worker) |
| **Static assets** | ~42 KB (CSS + JS) |
| **Dependencies** | 1 runtime (Hono 14KB) |
| **Cold start** | <50ms (Cloudflare Workers) |
| **Animation target** | 60fps with `will-change-transform` |
| **Lighthouse Score** | 90+ (Performance, Accessibility) |

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| **v3.0** | 2026-03-21 | Security hardening: CSP, HSTS, rate limiting, bot detection, anti-injection, source protection, honeypot traps. UI: favicon, back-to-top, security badge. |
| **v2.0** | 2026-03-21 | Comprehensive UI overhaul: frosted glass nav with sliding indicator, hero particles, scroll reveal, section glow dividers, mobile hamburger menu, footer redesign. |
| **v1.0** | 2026-03-21 | Initial release: 4 component sections (buttons, cards, inputs, loaders), i18n (zh/en), dark mode, responsive design. |

---

## Scripts

```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # Build for production (→ dist/)
npm run preview      # Preview with Wrangler local server
npm run deploy       # Build + deploy to Cloudflare Pages
npm run dev:sandbox  # Run Wrangler on 0.0.0.0:3000 (sandbox mode)
npm run clean-port   # Kill process on port 3000
npm run cf-typegen   # Generate Cloudflare bindings types
```

---

## License

This project is provided as-is for educational and demonstration purposes.

&copy; 2026 Micro Lab. All rights reserved.
