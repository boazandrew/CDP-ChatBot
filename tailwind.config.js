/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.3s ease-out'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      colors: {
        // Primary chat colors
        'chat-blue': {
          100: '#e6f0ff',
          600: '#2563eb',
          800: '#1e40af'
        },
        // Dark mode gradients
        'dark-gray': {
          800: '#1f2937',
          900: '#111827'
        },
        // Code window colors
        'code-dark': '#1a1a1a',
        'code-header': '#2d2d2d'
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'] // For code blocks
      },
      boxShadow: {
        'message': '0 2px 6px rgba(0, 0, 0, 0.05)',
        'code': '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
              fontSize: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '1rem',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              fontSize: '1.25rem',
              marginTop: '1.25rem',
              marginBottom: '0.75rem',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              fontSize: '1.125rem',
              marginTop: '1.125rem',
              marginBottom: '0.75rem',
            },
            strong: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
            code: {
              color: theme('colors.pink.600'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontFamily: theme('fontFamily.mono').join(', '),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.200'),
              fontFamily: theme('fontFamily.mono').join(', '),
              borderRadius: '0.375rem',
              padding: '1rem',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.300'),
              },
            },
            code: {
              color: theme('colors.pink.400'),
              backgroundColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};