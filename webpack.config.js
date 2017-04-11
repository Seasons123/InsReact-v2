var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var json = require('../package.json');
module.exports = {

    entry: {
        bundle: 'app',
        vendor: Object.keys(json.dependencies),
        jquery: ['jquery']
    },

    devtool: 'source-map',

    entry: [
        path.resolve(__dirname, './entrys/insurance/index.js')

    ],


    output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        devServer: {
            contentBase: "./build",
            stats:{colors: true},
            historyApiFallback: true,
            inline: true,
            port:3000,
            hot:true,

            proxy:{
                '/insurancems/*':{
                    target: 'http://localhost:8080/',
                    secure: false,
                    changeOrigin: true
                }
            }
        },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.optimize.CommonsChunkPlugin({
            // 与 entry 中的 jquery 对应
            name: 'jquery',
            // 输出的公共资源名称
            filename: 'common.bundle.js',
            // 对所有entry实行这个规则
            minChunks: Infinity
        }),
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
                //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false,  // remove all comments
            },
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ],
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ],
        loaders: [

            {
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'jsx-loader?harmony'
            },
            { test: /\.css$/, loader: "style!css" },
            {test:/\.json$/,loader:"json"},
            {
                test: /\.jsx?$/,
                loader:'babel',
                exclude:'/node_modules/',
                query: {
                    presets: ['react','es2015']
                }
            },
            {
                test: /\.js$/,
                // Change the key to 'loaders' for an Array of loaders
                loaders: 'babel',
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
            },
            {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.gif$/, loader: "url-loader?mimetype=image/gif"},
            {test: /\.jpg$/, loader: "url-loader?mimetype=image/jpeg"},
            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude:/node_modules/,loader: 'babel-loader' },
        ]
    }
};