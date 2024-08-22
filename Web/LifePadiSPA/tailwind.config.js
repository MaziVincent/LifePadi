/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
      primary: '#fff',
      secondary: '#9ec81d',
      accent: '#111827',
      background: '#609963',
      text: '#393737',
      grayTxt: '#3d3b3b',
      gray: '#9ca3af',
      inherit: 'inherit',
      red: '#ff0000',
      graybg: '#e5e7eb',
      redborder: '#ff8282',
      lightgreen: '#8eca8e',
      lightyellow: "#F7DC6F",
      lightcyan: "#00FFFF",
      lightemerald: "#00FF00",
      lightindigo: "#4B0082",
      lightorange: "#FFA07A",
      lightviolet: "#EE00FF",
      lightteal: "#00FF80", 
      darkBg:"#181818",
      darkMenu:"#212121",
      darkHover:"#3D3D3D",
      darkSecondaryText:"#AAAAAA",
      yellow:"#e8c115",
      blue:"#15c5e8",
      lightGray:"#f1f2f3"
    },
    extend: {},
  },
  plugins: [],
}

