// craco.config.js
/** @type {import('@craco/craco').CracoConfig} */
const removeConsole = ['transform-remove-console', { exclude: ['error', 'warn'] }];

module.exports = {
  // keep your Babel plugin
  babel: {
    plugins: process.env.NODE_ENV === 'production' ? [removeConsole] : []
  },

  // force @svgr/webpack v6 + svgo v2 (removes svgo@1 → nth-check chain)
  webpack: {
    configure: (webpackConfig) => {
      const oneOf = webpackConfig.module.rules.find((r) => Array.isArray(r.oneOf));
      if (!oneOf) return webpackConfig;

      const svgRule = oneOf.oneOf.find((r) => r.test && r.test.toString().includes('svg'));
      if (svgRule && svgRule.use) {
        svgRule.use = svgRule.use.map((u) => {
          if (u.loader && u.loader.includes('@svgr/webpack')) {
            return {
              loader: require.resolve('@svgr/webpack'),
              options: {
                svgo: true,
                svgoConfig: { plugins: ['preset-default'] }
              }
            };
          }
          return u;
        });
      }
      return webpackConfig;
    }
  },

  // Adapt CRA's devServer v4 options to webpack-dev-server v5
  devServer: (devServerConfig) => {
    // 1) Map old middleware hooks to v5
    const before = devServerConfig.onBeforeSetupMiddleware;
    const after = devServerConfig.onAfterSetupMiddleware;
    devServerConfig.setupMiddlewares = (middlewares, devServer) => {
      if (typeof before === 'function') before(devServer);
      if (typeof after === 'function') after(devServer);
      return middlewares;
    };
    delete devServerConfig.onBeforeSetupMiddleware;
    delete devServerConfig.onAfterSetupMiddleware;

    // 2) Map `https` → `server` for v5
    // CRA may set `HTTPS=true` (boolean) or an object with certs.
    if (typeof devServerConfig.https !== 'undefined') {
      const val = devServerConfig.https;
      if (val === true) {
        devServerConfig.server = 'https';
      } else if (val && typeof val === 'object') {
        devServerConfig.server = { type: 'https', options: val };
      } else {
        devServerConfig.server = 'http';
      }
      delete devServerConfig.https;
    }

    return devServerConfig;
  }
};
