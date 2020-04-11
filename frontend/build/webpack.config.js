const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production' ? true : false;

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var config = {
    mode: "development",
    watch: false,
    stats: "minimal",
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    entry: {
        app: [
            path.resolve('./src/main.js'),
            path.resolve('./src/scss/styles.scss')
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve('../app/client/dist'),
        pathinfo: false,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                include: path.resolve('src'),
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                            '@babel/preset-env',
                            ],
                            plugins: [],
                        },
                    },
                    'eslint-loader',
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    'postcss-loader',
                    {
                      loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    esModule: false
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new LiveReloadPlugin(),
        new StyleLintPlugin({
            'files': 'app/client/scss/**/*.scss',
            'lintDirtyModulesOnly': true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new webpack.ProvidePlugin({
            mapboxgl: 'mapbox-gl',
        })
    ],
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
    }

    if (argv.mode === 'production') {
        // Compress js and css using gzip
        config.plugins.push(
            new CompressionPlugin()
        );
    }

    return config;
};
