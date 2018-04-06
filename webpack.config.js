const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cleanWebPackPlugin = require("clean-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');
 const browserConfig= {
  entry:"./src/browser/index.js",
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"bundle.js"
  },
  mode:"production",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
    
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "./styles/[name].css",
      chunkFilename: "[id].css"
    }),
   new cleanWebPackPlugin( [
        'dist'
      ]),
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery'
    })
  ]
};

module.exports=browserConfig;