/* global __dirname */
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const repoRoot = __dirname
const appRoot = path.join(repoRoot, 'src')
const distRoot = path.join(repoRoot, 'dist')
const publicRoot = path.join(repoRoot, 'public')

export default () => {
    let plugins = [
        new CleanWebpackPlugin([distRoot]),
        new HtmlWebpackPlugin({
            title: 'RemaEditor',
            template: path.join(publicRoot, 'index.html'),
        }),
    ]

    return {
        mode: 'development',

        entry: {
            bundle: ['babel-polyfill', path.join(appRoot, 'index.js')],
        },

        output: {
            path: distRoot,
            filename: '[name]-[hash].js',
        },

        resolve: {
            modules: [
                appRoot,
                'node_modules',
            ],
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: [
                        appRoot,
                    ],
                    use: 'babel-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'eslint-loader',
                },
                {
                    test: /\.css$/,
                    use: [{
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                    }],
                },
            ],
        },

        devtool:  "cheap-eval-source-map",

        serve: {
            content: [distRoot],
            add: app => {
            },
        },
        plugins,
    }
}