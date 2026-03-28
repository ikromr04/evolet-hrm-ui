// tailwind.config.js
export default {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1000ms linear infinite",
      },
    },
  },
}