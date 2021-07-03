const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

let mode = 'development'

if(process.env.NODE_ENV === 'production') {
    mode = 'production'
}

module.exports = {
    mode,
    entry: [
        './src/js/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[fullhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]',
                            },
                        },
                ]
            },
            {
                test: /\.s?css$/i,
                use: [{
                    loader: MiniCSSExtractPlugin.loader,
                }, 
                'css-loader',
                'postcss-loader',
                'sass-loader'
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [new MiniCSSExtractPlugin({
        filename: 'css/[fullhash].css'
    }), new HTMLWebpackPlugin({
        template: './src/index.html',
        title: 'Webpack Template'
    })],
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
    }
}