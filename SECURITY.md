# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 3.x     | Yes       |
| 2.x     | No        |
| 1.x     | No        |

## Security Architecture

Micro-interaction Lab implements 6 layers of defense-in-depth:

1. **Sensitive Path Blocking** - Source code and config files return 404
2. **Security Response Headers** - CSP, HSTS, X-Frame-Options, etc.
3. **Rate Limiting** - 120 requests per 60-second window per IP
4. **Bot Detection** - User-Agent filtering for known scrapers
5. **Content-Type Enforcement** - Validates POST/PUT/PATCH Content-Type
6. **Honeypot Traps** - Common attack paths silently blocked

Plus client-side protections: right-click blocking, keyboard shortcut interception, DevTools detection, console/DOM watermarking.

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them by:

1. Opening a **private security advisory** on this repository
2. Or emailing details to the project maintainer

### What to Include

- Type of issue (e.g., buffer overflow, SQL injection, XSS)
- Full paths of source file(s) related to the issue
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue and how an attacker might exploit it

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Resolution**: Depends on severity, typically within 2 weeks for critical issues

## Security Best Practices for Contributors

When contributing to this project:

- Never commit secrets, API keys, or tokens
- Always use parameterized queries for any database operations
- Validate and sanitize all user inputs
- Follow the existing security middleware chain
- Test changes against the security test suite
- Do not disable or weaken any existing security measures

## Disclosure Policy

When a security issue is confirmed and fixed, we will:

1. Patch the vulnerability in the latest supported version
2. Release a new version with the fix
3. Publish a security advisory on GitHub
4. Credit the reporter (unless they prefer to remain anonymous)

Thank you for helping keep Micro-interaction Lab and its users safe!
