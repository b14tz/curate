/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            // light mode color palette
            "t-primary": "#121318", // for: majority of text/icons, headers
            "t-secondary": "#7F839D", // for: sub headings, descriptions
            "t-tertiary": "#838FA1", // for: input field text
            "t-interactive": "#4942E4", // for: hyperlinks
            "t-error": "#FD6566", // for: error messages
            "b-primary": "#F7F8F9", // for: fullscreen backgrounds
            "b-secondary": "#FFFFFF", // for: modals, tooltips, popups, widgets
            "b-tertiary": "#F8FAFB", // for: input fields, hrs
            // dark mode color palette
            "dt-primary": "#FFFFFF", // for: majority of text/icons, headers
            "dt-secondary": "#6F6F78", // for: sub headings, descriptions
            "dt-tertiary": "#8D8D99", // for: input field text
            "dt-interactive": "#FFFFFF", // for: hyperlinks
            "dt-error": "#FD6566", // for: error messages
            "db-primary": "#131314", // for: backgrounds
            "db-secondary": "#27272C", // for: modals, tooltips, popups, widgets
            "db-tertiary": "#40404A", // for: input fields, hrs
            // error
            error: "#E24444",
            // other colors
            black: "#1E1E1E",
            gray: "#27272C",
            white: "#FFFFFF",
            green: "#13CE66",
            orange: "#F63F0A",
            salmon: "#FE346E",
            snow: "#FFF8FA",
        },
    },
    plugins: [],
    darkMode: "class",
};
