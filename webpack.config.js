const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, argv) =>{
    return {
        mode: env.mode || "development",
        entry: path.resolve(__dirname, './src/index.js'),
        output: {
            path: path.resolve(__dirname, './build'),
            filename: '[name][contenthash].js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin(
                { template: path.resolve(__dirname, './public/index.html') }
            ),
            new webpack.ProgressPlugin()
        ],
        module: {
            rules: []
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