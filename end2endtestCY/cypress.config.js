const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8088',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false,
  screenshotOnRunFailure: true,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output-[hash].xml',
    toConsole: true,
  },
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  browser: 'chrome'
});
