// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './src/tests/specs/',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    baseURL: "https://reactblog-34a5a.lm.r.appspot.com/",
   extraHTTPHeaders: {
     Authorization:
       "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNTU5YzU5MDgzZDc3YWI2NDUxOThiNTIxZmM4ZmVmZmVlZmJkNjIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3RibG9nLTM0YTVhIiwiYXVkIjoicmVhY3RibG9nLTM0YTVhIiwiYXV0aF90aW1lIjoxNjc0MzkxMzY3LCJ1c2VyX2lkIjoieGl2UVhhSEtlblpXa2FoZnd5SkpVWHVXbzlHMiIsInN1YiI6InhpdlFYYUhLZW5aV2thaGZ3eUpKVVh1V285RzIiLCJpYXQiOjE2NzQzOTEzNjcsImV4cCI6MTY3NDM5NDk2NywiZW1haWwiOiJuaWtvMUBtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJuaWtvMUBtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.D9LA1WQCKzj20NR1fbj7L3s3qrsEyRnak-469YkcNEsipVniykoXNkLR89uli8CYZ9nU_zxA9WxcV7oaM0tGZTviL7J22VQysXu8BBgTBZiGcypdCCTId2HFsQQfc7XIbsigQGh1wVjb3KzKnFxzEv_OV9KiHDzOwjtDSWkfVE6VTX70QxLG_ZPXZtvwZWT61bKnDuHMPofb5FLjL9zH7A2HWZ83vB0QMjrUX6WGiS0DSoCVV2hcxboX5P04omtZZReNQVJF6k18W1AKMDnPXF14l5KmS7YeyUI9bAa3roTigzkJPDBij9BjMJ6uyGfpb3MXJ-y8v8YGzrJOpJ7vSQ"
   },
    
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    screenshot: 'only-on-failure',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],

      },

    },

    /* Test against mobile viewports. */
    
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
