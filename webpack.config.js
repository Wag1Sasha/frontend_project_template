const {
    resolve,
    join
} = require('path')
const HtmlWP = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const entryHTML = 'index.html'
const entryScript = 'index.jsx'
const src = resolve(__dirname, "src")
const output = resolve(__dirname, 'public')
const DevServerPort = 3333

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (!isDev) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }
    return config
}
const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders;
}
const filenameGen = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const cssLoaders = additional => {
    const loaders = [{
            loader: MiniCSSExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        'css-loader'
    ]
    if (additional) loaders.push(additional)
    return loaders
}
const plugins = () => {
    const base = [
        new HtmlWP({
            template: join(src, entryHTML),
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: filenameGen('css')
        })
    ]
    if (!isDev) base.push(new BundleAnalyzerPlugin())
    return base
}

module.exports = {
    mode: 'development',
    entry: {
        main: join(src, entryScript)
    },
    output: {
        filename: filenameGen('js'),
        path: output
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            '@components': join(src, 'components'),
            '@': src
        }
    },
    devtool: isDev ? 'inline-source-map' : '',
    module: {
        rules: [{
                test: /\.ts[x]$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.[png|svg|jpeg|gif]$}/,
                exclude: /node_modules/,
                use: ['file-loader']
            },
            {
                test: /\.[ttf|woff|woff2|eot]$}/,
                exclude: /node_modules/,
                use: ['font-loader']
            },
            {
                test: /\.csv$}/,
                exclude: /node_modules/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$}/,
                exclude: /node_modules/,
                use: ['xml-loader']
            }
        ]
    },
    plugins: plugins(),
    devServer: {
        port: DevServerPort,
        hot: isDev
    },
    optimization: optimization()
}