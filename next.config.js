const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  // enable react strict mode feature
  reactStrictMode: true,

  // Custom theme Ant Design in variables.less file (if needed)
  lessVarsFilePath: './styles/variables.less',

  // Loader for file .less with naming convention .module.less
  cssLoaderOptions: {
    modules: {
      auto: (resourcePath) => resourcePath.endsWith('.module.less'),
    },
  },

  // Ignoring eslint
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config) {
    return config;
  },
});
