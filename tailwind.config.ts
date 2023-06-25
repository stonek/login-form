import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    textColor: {
      primary: "#327dda",
      secondary: "#327dda",
      white: "#FFF",
      black: "#327dda",
    },
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#327dda",
        blue: "#327dda",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
        "gray-dark": "#273444",
        gray: "#485C6D",
        "gray-light": "#d3dce6",
        card: "#F7F9FA",
        title: "#485C6D",
      },
      fontFamily: {
        sans: ["Geomanist", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          "128": "32rem",
          "144": "36rem",
        },
        borderRadius: {
          "4xl": "2rem",
        },
      },
    },
  },
};
