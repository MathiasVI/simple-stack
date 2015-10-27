// All models become one sort of 'singleton' instance.
// if AppData does not exist create it.

if( !window.AppData ){
	window.AppData = {
		"Classes" 		: require("./models/Global.classes"),
		"Config"		: require("./models/Global.config"),
		"Events" 		: require("./models/Global.events"),
		"Routes"		: require("./models/Global.events"),
		"ContentData"	: require("./models/Global.contentData")
	}
};

module.exports = window.AppData;