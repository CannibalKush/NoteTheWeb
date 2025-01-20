const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/firefox-draw.js',
    output: {
        filename: 'firefox-draw.bundle.js',
        path: path.resolve(__dirname, '.'),
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.IS_PREACT': JSON.stringify("true")
        })
    ]
};