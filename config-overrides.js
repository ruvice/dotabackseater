// config-overrides.js
const path = require('path');

module.exports = {
  webpack: (config) => {
    // Define multiple entry points
    config.entry = {
      main: path.resolve(__dirname, 'src/index.tsx'), // Default entry point
      live_config: path.resolve(__dirname, 'src/live_config.tsx'), // New entry point for live_config
    };

    return config;
  },
};
