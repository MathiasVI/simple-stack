//http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser

// return the browser name.
function isTouch(){
	return 'ontouchstart' in document.documentElement;
}

module.exports = isTouch;