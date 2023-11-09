/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "player-height": "125px",
        "header-height": "70px",
      },
      fontFamily: {
        primary: ["Quicksand", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#307DB8",
        secondary: "#FACD66",
        "bg-color": "#37075d",
        "bg-color-2": "#270082",
        "bg-color-3": "#31297f",
        "alpha-bg": "hsla(0,0%,100%,0.1)",
        "dashboard-bg": "#ddd",
        strock: "#F1F1F3",
        light: "EFEEE0",
        dark: "#1D2123",
        alt: "#A4C7C6",
        "dark-alt": "#1A1E1F",
        "gray-blur": "#EFEEE0",
      },
      // backgroundImage: {
      //   "theme-1": "url(/artist.jpg)",
      // },
    },
    boxShadow: {
      "shadow-1":
        "rgba(122, 11, 192, 0.4) -5px 5px, rgba(122, 11, 192, 0.3) -10px 10px, rgba(122, 11, 192, 0.2) -15px 15px, rgba(122, 11, 192, 0.1) -20px 20px, rgba(122, 11, 192, 0.05) -25px 25px",
      "shadow-r": "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
      lightness: `#FACD66 0px 1px 10px`,
    },
    dropShadow: {
      darkness: "0px 0px 1px rgba(64, 64, 64, 0.6)",
      lightness: `0px 0px 16px #FACD66`,
    },
    backgroundImage: {
      "primary-gradient": `linear-gradient(93.71deg, #FACD66 13.27%, #307DB8 101.64%)`,
      "secondary-gradient": `linear-gradient(93.71deg, #FACD66 13.27%, #FACD66 101.64%)`,
      // "secondary-gradient": `linear-gradient(-225deg, rgb(82, 113, 196) 0%, rgb(177, 159, 255) 48%, rgb(236, 161, 254) 100%)`,
    },
    keyframes: {
      "text-animation": {
        // "0%": { "margin-top": "0" },
        // "10%": { "margin-top": "0" },
        // "20%": { "margin-top": "-5.62rem" },
        // "30%": { "margin-top": "-5.62rem" },
        // "40%": { "margin-top": "-11.24rem" },
        // "60%": { "margin-top": "-11.24rem" },
        // "70%": { "margin-top": "-5.62rem" },
        // "80%": { "margin-top": "-5.62rem" },
        // "90%": { "margin-top": "0" },
        // "100%": { "margin-top": "0" },
        "0%": { transform: "translateY(0)" },
        "10%": { transform: "translateY(0)" },
        "20%": { transform: "translateY(-200%)" },
        "30%": { transform: "translateY(-200%)" },
        "40%": { transform: "translateY(-400%)" },
        "60%": { transform: "translateY(-400%)" },
        "70%": { transform: "translateY(-200%)" },
        "80%": { transform: "translateY(-200%)" },
        "90%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(0)" },
      },
      spin: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
    animation: {
      "text-animation": "text-animation 8s infinite",
      spin: "spin 1s linear infinite",
    },
  },
  plugins: [],
};
