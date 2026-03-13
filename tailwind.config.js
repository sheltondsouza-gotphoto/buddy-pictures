/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '393px', // Base mobile breakpoint, from Figma design width
        'tablet': '768px', // Typical tablet breakpoint
      },
      colors: {
        neutralScale: {
          '0-white': 'var(--neutral-scale-0-white)',
          '200-light': 'var(--neutral-scale-200-light)',
          '300': 'var(--neutral-scale-300)',
          '400-medium': 'var(--neutral-scale-400-medium)',
          '700-secondary': 'var(--neutral-scale-700-secondary)',
          '800-lead-or-main': 'var(--neutral-scale-800-lead-or-main)',
        },
        communication: {
          success: 'var(--communication-success)',
          'success-700-text-or-icon': 'var(--communication-success-700-text-or-icon)',
          'success-200-bg': 'var(--communication-success-200-bg)',
        },
        background: {
          'light-blue': 'var(--background-light-blue)',
          'light-grey': 'var(--background-light-grey)',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '1.5'], // Body/Small, Body/Small Strong
        sm: ['14px', '1.4'], // Body/Medium, Body/Medium Strong
        base: ['16px', '1.4'], // Body/Large, Body/Large Strong, Heading/Extra Small
        xl: ['20px', '1.4'], // Heading/Small
      },
      fontWeight: {
        normal: '400',
        medium: '450',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.1px', // Example, adjust as needed
        normal: '0.1px',
        wide: '0.2px',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
      },
      boxShadow: {
        'elevation-shadow-sm': '0px 1px 4px rgba(43, 40, 81, 0.06), 0px 2px 6px rgba(43, 40, 81, 0.04)',
      },
    },
  },
  plugins: [],
};
