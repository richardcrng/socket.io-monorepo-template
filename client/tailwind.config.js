/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        app: 'var(--app-padding)',
      },
      height: {
        viewport: 'var(--100vh)',
        app: 'var(--app-h)',
        nav: 'var(--nav-h)',
        appMinusNav: 'var(--app-minus-nav-h)',
        appMinusNavAndPadding: 'var(--app-minus-nav-and-padding-h)',
      },
      maxHeight: {
        viewport: 'var(--100vh)',
        app: 'var(--app-h)',
        nav: 'var(--nav-h)',
        appMinusNav: 'var(--app-minus-nav-h)',
        appMinusNavAndPadding: 'var(--app-minus-nav-and-padding-h)',
      },
      width: {
        app: 'var(--app-w)',
        appMinusPadding: 'var(--app-minus-nav-and-padding-w)',
      },
    },
  },
  plugins: [require("daisyui")],
};
