import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

/* This allows you to pass in a `ENV` environment variable via command line
to specify which environment you want to run the tests against, otherwise
it uses the .env file using "test" server*/
if (process.env.test_env) {
  config({
    path: `.env.${process.env.test_env}`,
    override: true,
  });
} else {
  config();
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30000, // Each test is given 30 seconds
  fullyParallel: false, // Parallel default
  forbidOnly: !!process.env.CI, // Fail build on CI if test.only was accidentally left
  retries: process.env.CI ? 2 : 0, // CI retries : local retries
  workers: process.env.CI ? 1 : undefined, // CI workers : local workers
  reporter: [["list"], ["html",{ open: 'never' }]], // Default Reporter See https://playwright.dev/docs/test-reporters
  
  expect: {
    timeout: 15000 // Maximum time (15 seconds) expect() should wait
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 0, // Maximum time each action such as 'click()' can take. Default 0 (no limit)
    baseURL: process.env.URL, // Base URL for `await page.goto('/')`
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry', // Record a trace for each test, but remove it from successful test runs. See https://playwright.dev/docs/trace-viewer
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      // Run headless or not
      headless:false,
     },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
