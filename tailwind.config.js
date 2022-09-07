/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        bgColor: "#fafafa",
        instadarkGray: "rgb(142, 142, 142)",
        accent: "#0095f6",
        facebookBlue: "#385285",
        borderColor: "rgb(219, 219, 219)",
        notificationGreen: "#2ecc71",
      },
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        85: "23rem",
      },
      height: {
        "1px": "1px",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        0.5: "0.5px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
        8: "8px",
        9: "9px",
      },
      maxWidth: {
        instaWidth: "930px",
      },
      gridAutoRows: {
        "290px": "290px",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
