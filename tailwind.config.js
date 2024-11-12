/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "signup-bg": "url(../images/signup.png)",
        "signin-bg": "url(../images/signin-bg-img.jpg)",
        "signUp-bg": "url(../images/signup-bg.png)",
        "meet-ankara": "url(../images/meet-ankara-female.png)",
        "meet-bubu": "url(../images/meet-bubu.png)",
        "meet-formal": "url(../images/meet-formal-female.png)",
        "meet-ready": "url(../images/meet-ready-female.png)",
        "meet-senator": "url(../images/meet-senator-male.png)",
        "meet-street": "url(../images/meet-street-male.png)",
        "meet-suits": "url(../images/meet-suits-male.png)",
        "meet-trad-male": "url(../images/meet-trad-male.png)",
        "meet-trad-female": "url(../images/meet-trad-female.png)",
        "meet-two-piece": "url(../images/meet-twopiece-male.png)",
      },
    },
  },
  plugins: [],
};
