/*
 * Shortcut for css styling at the element level / inline styles.
 *
*/
function setStyle(el, cssObj) {
	// is el a list of elements?
	var elIsList = el instanceof Array;

	for( var key in cssObj) {
		var val = cssObj[key];
		
		if( typeof val == 'number' && key != 'zIndex' ){
			// add pixels to all number values.
			val += 'px';
		}

		if( elIsList ){
			// multiple assignment:
			for( var e = 0; e < el.length; e++){
				el[e].style[key] = val;
			}
		}else{
			el.style[key] = val;
		}
	}
}


module.exports = setStyle;