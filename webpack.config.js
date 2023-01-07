const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    frontend: './food_trucks/src/index.js',
  },
  output: {
    path: path.resolve('./food_trucks/static/frontend/'),
    filename: '[name]-[hash].js',
    publicPath: 'static/frontend/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new BundleTracker({
      path: __dirname,
      filename: './webpack-stats.json',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
