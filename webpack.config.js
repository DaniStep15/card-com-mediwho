const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) =>{
    return {
        mode: env.mode || "development",
        entry: path.resolve(__dirname, './src/index.jsx'),
        output: {
            path: path.resolve(__dirname, './build'),
            filename: '[name][contenthash].js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin(
                { template: path.resolve(__dirname, './public/index.html') }
            ),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                },
            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        devtool: 'inline-source-map',
        devServer: {
            port: 5050,
            open: true,
        }

    }
}