/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Mango Milkshake - dominant warm foundation
        cream: {
          DEFAULT: "#FBF3E6",
          soft: "#F5E9D6",
          deep: "#EEDEC2",
        },
        // Teal - developer / technology / trust
        teal: {
          DEFAULT: "#146661",
          light: "#DCE9E6",
          soft: "#4C8B85",
          dark: "#0D423F",
        },
        // Mango Yellow - designer / creativity / energy
        mango: {
          DEFAULT: "#F2A93B",
          light: "#FBE3BD",
          dark: "#D68A1E",
        },
        // Ink - warm near-black for text, never pure black
        ink: {
          DEFAULT: "#241F17",
          soft: "#6E6455",
          faint: "#A79C89",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      boxShadow: {
        card: "0 20px 45px -20px rgba(36, 31, 23, 0.25)",
        soft: "0 8px 24px -12px rgba(36, 31, 23, 0.18)",
      },
      keyframes: {
        "bounce-dot": {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.5" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "bounce-dot": "bounce-dot 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
