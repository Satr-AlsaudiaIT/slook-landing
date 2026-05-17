/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Slook brand palette (from branding.pdf)
        slook: {
          black: '#000000',
          purple: '#7240ED',
          blue: '#0065F7',
          white: '#FFFFFF',
          // Tinted variants
          ink: '#0A0A0F',
          surface: '#111118',
          card: '#161622',
          border: '#23233A',
          muted: '#8A8AA3',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        ar: ['"IBM Plex Sans Arabic"', '"Tajawal"', '"DIN Next LT Arabic"', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'slook-gradient':
          'radial-gradient(60% 60% at 80% 30%, rgba(114,64,237,0.45) 0%, transparent 60%), radial-gradient(50% 50% at 10% 80%, rgba(0,101,247,0.35) 0%, transparent 60%), linear-gradient(180deg, #07070D 0%, #0A0A0F 100%)',
        'slook-grid':
          'linear-gradient(rgba(114,64,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(114,64,237,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glow: '0 0 40px 0 rgba(114, 64, 237, 0.35)',
        'glow-blue': '0 0 40px 0 rgba(0, 101, 247, 0.30)',
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
