import { defineConfig } from 'cypress'
//For Cucumber Integration
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const nodePolyfills =
  require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config) // to allow json to be produced
      on(
        'file:preprocessor',
        createBundler({
          plugins: [nodePolyfills(), createEsbuildPlugin(config)],
        })
      )
      return config
    },
    video: false,
    screenshotOnRunFailure: true,
    specPattern: ['**/*.feature'],
    pageLoadTimeout: 120000,
    requestTimeout: 80000,
    trashAssetsBeforeRuns: true,
    chromeWebSecurity: false,
    baseUrl: 'https://demoqa.com',
    experimentalMemoryManagement: true,
    viewportWidth: 1600,
    defaultCommandTimeout: 300000,
    viewportHeight: 960,
    retries: {
      runMode: 1,
      openMode: 1,
    },
    experimentalWebKitSupport: true,
    env: {
      TAGS: 'not @Blocked',
    },
  },
})