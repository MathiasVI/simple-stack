// var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var includePath = 'src/js/';
// domain path on site to call assets/js
var publicPath = '/js/';
// outpath for webpack compilation on 'this' machine.
var outputPath = __dirname + '/public' + publicPath;
// source mapping in dev mode.
var devTool = 'source-map';
// hash on 'deploy' app on 'dev'.
var filename = 'app';

// Production flag is passed in the npm script.
var PROD = JSON.parse(process.env.ENV_PROD);
var CONFIG = require('./src/js/constants/config.js');
var DATA = require('./src/js/constants/data.js');

var plugins = [
    // Avoid publishing files when compilation failed
    // new webpack.NoErrorsPlugin(),
    // include plugins for module use. a shortcut so modules don't
    // need to import the same plugin over and over.
    /*new webpack.ProvidePlugin({
    }),*/
    new webpack.DefinePlugin({
        PRODUCTION: PROD,
        VERSION: JSON.stringify("0.0.1"),
        // TIMESTAMP: JSON.stringify(new Date().getTime())
        TIMESTAMP: JSON.stringify(new Date())
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: 'src/js/templates/index.html',
        CONFIG: CONFIG,
				DATA: DATA,
				PROD: PROD,
        minify: {
            removeComments: true,
            collapseWhitespace: (PROD) ? true : false,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
        inject: false,
    }),
];

// deploy this to a different output
if( PROD ){

    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            // minimize: true,
            drop_console: true,
            compress: {
                warnings: false,
                pure_funcs: [ 'console.log' ]
            },
            output: {
                comments: false,
            },
        })
    );

    filename = '[hash]';
    outputPath = __dirname + '/dist'+ publicPath;
    devTool = false; //'hidden-source-map';

    console.log('---- WEBPACK ----\n running in production');
}else{
    console.log('---- WEBPACK ----\n running in development');
}

console.log(' running webpack in ' + __dirname );
console.log(' include path ' + includePath );
console.log(' outputPath path ' + outputPath );


module.exports = {

    /*
    http://webpack.github.io/docs/configuration.html

    ENTRY
    If you pass a string: The string is resolved to a module which is loaded upon startup.
    If you pass an array: All modules are loaded upon startup. The last one is exported.
    If you pass an object: Multiple entry bundles are created. The key is the chunk name. The value can be a string or an array.
    */

    entry: ['babel-polyfill', './src/js/app.es6.js'],

    output: {
        path: outputPath,
        publicPath: publicPath,
        filename: filename+'.js'
    },

    resolve : {
        alias : {
            // 'babel-polyfill': 'babel-polyfill/dist/polyfill.js',
            'TweenLite': 'gsap/src/uncompressed/TweenLite',
            'TweenMax': 'gsap/src/uncompressed/TweenMax',
        }
    },


    module: {
        loaders: [
            {
              test: /\.json$/,
              loader: 'json'
            },
            {
              test: /\.html$/,
              loader: "underscore-template-loader",
              query: {
                engine: 'lodash',
              }
            },
            {
                test: /\.js$/,

                // loader: 'babel-loader',
                loader: 'babel',
                // include: includePath,
                exclude: /node_modules/,

                query: {

                }
            }
        ]

    },

    plugins: plugins,

    stats: {
        // Nice colored output
        colors: true
    },

    // Create Sourcemaps for the bundle
    devtool: devTool

};
