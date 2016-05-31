var path = require('path');
var webpack = require('webpack');
var appPoint = './src/js/app.js';
var includePath = path.join(__dirname, 'src/js');
var templatePath = path.join(__dirname, 'build/public/templates');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var outputPath = __dirname + '/build/public/assets/js/';
var vendorPath = path.join(__dirname, '/vendors');
var devTool = 'source-map';

var PROD = JSON.parse(process.env.ENV_PROD || 0);

// variables shared
var env = {
    prod : PROD
};

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

    outputPath = __dirname + '/deploy/public/assets/js/';
    devTool = 'hidden-source-map';
    console.log('---- WEBPACK ----\n running in production');
}else{
    console.log('---- WEBPACK ----\n running in development');


}

console.log(' running webpack in ' + __dirname );
console.log(' include path ' + includePath );
console.log(' outputPath path ' + outputPath );

var entryPoints = appPoint;

plugins.push( new webpack.DefinePlugin({
    ENV : JSON.stringify(env)
}));


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
                loader: 'babel',
                query: {
                    presets: ['es2015']
                },
                // run babel where:
                include: [
                    includePath, 
                    nodeModulesPath
                ]
            }
            
            /*{
                test: /\.hbs/,
                loader: 'handlebars-loader',
                include: [
                    templatePath
                ],
                exclude: /node_modules/
            }*/
            
            /*{
                test: /\.glsl$/,
                loader: 'shader'
            }*/

            // inline base64 URLs for <=80k images, direct URLs for the rest
            /*{
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=819200'
            }*/ 

        ]

    },

    stats: {
        // Nice colored output
        colors: true
    },
    
    // Create Sourcemaps for the bundle
    devtool: devTool

};