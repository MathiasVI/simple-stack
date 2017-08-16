console.log(' - booting up node server - ');

var localconfig = require('./server.localconfig'),
	env = localconfig.env,
	config = {};


console.log(" - loop to find argument for env. -");
// Loop through arguments and see if environment is declared if so assign it.
process.argv.forEach(function (val, index, array) {
	var split = val.split('=');
	if( split[0] == 'env' && split.length > 1 ){
		env = split[1];
	}
});

// we have an environment so define the config object accordingly.
config = require('./server.config')[env];
console.log( ' ' + config.app.name );


// --------
// Instantiate the server
// --------
var port = config.port || 3000;
var express = require('express')

//TODO: maybe we should move this into the server folder?
// var routes = require('../src/js/models/routes');

var app = express()

	// app.use(serveStatic(config.staticPath))

	app.use(express.static(config.staticPath));

	// app.use(path, express.static(config.staticPath));
	app.listen(port)

console.log(' static server path : ' + config.staticPath );
console.log(' started on port: ' + port);
console.log(' environment: ' + env);
console.log('\n\n-------\n-------\n'+ 'localhost:' + port+'\n-------\n-------\n\n');
