var path = require('path');
var webpack = require('webpack');
var ETP = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserPlugin = require('open-browser-webpack-plugin');


var config = {
    entry: {
        main: path.resolve(__dirname, 'entry/entry.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module:{
      loaders:[
          {test:/\.css$/,loader:ETP.extract('css-loader')},
          {test:/\.less$/,loader:ETP.extract(['css-loader','less-loader'])},
          {test:/\.js$/,loader:'babel-loader'}
      ]
    },
    devServer: {
        inline: true,
        contentBase: './build'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new ETP('style.css'),
        new htmlWebpackPlugin({
            template:__dirname + '/entry/index.html'
        }),
        new openBrowserPlugin({
            url:'http://localhost:8080'
        })
    ]
};


module.exports = config;