const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

});
