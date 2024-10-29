const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
    return {
        mode: env.mode || 'development',
        entry: path.resolve(__dirname, './src/index.js'),
        output: {
            path: path.resolve(__dirname, './build'),
            filename: '[name].js',
            assetModuleFilename: 'images/[hash][ext][query]',
            clean: true,
            publicPath: '/' // resolve iframe err
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src/index.html') }),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name][hash:5][ext]'
                    }
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                    options: {
                        sources: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src'
                                }
                            ]
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        // devtool: 'inline-source-map',
        devServer: {
            port: 5050,
            open: true
        }
    }
}
