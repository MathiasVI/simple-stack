// needs more work.
//  but fitter is what is being fitted to 'fitTo' 
// both are objects with just .w and .h values

// fit inside:
function fitTo(fitter, fitTo) {
	
	var fW = fitter.w,
		fH = fitter.h,
		w = fW,
		h = fH,
		x,y;
	
	if( w > fitTo.w || h > fitTo.h ||
		(w < fitTo.w && h < fitTo.h)
		){

		// trace(' exceeds avail. resize/scale image');

		var ratio = fH / fW,
			w = fitTo.w,
			h = ratio * w;

		if( h > fitTo.h ){
			// trace(' height too large');

			h = fitTo.h;
			ratio = fW/fH;
			w = ratio * h;
		}
		// trace( w + ' -  ' + h + ' ratio ' + ratio )
	}

	// calculate this one.
	x = (fitTo.w- w)/2;
	y = (fitTo.h - h)/2;
	return {x:x, y:y, w:w, h:h };
}

// fill space:
function fillTo(filler, fillIn) {
	var fW = filler.w,
		fH = filler.h,
		w = fW,
		h = fH,
		x,y;
	
	if( w < fillIn.w || h < fillIn.h ||
		(w > fillIn.w && h > fillIn.h)
		){

		// trace(' is smaller avail. resize/scale image');

		var ratio = fH / fW,
			w = fillIn.w,
			h = ratio * w;

		if( h < fillIn.h ){
			// trace(' height too small');

			h = fillIn.h;
			ratio = fW/fH;
			w = ratio * h;
		}
		// trace( w + ' -  ' + h + ' ratio ' + ratio )
	}

	// calculate this one.
	x = (fillIn.w- w)/2;
	y = (fillIn.h - h)/2;

	return {x:x, y:y, w:w, h:h };
}


var aspectRatio = {
	fitTo : fitTo,
	fillTo : fillTo
};

module.exports = aspectRatio;
