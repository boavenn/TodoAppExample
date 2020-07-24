const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const config = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        port: 9000
    },
});

module.exports = config;