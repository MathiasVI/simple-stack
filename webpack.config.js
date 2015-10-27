var path = require('path');
var webpack = require('webpack');
var appPoint = './src/js/dev.js';
var includePath = path.join(__dirname, 'src/js');
var templatePath = path.join(__dirname, 'build/public/templates');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var outputPath = __dirname + '/build/public/assets/js/';
var vendorPath = path.join(__dirname, '/vendors');
var devTool = 'source-map';

var PROD = JSON.parse(process.env.ENV_PROD || 0);

var plugins = [
    // Avoid publishing files when compilation failed
    new webpack.NoErrorsPlugin(),

    // include plugins for module use.
    new webpack.ProvidePlugin({
       /* i.e.
       $: "jquery",
       jQuery: "jquery"
       */
    })
];


if( PROD ){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({minimize: true}) 
    );

    appPoint = './src/js/deploy.js';

    outputPath = __dirname + '/deploy/public/assets/js/';
    devTool = 'hidden-source-map';
    console.log('---- WEBPACK ----\n running in production');
}else{
    console.log('---- WEBPACK ----\n running in development');
}

console.log(' running webpack in ' + __dirname );
console.log(' include path ' + includePath );
console.log(' outputPath path ' + outputPath );


var entryPoints = {
    'common' : [appPoint],
};

// ways of importing node_module libraries into a sep. 'chunk' library file.
plugins.push(
    // new webpack.optimize.CommonsChunkPlugin('vendor','libs.js', infinity)
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['lodash', 'zepto', 'TweenLite'],
    //   minChunks: Infinity
    // })
);

module.exports = {

    /*
    http://webpack.github.io/docs/configuration.html
    
    ENTRY 
    If you pass a string: The string is resolved to a module which is loaded upon startup.
    If you pass an array: All modules are loaded upon startup. The last one is exported.
    If you pass an object: Multiple entry bundles are created. The key is the chunk name. The value can be a string or an array.
    */
    
    // context: './src/js',
    // context: includePath,
    
    resolve : {
        alias : {
            
        }
    },

    entry: entryPoints,
    
    // if multiple outputs, use [name] and it will use the name of the entry point, and loop through them
    output: {
        path: outputPath,
        filename: '[name].js'
    },

    // any external files to ignore requires() of.
    externals: {
        
    },

    plugins: plugins,

    module: {
        loaders: [

           {
                test: /\.js$/,
                loader: 'babel-loader?optional=runtime',
                
                // run babel ONLY in our source code.
                include: [
                    includePath, nodeModulesPath
                ]
            },{
                test: /\.hbs/,
                loader: 'handlebars-loader',
                include: [
                    templatePath
                ],
                exclude: /node_modules/
            }

        ]

    },

    stats: {
        // Nice colored output
        colors: true
    },
    
    // Create Sourcemaps for the bundle
    devtool: devTool

};