const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: `${__dirname}/node_modules`,
        include: `${__dirname}/src`
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images/'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts/'
          }
        }]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
  externals: {
    "pixi.js": "PIXI"
  }
};
