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
  <strong>一个展示 Apple 风格动效设计的高品质微交互组件实验室</strong>
</p>

<p align="center">
  <a href="#en">English</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#zh">中文</a>
</p>

---

<!-- ╔══════════════════════════════════════════════════════════╗ -->
<!-- ║                    ENGLISH VERSION                       ║ -->
<!-- ╚══════════════════════════════════════════════════════════╝ -->

<a id="en"></a>

# English

<p>
  <a href="#en-features">Features</a> ·
  <a href="#en-security">Security</a> ·
  <a href="#en-tech-stack">Tech Stack</a> ·
  <a href="#en-quick-start">Quick Start</a> ·
  <a href="#en-structure">Structure</a> ·
  <a href="#en-api">API</a> ·
  <a href="#en-architecture">Architecture</a>
</p>

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

<a id="en-features"></a>

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

<a id="en-security"></a>

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

<a id="en-tech-stack"></a>

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

<a id="en-quick-start"></a>

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

<a id="en-structure"></a>

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

<a id="en-api"></a>

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

<a id="en-architecture"></a>

## Architecture

### Request Flow

```
Client Request
     │
     ▼
┌─────────────────────┐
│  Path Blocker        │  ← Blocks /_worker.js, /src/*, /.git/*, etc.
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Security Headers    │  ← CSP, HSTS, X-Frame-Options, etc.
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Rate Limiter        │  ← 120 req/min per IP → 429
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Bot Detector        │  ← UA pattern matching → 403
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Content-Type Guard  │  ← POST/PUT/PATCH validation → 415
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Honeypot Traps      │  ← /admin, /wp-admin, etc. → 404
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  JSX Renderer        │  ← HTML document shell
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Route Handler       │  ← GET / (page) | GET /api/* (JSON)
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

<!-- ╔══════════════════════════════════════════════════════════╗ -->
<!-- ║                    中文版本                               ║ -->
<!-- ╚══════════════════════════════════════════════════════════╝ -->

<a id="zh"></a>

# 中文

<p>
  <a href="#zh-features">功能特性</a> ·
  <a href="#zh-security">安全架构</a> ·
  <a href="#zh-tech-stack">技术栈</a> ·
  <a href="#zh-quick-start">快速开始</a> ·
  <a href="#zh-structure">项目结构</a> ·
  <a href="#zh-api">API 参考</a> ·
  <a href="#zh-architecture">架构设计</a>
</p>

## 项目简介

**Micro-interaction Lab** 是一个精心策划的高品质 UI 微交互组件展示实验室，以极致的细节打造每一个交互。灵感源自 Apple 人机交互指南（HIG）、Linear 和 Vercel，所有动画均以 **60fps 丝滑渲染**为目标，采用自定义缓动曲线和弹簧物理模型。

项目拥有完整的 **6 层纵深安全防护体系**，既是一个精美的交互演示，也是安全边缘应用部署的参考实现。

### 为什么它与众不同？

- **Apple 风格动效** — 自定义 cubic-bezier 缓动令牌 (`--ease-spring`, `--ease-out-expo`, `--ease-bounce`)，实现自然的物理动画
- **零前端依赖** — 无 React、无 Vue、无构建时 CSS 框架 — 纯原生 JS + Tailwind CDN + 手工精调 CSS
- **安全至上** — CSP、HSTS、速率限制、Bot 检测、防注入、源码保护
- **边缘原生** — 专为 Cloudflare Workers/Pages 打造，全球分布式部署，冷启动 <50ms
- **中英双语 i18n** — 完整的中英文切换支持，带动画过渡效果
- **暗色模式** — 系统感知主题切换，500ms 平滑渐变过渡

---

<a id="zh-features"></a>

## 功能特性

### 1. 魔法按钮

| 组件 | 效果 | 核心技术 |
|------|------|----------|
| **极光流光** | 渐变流光 + 光泽扫过 | `background-size: 200%` + `animate-shimmer` |
| **霓虹边框** | 旋转彩虹边框 | `conic-gradient` + `animate-spin` |
| **磁力吸附** | 鼠标靠近时的吸附位移 | `mousemove` 事件 + 强度系数 0.3 |
| **水波纹** | Material Design 水波纹扩散 | 动态 `<span>` 插入 + `scale(0→4)` |
| **变形按钮** | 提交 → 加载中 → 完成 | `data-state` 状态机 + CSS 过渡 |
| **聚光灯** | 鼠标追踪的聚光效果 | `mousemove` + 绝对定位径向渐变 |

### 2. 丝滑卡片

| 组件 | 效果 | 核心技术 |
|------|------|----------|
| **3D 倾斜** | 悬浮视差深度 | `perspective: 800px` + `rotateX/Y` + `preserve-3d` |
| **发光边框** | 悬浮时渐变边框显现 | `1.5px` 内偏移 + `opacity` 过渡 |
| **毛玻璃拟态** | 磨砂玻璃覆层 | `backdrop-filter: blur(xl)` + `bg-white/30` |
| **揭示卡片** | 底部滑入隐藏内容 | `translate-y-full → 0` + 弹簧缓动 |
| **层叠卡片** | 多层悬浮展开 | 3 层堆叠元素 + 阶梯式 `translate-y` |
| **聚光灯卡片** | 鼠标追踪柔光 | 300px 径向渐变跟随鼠标位置 |

### 3. 灵动输入

| 组件 | 效果 | 核心技术 |
|------|------|----------|
| **聚焦光晕** | 聚焦时外发光渐变边框 | `blur(2px)` 叠加层 + `:focus-within` 触发 |
| **浮动标签** | 输入时标签上浮 | CSS `peer` 选择器 + `top` 过渡 |
| **实时验证** | 实时邮箱格式检查 | 正则 + 300ms 防抖 + 图标缩放动画 |
| **命令搜索** | Vercel 风格搜索框 | `⌘K` 快捷键提示 + 图标变色过渡 |

### 4. 微加载动画

8 种独特加载动画：**轨道旋转**、**脉冲**、**波浪**、**变形方块**、**弹跳**、**渐变**、**DNA 螺旋**、**进度条** — 均使用纯 CSS 关键帧，无需 JavaScript。

### 5. 全局特性

- **毛玻璃导航栏** — `backdrop-filter: blur(20px) saturate(1.8)` + 滑动药丸指示器
- **滚动渐现系统** — `IntersectionObserver` + 70ms 阶梯延迟
- **浮动粒子** — 12 个随机彩色圆点，`12s` 浮动周期
- **回到顶部按钮** — 滚动 600px 后显示，弹簧动画
- **移动端汉堡菜单** — 动画 X 切换 + 背景模糊面板
- **减少动画支持** — 完整的 `prefers-reduced-motion` 媒体查询

---

<a id="zh-security"></a>

## 安全架构

应用实现了 **6 层纵深防御**：

```
请求 → [路径拦截] → [安全响应头] → [速率限制] → [Bot过滤] → [输入验证] → [蜜罐陷阱] → 应用
```

### 第 1 层：敏感路径拦截

所有源码和配置文件在路由层被拦截：

```
/_worker.js    → 404    /src/*         → 404    /.git/*        → 404
/.env          → 404    /package.json  → 404    /wrangler.*    → 404
/node_modules  → 404    /tsconfig*     → 404    /vite.config*  → 404
/.wrangler/*   → 404    /migrations/*  → 404    /ecosystem.*   → 404
```

### 第 2 层：安全响应头

每个响应均包含：

| 头部 | 值 | 用途 |
|------|-----|------|
| `Content-Security-Policy` | 严格白名单 | 防止 XSS 和注入攻击 |
| `X-Frame-Options` | `DENY` | 防止点击劫持 |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | 强制 HTTPS |
| `X-Content-Type-Options` | `nosniff` | 防止 MIME 嗅探 |
| `X-XSS-Protection` | `1; mode=block` | 传统 XSS 过滤器 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 控制 Referrer 泄露 |
| `Permissions-Policy` | 禁用摄像头/麦克风/地理位置/支付/USB 等 | 限制浏览器 API |
| `X-Permitted-Cross-Domain-Policies` | `none` | 阻止 Flash/PDF 跨域 |

### 第 3 层：速率限制

- 每个 IP 地址 **60 秒内最多 120 次请求**
- 映射表超过 10,000 条时自动清理
- 每个响应附带 `X-RateLimit-Limit` 和 `X-RateLimit-Remaining` 头
- 超限返回 `429 Too Many Requests`

### 第 4 层：Bot 检测

API 路由 (`/api/*`) 受 User-Agent 过滤保护：

```
拦截列表：scrapy, python-requests, curl, wget, spider, crawler,
          headlesschrome, phantomjs, selenium, puppeteer
```

检测到 Bot UA 时返回 `403 Access Denied`。

### 第 5 层：Content-Type 强制

发往 `/api/*` 的 `POST`、`PUT`、`PATCH` 请求必须包含合法 Content-Type：

```
允许：application/json, application/x-www-form-urlencoded, multipart/form-data
其他：→ 415 Unsupported Media Type
```

### 第 6 层：蜜罐陷阱

常见攻击目标路径静默返回 `404`：

```
/admin  /wp-admin  /wp-login.php  /.env  /phpinfo.php  /config.php
```

### 客户端源码保护

| 保护措施 | 实现方式 |
|----------|----------|
| **禁用右键菜单** | 拦截 `contextmenu` 事件 |
| **拦截快捷键** | 屏蔽 `Ctrl+U`、`Ctrl+S`、`F12`、`Ctrl+Shift+I/J/C`、`Ctrl+P` |
| **禁止文本选择** | 非输入框元素拦截 `selectstart` |
| **禁止拖拽** | 所有元素拦截 `dragstart` |
| **DevTools 检测** | 基于 `performance.now()` 的计时检测 |
| **控制台水印** | 品牌标识信息 + 版权声明 |
| **DOM 水印** | Canvas 渲染的不可见水印 + `MutationObserver` 自修复机制 |

---

<a id="zh-tech-stack"></a>

## 技术栈

| 层级 | 技术 | 用途 |
|------|------|------|
| **运行时** | [Cloudflare Workers](https://workers.cloudflare.com/) | 边缘计算平台 |
| **框架** | [Hono v4](https://hono.dev/) | 超轻量 Web 框架 (14KB) |
| **构建** | [Vite](https://vitejs.dev/) | 前端构建工具 |
| **样式** | [Tailwind CSS](https://tailwindcss.com/) (CDN) | 原子化 CSS |
| **字体** | [Inter](https://rsms.me/inter/) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | 排版字体 |
| **语言** | TypeScript + JSX | 类型安全的服务端渲染 |
| **部署** | [Cloudflare Pages](https://pages.cloudflare.com/) | 全球 CDN 部署 |
| **开发工具** | [Wrangler](https://developers.cloudflare.com/workers/wrangler/) + PM2 | 本地开发和进程管理 |

### 为什么选择这套技术栈？

- **Hono** — 14KB 框架 vs Express/Next.js 的 500KB+，完美适配边缘计算
- **Cloudflare Pages** — 0ms 冷启动，全球 300+ 节点，免费额度充足
- **Tailwind CDN** — 零构建时 CSS 处理，即时原型开发
- **原生 JS** — 无框架开销，直接 DOM 操作达到 60fps
- **服务端 JSX** — 类型安全的 HTML 生成，无客户端水合成本

---

<a id="zh-quick-start"></a>

## 快速开始

### 前置要求

- Node.js >= 18
- npm >= 9

### 安装

```bash
# 克隆仓库
git clone https://github.com/zhuj3188-ship-it/prospective.git
cd prospective

# 安装依赖
npm install
```

### 开发

```bash
# 启动 Vite 开发服务器（带热重载）
npm run dev

# 或使用 Wrangler 启动（模拟 Cloudflare Pages 环境）
npm run build
npm run preview
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 部署到 Cloudflare Pages
npm run deploy
```

---

<a id="zh-structure"></a>

## 项目结构

```
micro-interaction-lab/
├── src/
│   ├── index.tsx           # 主应用 — 路由 + 安全中间件 + JSX 界面
│   └── renderer.tsx        # HTML 外壳 — meta 标签、字体、Tailwind 配置、favicon
├── public/
│   └── static/
│       ├── app.js          # 客户端引擎 — i18n、交互效果、源码保护
│       └── style.css       # 主样式表 — 缓动令牌、动画、暗色模式
├── dist/                   # 构建输出（自动生成）
│   └── _worker.js          # 编译后的 Cloudflare Worker
├── ecosystem.config.cjs    # PM2 进程配置
├── wrangler.jsonc          # Cloudflare Workers 配置
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json           # TypeScript 配置
├── package.json            # 依赖和脚本
└── README.md               # 本文件
```

### 文件职责

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/index.tsx` | ~726 | 安全中间件（6层）、路由、完整 JSX 页面渲染 |
| `src/renderer.tsx` | ~73 | HTML 文档外壳、Tailwind 配置、favicon、字体加载 |
| `public/static/app.js` | ~737 | i18n 引擎、主题切换、滚动渐现、按钮/卡片交互、源码保护 |
| `public/static/style.css` | ~485 | CSS 自定义属性、缓动令牌、全部动画、响应式规则 |

---

<a id="zh-api"></a>

## API 参考

### `GET /`
返回包含所有微交互组件的完整 HTML 页面。

### `GET /api/info`
返回应用元数据。

```json
{
  "name": "Micro-interaction Lab",
  "version": "3.0.0",
  "components": ["Magical Buttons", "Smooth Cards", "Input Feedback", "Micro Loaders"],
  "security": ["CSP", "HSTS", "Rate-Limiting", "Bot-Detection", "XSS-Protection", "Anti-Injection"]
}
```

### `GET /api/health`
健康检查端点。

```json
{
  "status": "ok",
  "timestamp": "2026-03-21T07:00:47.431Z"
}
```

### 错误响应

| 状态码 | 触发条件 |
|--------|----------|
| `403` | API 路由检测到 Bot User-Agent |
| `404` | 未知路由 / 敏感路径拦截 / 蜜罐陷阱 |
| `415` | POST/PUT/PATCH 请求的 Content-Type 不合法 |
| `429` | 速率限制超标（120 次/分钟） |
| `500` | 服务器内部错误（全局错误处理器捕获） |

---

<a id="zh-architecture"></a>

## 架构设计

### 请求流程

```
客户端请求
     │
     ▼
┌─────────────────────┐
│  路径拦截器          │  ← 拦截 /_worker.js, /src/*, /.git/* 等
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  安全响应头          │  ← CSP, HSTS, X-Frame-Options 等
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  速率限制器          │  ← 每 IP 120次/分 → 429
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Bot 检测器          │  ← UA 模式匹配 → 403
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Content-Type 守卫   │  ← POST/PUT/PATCH 验证 → 415
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  蜜罐陷阱           │  ← /admin, /wp-admin 等 → 404
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  JSX 渲染器          │  ← HTML 文档外壳
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  路由处理器          │  ← GET / (页面) | GET /api/* (JSON)
└──────────┬──────────┘
           ▼
       响应返回
```

### CSS 缓动系统

项目使用自定义缓动令牌系统，确保一致的 Apple 风格动效：

```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);     /* 急剧减速 */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);     /* 平滑减速 */
--ease-spring:    cubic-bezier(0.23, 1, 0.32, 1);     /* 弹簧回弹 */
--ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1);       /* Material 标准 */
--ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* 活泼弹跳 */
```

### i18n 国际化系统

双语系统支持 70+ 翻译键，覆盖所有 UI 组件：

```javascript
// 带动画的语言切换
currentLang = currentLang === 'zh' ? 'en' : 'zh';
// 元素淡出 (150ms) → 文本替换 → 淡入 (150ms)
```

语言偏好通过 `localStorage` 的 `micro-lab-lang` 键持久化存储。

---

## 自定义动画参考

| 动画 | 持续时间 | 缓动 | 用途 |
|------|----------|------|------|
| `hero-enter` | 0.9s | `--ease-out-expo` | 首屏入场动画 |
| `orb-float` | 20s | `ease-in-out` | 背景渐变光球浮动 |
| `particle-float` | 8-16s | `ease-in-out` | 浮动粒子 |
| `scroll-dot` | 1.5s | `ease-in-out` | 滚动指示器 |
| `wave-bar` | 1.2s | `ease-in-out` | 波浪加载条 |
| `morph-square` | 2s | `ease-in-out` | 变形方块加载器 |
| `bounce-loader` | 0.6s | `ease-in-out` | 弹跳圆点 |
| `dna-helix` | 1.5s | `ease-in-out` | DNA 螺旋圆点 |
| `progress-bar` | 2s | `ease-in-out` | 进度条填充 |
| `gradient-shift` | 8s | `ease` | 标题渐变位移 |
| `shimmer` | 2.5s | `linear` | 按钮光泽扫过 |
| `menu-enter` | 0.3s | `--ease-spring` | 移动菜单展开 |
| `menu-exit` | 0.2s | `--ease-smooth` | 移动菜单关闭 |
| `ripple-expand` | 0.6s | `--ease-out-expo` | 按钮水波纹 |

---

## 浏览器支持

| 浏览器 | 版本 | 备注 |
|--------|------|------|
| Chrome | 90+ | 完整支持 |
| Firefox | 90+ | 完整支持 |
| Safari | 15+ | 完整支持 |
| Edge | 90+ | 完整支持 |
| Mobile Safari | 15+ | 已适配触摸交互 |
| Chrome Android | 90+ | 已适配触摸交互 |

需要 `backdrop-filter` 支持以呈现毛玻璃效果。旧版浏览器通过 `prefers-reduced-motion` 媒体查询优雅降级。

---

## 性能指标

| 指标 | 数值 |
|------|------|
| **构建包大小** | ~104 KB（编译后 Worker） |
| **静态资源** | ~42 KB（CSS + JS） |
| **运行时依赖** | 仅 1 个（Hono 14KB） |
| **冷启动** | <50ms（Cloudflare Workers） |
| **动画目标** | 60fps + `will-change-transform` |
| **Lighthouse 分数** | 90+（性能、可访问性） |

---

## 版本历史

| 版本 | 日期 | 更新亮点 |
|------|------|----------|
| **v3.0** | 2026-03-21 | 安全加固：CSP、HSTS、速率限制、Bot 检测、防注入、源码保护、蜜罐陷阱。UI：favicon、回到顶部、安全徽章。 |
| **v2.0** | 2026-03-21 | 全面 UI 改版：毛玻璃导航栏 + 滑动指示器、首屏粒子、滚动渐现、段落发光分隔线、移动端汉堡菜单、页脚重设计。 |
| **v1.0** | 2026-03-21 | 首版发布：4 大组件区（按钮、卡片、输入、加载器）、中英双语、暗色模式、响应式设计。 |

---

## 可用脚本

```bash
npm run dev          # 启动 Vite 开发服务器（热重载）
npm run build        # 构建生产版本（→ dist/）
npm run preview      # 使用 Wrangler 本地预览
npm run deploy       # 构建 + 部署到 Cloudflare Pages
npm run dev:sandbox  # 在 0.0.0.0:3000 运行 Wrangler（沙箱模式）
npm run clean-port   # 终止端口 3000 上的进程
npm run cf-typegen   # 生成 Cloudflare 绑定类型
```

---

## 许可

本项目按原样提供，用于教育和演示目的。

&copy; 2026 Micro Lab. 保留所有权利。
