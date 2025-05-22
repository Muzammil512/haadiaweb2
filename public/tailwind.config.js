module.exports = {
  content: ["./index.html", "./*.html"],
  safelist: [
    { pattern: /.*/ } // Include all classes temporarily
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        'great-vibes': ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
};