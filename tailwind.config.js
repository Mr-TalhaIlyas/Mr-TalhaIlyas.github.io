/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyber-Agritech Primary Palette
        'cyber': {
          900: '#0a0f1a',
          800: '#0d1424',
          700: '#111a2e',
          600: '#162038',
          500: '#1a2642',
        },
        // Holographic Accent Colors
        'holo': {
          green: '#00ff9f',
          cyan: '#00f0ff',
          purple: '#b14aed',
          pink: '#ff00ff',
          blue: '#4a9eff',
        },
        // Medical-Synthwave Accents
        'synth': {
          red: '#ff3366',
          orange: '#ff6b35',
          yellow: '#ffd700',
          lime: '#aaff00',
        },
        // Data Visualization
        'data': {
          success: '#00ff9f',
          warning: '#ffd700',
          error: '#ff3366',
          info: '#00f0ff',
        }
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 255, 159, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 159, 0.03) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #0a0f1a 0%, #162038 50%, #0d1424 100%)',
        'holo-gradient': 'linear-gradient(135deg, #00ff9f 0%, #00f0ff 50%, #b14aed 100%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
        'data-stream': 'data-stream 20s linear infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 255, 159, 0.5), 0 0 20px rgba(0, 255, 159, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 255, 159, 0.8), 0 0 40px rgba(0, 255, 159, 0.5)' 
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00ff9f' },
        },
        'data-stream': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
      boxShadow: {
        'holo': '0 0 20px rgba(0, 255, 159, 0.3), 0 0 40px rgba(0, 240, 255, 0.2)',
        'holo-lg': '0 0 30px rgba(0, 255, 159, 0.4), 0 0 60px rgba(0, 240, 255, 0.3)',
        'cyber': '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-green': '0 0 20px rgba(0, 255, 159, 0.5)',
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(177, 74, 237, 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
