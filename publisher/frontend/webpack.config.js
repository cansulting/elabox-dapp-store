const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const { SourceMapDevToolPlugin, DefinePlugin } = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { SourceMapDevToolPlugin } = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  // Where files should be sent once they are bundled
 output: {
   path: path.join(__dirname, '/dist'),
   filename: 'index.bundle.js'
 },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   port: 3000
 },

 resolve: {
   extensions: ['.tsx', '.ts', '.js'],
   fallback: {
    "https": false,
    "http": false,
    "fs": false,
    "original-fs": false
   }
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: 'babel-loader'
     },
     {
      test: /\.(tsx|ts)$/,
      exclude: /node_modules/,
      use: 'ts-loader'
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     },
     {
      test: /\.svg$/,
      use: {
          loader: 'svg-url-loader'
      }
     },
     {
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
      exclude: /node_modules/,
      use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
     }
   ]
 },
 plugins: [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: './index.html',
    favicon: './public/favicon.ico'
  }),
  new SourceMapDevToolPlugin({
    filename: "[file].map"
  }),
  new NodePolyfillPlugin()
 ],
 ignoreWarnings: [/Failed to parse source map/],
}