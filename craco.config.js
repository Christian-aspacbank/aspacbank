// craco.config.js
/** @type {import('@craco/craco').CracoConfig} */
const removeConsole = ['transform-remove-console', { exclude: ['error', 'warn'] }];

module.exports = {
  babel: {
    // Only strip logs in production builds
    plugins: process.env.NODE_ENV === 'production' ? [removeConsole] : []
  }
};
