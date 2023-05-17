module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", {runtime: "automatic"}],
    ],
    env: {
        testing: {
            presets: [
                [ "@babel/preset-env", { targets: { node: "current"}}],
            ],
        },
    }
};
