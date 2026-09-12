/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#11100F',
          light: '#242220',
          dark: '#0A0A09'
        },
        graphite: {
          DEFAULT: '#2C2A28',
          light: '#3D3A37',
          muted: '#635F5B',
          stone: '#E8E3DA',
          border: '#E2DDD4'
        },
        montezzigold: {
          DEFAULT: '#B68A48',
          light: '#CCA362',
          dark: '#9A7135',
          hover: '#A57B3B',
          metallic: '#C59E5F'
        },
        warmivory: {
          DEFAULT: '#F3EEE5',
          light: '#FAF8F5',
          card: '#FFFFFF',
          stone: '#EDE7DC',
          dark: '#E5DFD4'
        },
        walnut: {
          DEFAULT: '#5A3927',
          light: '#724933',
          dark: '#40271A'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'gold-subtle': '0 0 15px -3px rgba(182, 138, 72, 0.25)',
        'luxury': '0 20px 40px -15px rgba(44, 42, 40, 0.08)',
        'card-stone': '0 4px 20px 0 rgba(44, 42, 40, 0.05)',
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      letterSpacing: {
        'widest-luxury': '0.25em',
        'super-wide': '0.35em',
      }
    },
  },
  plugins: [],
}
