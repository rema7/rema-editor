/* global __dirname */
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const repoRoot = __dirname
const appRoot = path.join(repoRoot, 'src')
const distRoot = path.join(repoRoot, 'dist')

export default () => {
    let plugins = [
        new CleanWebpackPlugin([distRoot]),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
    ]

    return {
        entry: {
            bundle: ['babel-polyfill', path.join(appRoot, 'index.js')],
        },

        output: {
            path: distRoot,
            filename: 'bundle.js',
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
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },

        devServer: {
            contentBase: [
                distRoot,
            ],
            host: '0.0.0.0',
            port: '9010',
            noInfo: true,
            disableHostCheck: true,
            historyApiFallback: true,
        },
        plugins,
    }
}