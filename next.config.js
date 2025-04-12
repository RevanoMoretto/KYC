const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  // enable react strict mode
  reactStrictMode: true,

  lessVarsFilePathAppendToEndOfContent: false,

  // Custom theme Ant Design for a component in variables.less file (if needed)
  lessVarsFilePath: './src/styles/variables.less',

  // Loader for file .less in a module with naming convention .module.less
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
