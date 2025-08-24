/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--color-brand-primary)',
        'brand-secondary': 'var(--color-brand-secondary)',
        'brand-background': 'var(--color-brand-background)',
        'brand-foreground': 'var(--color-brand-foreground)',
        'brand-dark': 'var(--color-brand-dark)',
        'brand-gray': 'var(--color-brand-gray)',
        'brand-gray-light': 'var(--color-brand-gray-light)',
        'brand-light': 'var(--color-brand-light)',
        'brand-accent': 'var(--color-brand-accent)',
      },
      fontFamily: {
        'primary': 'var(--font-primary)',
        'heading': 'var(--font-heading)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'team-slide': 'team-slide 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'team-slide': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

