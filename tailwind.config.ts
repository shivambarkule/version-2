import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#ff4a74',
        'brand-secondary': '#ff8b66',
        'brand-dark': '#0a0a0a',
        'brand-gray': '#94a3b8',
        'brand-gray-light': '#e3e3e3',
        'brand-light': '#f4d3da',
        'brand-accent': '#ffd166',
        'brand-success': '#26ed6f',
        'brand-warning': '#facc15',
        'brand-error': '#f41f42',
        'brand-background': '#ffffff',
        'brand-foreground': '#151515',
        // Keep old colors for backward compatibility
        'pipely-blue': '#007BFF',
        'pipely-purple': '#E6E6FA',
        'pipely-light-blue': '#E6F3FF',
        'pipely-light-green': '#E6FFE6',
        'pipely-light-pink': '#FFE6E6',
      },
      fontFamily: {
        'primary': ['Poppins', 'system-ui', 'sans-serif'],
        'heading': ['Newsreader', 'serif'],
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

