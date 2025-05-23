/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: false,
            code: false,
            "code::before": false,
            "code::after": false,
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // 其他插件
  ],
};
