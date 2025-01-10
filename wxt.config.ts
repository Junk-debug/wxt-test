import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["storage", "activeTab", "scripting"],
    commands: {
      "open-app": {
        suggested_key: {
          default: "Ctrl+Shift+Y",
          mac: "Command+Shift+Y",
        },
        description: 'Run "foo" on the current page.',
      },
      "close-app": {
        suggested_key: {
          default: "Ctrl+Shift+U",
          mac: "Command+Shift+U",
        },
        description: 'Run "close" on the current page.',
      },
    },
    web_accessible_resources: [
      {
        resources: ["test.js"],
        matches: ["<all_urls>"],
      },
    ],
  },

  outDir: "output",
});
