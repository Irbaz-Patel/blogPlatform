/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       sans: ["var(--font-inter)", "sans-serif"],
  //       heading: ["var(--font-poppins)", "sans-serif"],
  //     },
  //     colors: {
  //       background: "#ffffff",
  //       "background-dark": "#1A1A1A",
  //       foreground: "#111827",
  //       "foreground-dark": "#F3F4F6",
  //       muted: "#F5F5F5",
  //       "muted-dark": "#2A2A2A",
  //       primary: "#4F46E5",
  //     },
  //   },
  // },
  plugins: [],
};
