const {
  override,
} = require('customize-cra');
const path = require('path');

// override
module.exports = {
  webpack: override(
    (defaultConfig) => {
      defaultConfig.entry.splice(defaultConfig.entry.length - 1, 1, path.resolve(__dirname, 'index.js'));
      defaultConfig.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/react-native-/,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      });
      defaultConfig.module.rules.push({
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      });
      return defaultConfig;
    },
  ),
};
