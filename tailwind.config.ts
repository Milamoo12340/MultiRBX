import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        cyan: {
          DEFAULT: 'hsl(180 100% 50%)',
          dim: 'hsl(180 100% 50% / 0.1)',
          border: 'hsl(180 100% 50% / 0.3)',
        },
        neon: {
          green: 'hsl(150 100% 45%)',
          cyan: 'hsl(180 100% 50%)',
          amber: 'hsl(38 92% 60%)',
          red: 'hsl(0 84% 60%)',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'blink': 'terminal-blink 1s step-end infinite',
      },
      borderRadius: {
        lg: '10px',
        md: '8px',
        sm: '6px',
      },
    },
  },
  plugins: [],
}

export default config
