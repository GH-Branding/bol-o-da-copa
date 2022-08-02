const webpack = require('webpack');
const path = require('path');

const config = {
  entry: ['./js/index.js', './css/index.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].css',
                    }
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'css-loader?-url'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }
    ]
}
};

module.exports = config;