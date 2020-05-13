const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniPlugin = require('mini-program-webpack-loader').plugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const baseResolve = require('./webpack.config.resolve');
const baseLoaders = require('./webpack.config.loaders');

module.exports = {
  mode: 'development',
  target: 'node',
  devtool: false,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  },
  resolve: baseResolve,
  module: { rules: baseLoaders },
  entry: path.resolve(__dirname, '../src/app.json'),
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      })
    ],
    concatenateModules: false,
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/icons',
      to: 'icons'
    }]),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production')
    }),
    new MiniPlugin({
      extfile: true,
      analyze: false,
      resources: [
        path.join(__dirname, '../shared')
      ],
    })
  ]
};
