const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    entry: {
        popup: './src/popup/popup.js',
        popupCss: './src/popup/popup.scss',
        background: './src/background-scripts/background.js',
        fetchReimu: './src/background-scripts/fetchReimu.js',
        reimu: './src/content-scripts/reimu.js',
        baidu: './src/content-scripts/baidu.js',
        reimuCss: './src/content-scripts/reimu.scss'
    },
    output: {
        path: path.resolve(__dirname, './dist', 'bundle'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: './src/manifest.json', to: path.resolve(__dirname, './dist') },
            { from: './src/popup/popup.html', to: path.resolve(__dirname, './dist') },
            { from: './src/assets/logo.png', to: path.resolve(__dirname, './dist') },
            { from: './src/assets/message.png', to: path.resolve(__dirname, './dist') },
            { from: './src/assets/loading.gif', to: path.resolve(__dirname, './dist') },
            { from: './src/assets/lazy.png', to: path.resolve(__dirname, './dist') },
        ])
    ]
}

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        config.devtool = 'none';
    }

    return config;
};

