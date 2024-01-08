const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // implement node event listeners here
      return config;
    },
    baseUrl: "http://localhost:3000",
    experimentalRunAllSpecs: true,
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
//npx nyc report --reporter=text-summary TO GET CODE COVERAGE
