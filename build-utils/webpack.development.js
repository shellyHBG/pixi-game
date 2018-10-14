

module.exports = () => ({
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
  },
});
