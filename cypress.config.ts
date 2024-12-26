import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) {
  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.(ts|tsx)$/,
              exclude: [/node_modules/],
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-typescript"],
                },
              },
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );
  return config;
}

export default defineConfig({
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 30000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    testIsolation: false,
    baseUrl: "http://localhost:3000",
    specPattern: ["cypress/e2e/search.feature"],
    setupNodeEvents,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  retries: {
    openMode: 1,
    runMode: 1,
  },
});
