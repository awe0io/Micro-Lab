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

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='36' y2='36' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0%25' stop-color='%236366f1'/%3E%3Cstop offset='40%25' stop-color='%238b5cf6'/%3E%3Cstop offset='70%25' stop-color='%23a855f7'/%3E%3Cstop offset='100%25' stop-color='%23d946ef'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='4' y1='2' x2='28' y2='20' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0%25' stop-color='white' stop-opacity='0.5'/%3E%3Cstop offset='100%25' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='10' y1='8' x2='26' y2='28' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0%25' stop-color='white' stop-opacity='0.9'/%3E%3Cstop offset='50%25' stop-color='white' stop-opacity='0.4'/%3E%3Cstop offset='100%25' stop-color='white' stop-opacity='0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='36' height='36' rx='10' fill='url(%23a)'/%3E%3Cpath d='M4 10 Q4 4 10 4 L26 4 Q32 4 32 10 L32 18 Q18 22 4 18 Z' fill='url(%23b)'/%3E%3Crect x='1' y='1' width='34' height='34' rx='9.5' fill='none' stroke='white' stroke-opacity='0.18' stroke-width='0.6'/%3E%3Cg transform='translate(18,17)'%3E%3Cpath d='M0,-8 L-7,3 L0,0 Z' fill='url(%23c)' opacity='0.85'/%3E%3Cpath d='M0,-8 L7,3 L0,0 Z' fill='white' opacity='0.55'/%3E%3Cpath d='M-7,3 L0,0 L0,9 Z' fill='white' opacity='0.35'/%3E%3Cpath d='M7,3 L0,0 L0,9 Z' fill='white' opacity='0.2'/%3E%3Cline x1='0' y1='-8' x2='0' y2='9' stroke='white' stroke-width='0.5' opacity='0.6'/%3E%3Cline x1='-7' y1='3' x2='7' y2='3' stroke='white' stroke-width='0.4' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E" />

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
