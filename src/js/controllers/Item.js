
import itemTemplate from '../../../build/public/templates/item.hbs';
import {Events, Config, Classes} from '../models';
import {isTouch, aspectRatio, getTopLeftOfElement} from '../helpers';


var Item = function(obj) {
	
	// vars
	var el;
		maxPercentH = 1.0,
		elHeaderHeight = elheader.clientHeight,
		elContentBoxTop = 0,
		ctaArrowMaxH = 68,
		ctaArrowMinH = 15,
		videoIsPlaying = null;

	var animateIncb = function(){};

	// private
	function scroll(e) {

		
	}

	function resize() {
		
		// access the config stored values of w/h : Config.w.w & Config.w.h

	}

	function assignElements() {
		
	}

	function init(obj) {
		// assign or render the element:
		if( obj.el ) {
			
			// assign
			el = obj.el;

		}else if(obj.d ){
			// render
			var elTemplate = itemTemplate(obj.d);
			// put into place:
			var wrapper = document.createElement('div');
			wrapper.innerHTML = elTemplate;
			el = wrapper.firstChild;
		}
	}

	// remove this instance from memory:
	function remove() {
		window.App.removeFromCallStack(scroll, 'scroll' );
		window.App.removeFromCallStack(resize, 'resize' );

		
		el.remove();
	}

	function bindEvents(){
		window.App.addToCallStack(scroll, 'scroll' );
		window.App.addToCallStack(resize, 'resize' );
		
		
	}


	// ---- initialize ---
	init(obj);
	bindEvents();
	resize();

	// public
	return {
		getEl : function() {
			return el
		},

		update : function() {

		},

		destory : function() {
			remove();
		},
		
		animateIn: function(parent,direction,cb){
			_animateIn(parent,direction,cb)
		}
	}
}

module.exports = Item;