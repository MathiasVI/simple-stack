// load data, setup up the routing, and bind events.

// I've tried a lot of things but this works.

// insert the plugins into Tweenlite.
// import CSSPlugin from 'gsap/src/uncompressed/plugins/CSSPlugin';
// import ScrollToPlugin from 'gsap/src/uncompressed/plugins/ScrollToPlugin';

import {isTouch} from './helpers';
import {Classes, Config, ContentData, Events} from './models';

var App = function(){	
	
	var forceResizeEvery = 60 * 2; // 60 fps * 5 seconds
	var resizeCountFrame = 0;
	
	var windowResizeUpdate = true;
	var scrollUpdate = true;
	// var forceScrollEvery = 60 * 3;
	// var scrollCountFrame = 0;
	var touchCoords = {
		startX : 0,
		startY : 0,
		allowedTime : 750,
		restraint : 100,
		threshold : 150
	};

	var callStack = {
		requestAnimateFrame : [],
		resize : [],
		scroll : [],
		mousemove : []
	};

	function browserShimCheck() {
		// add what you need to add for browser support:
		if( isTouch() ){
			// remove fixed positioning from headers/splash pages.
			document.body.classList.add('is-touch');
		}

	}

	function showPage() {
		// everything is loaded we are good to go:
		document.body.classList.add(Classes.loaded);
	}

	function updateFrames() {
		for( var f = 0; f < callStack.requestAnimateFrame.length; f++){
			callStack.requestAnimateFrame[f]();
		}

		// if( scrollUpdate == true ){
		scrollDispatcher();
		// }

		if( windowResizeUpdate ){
			windowResizeDispatcher();
		}

		mouseMoveDispatcher();
		window.requestAnimationFrame(updateFrames);
	}

	// function scroll(e) {
	// 	scrollUpdate = true;
	// }

	function scrollDispatcher() {
		// do not update if the values are the same.
		var currentY = window.scrollY || document.documentElement.scrollTop,
			currentX = window.scrollX || document.documentElement.scrollLeft,
			changed = true;


		// scrollCountFrame++

		if( Config.scroll.y == currentY && 
			Config.scroll.x == currentX 
		){	
			/*
			if( scrollCountFrame < forceScrollEvery &&
				// we need to do updates a few frames AFTER change stopped.
				scrollCountFrame > 5 ){
				return;
			}
			*/
			changed = false;
			
			// this just doesn't work all the time.
			// return;
		}


		for( var s = 0; s < callStack['scroll'].length; s++){
			callStack['scroll'][s]({changed:changed});
		}

		Config.scroll.py = Config.scroll.y;
		Config.scroll.px = Config.scroll.x;

		Config.scroll.y = currentY;
		Config.scroll.x = currentX;
		
		// if( scrollCountFrame > 5 ){
		// 	scrollCountFrame = 0;
		// }

		// scrollUpdate = false;
	};

	function windowResize(e) {
		windowResizeUpdate = true;
	}

	function windowResizeDispatcher() {
		var ww = window.innerWidth || window.outerWidth,
			wh = window.innerHeight || window.outerHeight;
		
		// resizeCountFrame++;

		if( Config.w.w == ww && 
			Config.w.h == wh 
		){
			// no screen size change.. but should we force the resize every X frames.
			// if( resizeCountFrame < forceResizeEvery ){
			// 	return;
			// }
			return;
		}

		// trace( 'resize ' + resizeCountFrame + ' < ' + forceResizeEvery );
		
		for( var w = 0; w < callStack['resize'].length; w++){
			callStack['resize'][w]();
		}

		Config.w.w = ww;
		Config.w.h = wh;

		// resizeCountFrame = 0;
		windowResizeUpdate = false;
	};

	function mouseMoveDispatcher() {
		if( Config.mouse.x != Config.mouse.px ||
			Config.mouse.y != Config.mouse.py ){
			
			// update:
			for( var m = 0; m < callStack['mousemove'].length; m++){
				callStack['mousemove'][m]();
			}

			// update done, set previous to current.
			// to stop updates on animation request frame.			
			Config.mouse.px = Config.mouse.x;
			Config.mouse.py = Config.mouse.y;
		}
	}

	function onMouseMove(e) {
		var x = e.clientX;
		var y = e.clientY;

		if( x != Config.mouse.x ||
			y != Config.mouse.y ){
			// update:
			Config.mouse.px = Config.mouse.x;
			Config.mouse.py = Config.mouse.y;

			Config.mouse.x = x;
			Config.mouse.y = y;

		}
	}

	function keypress(e) {
		// trace( e.keyCode );
		var leftarrow = 37;
		var rightarrow = 39;
		if( e.keyCode == leftarrow ){
			previousPage(e);
		}else if( e.keyCode == rightarrow ){
			nextPage(e);
		}
	}

	function touchStart(e) {
		var touchobj = e.changedTouches[0]
		touchCoords.startX = touchobj.pageX;
		touchCoords.startY = touchobj.pageY;
		touchCoords.startTime = new Date().getTime();
		document.addEventListener(Events.touch.move, touchMove );
	}

	function touchEnd(e) {
		document.removeEventListener(Events.touch.move, touchMove );

		var swipedir = 'none';

		var touchobj = e.changedTouches[0];
        var distX = touchobj.pageX - touchCoords.startX; // get horizontal dist traveled by finger while in contact with surface
        var distY = touchobj.pageY - touchCoords.startY; // get vertical dist traveled by finger while in contact with surface
        var elapsedTime = new Date().getTime() - touchCoords.startTime; // get time elapsed
        
        if (elapsedTime <= touchCoords.allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= touchCoords.threshold && Math.abs(distY) <= touchCoords.restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= touchCoords.threshold && Math.abs(distX) <= touchCoords.restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        
        trace( swipedir );
        // handleswipe(swipedir)
        if( swipedir == 'right' ){
        	// ADD swipe right function
        }else if( swipedir == 'left' ){
        	// ADD swipe left function
        }

	}

	function touchMove(e) {
		trace(' touch moving!!!');

	}

	function bindEvents() {
		// bind to resize and scroll. Add a throttle before dispatching to the call stack.
		window.addEventListener(Events.window.resize, windowResize);
		// window.addEventListener(Events.window.scroll, scroll);
		
		// a manual event can be dispatched this way (ignores the throttle)
		document.addEventListener(Events.dom.resize, windowResizeDispatcher);
		document.addEventListener(Events.dom.scroll, scrollDispatcher);

		document.addEventListener(Events.app.nextPage, nextPage);
		document.addEventListener(Events.app.previousPage, previousPage);

		document.addEventListener(Events.dom.mousemove, onMouseMove, false);

		document.addEventListener(Events.window.keydown, keypress );

		if( isTouch() ){
			document.addEventListener(Events.touch.start, touchStart );
			document.addEventListener(Events.touch.end, touchEnd );
		}
	}

	browserShimCheck();
	bindEvents();
	// load data/json file.
	ContentData.init(loaded);
	updateFrames();

	return { 

		animatingPage : false,

		addToCallStack : function(cb, type){
			callStack[type].push(cb);
		},
		
		removeFromCallStack : function(cb, type){
			// TODO test this properly
			for( var f = 0; f < callStack[type].length; f++){
				var fnc = callStack[type][f];
				if( cb == fnc ){
					// trace(' removing fnc from call stack');
					callStack[type].splice(f, -1);
					break
				}
			}
		}
	}			
}

module.exports = App


