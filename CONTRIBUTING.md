# Contributing to Micro-interaction Lab

First off, thank you for considering contributing! Every bit of help is appreciated.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When filing a bug, include:**

- A clear, descriptive title
- Steps to reproduce the behavior
- Expected behavior vs. actual behavior
- Screenshots or GIFs if applicable
- Browser, OS, and version information

### Suggesting Features

Feature requests are welcome! Open an issue with the `enhancement` label.

**A good feature request includes:**

- A clear description of the problem it solves
- The proposed solution
- Alternative approaches considered
- Mockups or examples if applicable

### Pull Requests

1. **Fork** the repo and create your branch from `main`
2. **Install** dependencies: `npm install`
3. **Develop** with hot reload: `npm run dev`
4. **Test** your changes in multiple browsers
5. **Follow** the existing code style
6. **Commit** with [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `perf:` for performance improvements
7. **Push** to your fork and open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/prospective.git
cd prospective

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── index.tsx      # Server-side routes + security middleware + JSX UI
└── renderer.tsx   # HTML document shell

public/static/
├── app.js         # Client-side interactions, i18n, source protection
└── style.css      # All animations, easing tokens, dark mode
```

### Coding Guidelines

- **CSS**: Use CSS custom properties for theming. Follow the easing token system.
- **JavaScript**: Vanilla JS only. No frameworks. Keep it performant.
- **TypeScript**: Strict mode enabled. Use proper types.
- **Animations**: Target 60fps. Use `will-change` sparingly. Respect `prefers-reduced-motion`.
- **Security**: Never bypass security middleware. All new routes go through the full middleware chain.
- **i18n**: Add translations for both `zh` (Chinese) and `en` (English) for any new UI text.

### Adding a New Component

1. Add the JSX template in `src/index.tsx`
2. Add interaction logic in `public/static/app.js`
3. Add styles and animations in `public/static/style.css`
4. Add i18n keys for both languages
5. Update the component list in `/api/info`

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**
```
feat(buttons): add elastic stretch button component
fix(nav): correct indicator position on mobile
docs(readme): add animation reference table
perf(css): optimize scroll-reveal with will-change
```

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Questions?

Feel free to open a [discussion](https://github.com/zhuj3188-ship-it/prospective/discussions) or [issue](https://github.com/zhuj3188-ship-it/prospective/issues).

---

Thank you for helping make Micro-interaction Lab better!
