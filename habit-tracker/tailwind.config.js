// tailwind.config.js

/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate'
import theme from 'tailwindcss-inline-theme'

export default {
  darkMode: 'class', // Управление темой через класс 'dark' или 'light'
  content: [
    './pages/**/*.{ts,vue}',
    './components/**/*.{ts,vue}',
    './layouts/**/*.{ts,vue}',
    './app.vue',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Добавьте пути к вашим файлам
  ],
  theme: {
    extend: {
      // Подключаем наши CSS переменные к Tailwind
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        '2xs': 'calc(var(--radius) - 8px)',
        xs: 'calc(var(--radius) - 6px)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 12px)',
      },
      boxShadow: {
        '2xs': 'var(--shadow-2xs)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
        widest: 'var(--tracking-widest)',
      },
    },
  },
  plugins: [
    animate, 
    theme, // Этот плагин автоматически подхватит все цвета из @theme
  ],
}