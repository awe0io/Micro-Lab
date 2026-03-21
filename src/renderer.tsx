import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ?? 'Micro-interaction Lab'}</title>
        <meta name="description" content="A premium micro-interaction component laboratory showcasing Apple-style motion design" />

        {/* Security Meta Tags */}
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="noarchive, notranslate" />

        {/* Favicon - Atom/Lab icon */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23007AFF'/%3E%3Cstop offset='40%25' stop-color='%235856D6'/%3E%3Cstop offset='100%25' stop-color='%23AF52DE'/%3E%3C/linearGradient%3E%3ClinearGradient id='gl' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='50%25' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='8' fill='url(%23bg)'/%3E%3Crect width='32' height='16' rx='8' fill='url(%23gl)'/%3E%3Cg transform='translate(16 16)' fill='none' stroke='white' stroke-width='1.6' opacity='0.9'%3E%3Cellipse rx='9' ry='3.5' transform='rotate(-30)'/%3E%3Cellipse rx='9' ry='3.5' transform='rotate(30)'/%3E%3Cellipse rx='9' ry='3.5' transform='rotate(90)'/%3E%3C/g%3E%3Ccircle cx='16' cy='16' r='2' fill='white'/%3E%3C/svg%3E" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
                  mono: ['JetBrains Mono', 'Menlo', 'monospace'],
                },
                colors: {
                  apple: {
                    blue: '#007AFF',
                    indigo: '#5856D6',
                    purple: '#AF52DE',
                    pink: '#FF2D55',
                    red: '#FF3B30',
                    orange: '#FF9500',
                    yellow: '#FFCC00',
                    green: '#34C759',
                    teal: '#5AC8FA',
                    gray: { 1: '#8E8E93', 2: '#636366', 3: '#48484A', 4: '#3A3A3C', 5: '#2C2C2E', 6: '#1C1C1E' }
                  }
                },
                animation: {
                  'float': 'float 6s ease-in-out infinite',
                  'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                  'shimmer': 'shimmer 2.5s linear infinite',
                  'gradient-shift': 'gradient-shift 8s ease infinite',
                },
                keyframes: {
                  float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
                  'glow-pulse': { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } },
                  shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
                  'gradient-shift': { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
                }
              }
            }
          }
        ` }} />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500">
        {children}
        <script src="/static/app.js" />
      </body>
    </html>
  )
})
