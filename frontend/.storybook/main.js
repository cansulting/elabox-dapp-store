module.exports = {
    "stories": [
      "../src/**/*.stories.mdx",
      "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    staticDir: '../assets',
    "addons": [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/addon-interactions",
      "@storybook/preset-create-react-app",
    ],
    "framework": "@storybook/react",
    "core": {
      "builder": "@storybook/builder-webpack5"
    }
  }