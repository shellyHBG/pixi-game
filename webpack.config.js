/*
 * Description: Webpack Config
 * Author: Kayac
 */

//  =========== Dependencies ===========
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {HotModuleReplacementPlugin, ProgressPlugin} = require('webpack');
const merge = require('webpack-merge');
const modeConfig = (mode) => require(`./build-utils/webpack.${mode}`)(mode);

//  =========== Export ===========
module.exports = ({mode}) => merge(modeConfig(mode), {

  //  Environment Mode
  mode,

  //  Project Entry
  entry: {
    app: './src/core/init.js',
  },

  //  Bundles Output
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`,
  },

  //  Build Loaders
  module: {
    rules: [

      //  JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      //  CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      //  Images
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {outputPath: 'assets/images/'},
          },
        ],
      },

      //  Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {outputPath: 'assets/fonts/'},
          },
        ],
      },
    ],
  },

  //  Build Plugins
  plugins: [

    //  Clean Build Dist
    new CleanWebpackPlugin(['dist']),

    //  Auto Build HTML
    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    //  Real-time Update
    new HotModuleReplacementPlugin(),

    //  Build-time States check
    new ProgressPlugin(),
  ],
});
