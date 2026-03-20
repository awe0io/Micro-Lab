import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ?? 'Micro-interaction Lab'}</title>
        <meta name="description" content="A premium micro-interaction component laboratory showcasing Apple-style motion design" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
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
