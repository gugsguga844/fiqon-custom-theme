module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'brutalisme': ['brutalisme-regular', 'sans-serif'],
        'sans': ['Poppins', 'sans-serif'],
        'body': ['Poppins', 'sans-serif'],
        'heading': ['brutalisme-regular', 'sans-serif']
      },
      colors: {
        "primary": "#0e3f2f",
        "secondary": "#d1fc92",
        "text-100": "#7B7885",
        "text-200": "#5D596C",
        "text-300": "#4A4658",
        "text-green": "#0e3f2f",
        "text-600": "#0F261E",
        "bg-light-green": "#EFF3F1",
        "bg-green-600": "#0E3F2F",
        "br-gray-100": "#F6F6F7",
        "stroke": "#DCE5F0",
        "stroke-green-200": "#E3EAE5",
      },
    },
  },
  plugins: [],
};
