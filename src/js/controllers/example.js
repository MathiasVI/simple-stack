import template from '../../../build/public/templates/somename.hbs';
import {Events, Config, Classes} from '../models';
import {isTouch, aspectRatio, getTopLeftOfElement} from '../helpers';


var example = function() {
	// variables, accessible anywhere in private and public functions
	// do not need to use this.[var name]
	var el = document.querySelector();
		
	function init() {
		// assign or render the element:
		if( obj.el ) {
			
			// assign
			el = obj.el;

		}else if(obj.d ){
			// render
			var elTemplate = template(obj.d);
			// put into place:
			var wrapper = document.createElement('div');
			wrapper.innerHTML = elTemplate;
			el = wrapper.firstChild;
		}
	}

	// private functions only accessible by the contents of the function, public or private
	function bindEvents(){
		// window.App.removeFromCallStack(scroll, 'scroll' );
		// window.App.removeFromCallStack(resize, 'resize' );

	}

	function remove() {

		// window.App.removeFromCallStack(scroll, 'scroll' );
		// window.App.removeFromCallStack(resize, 'resize' );

		el.remove();
	}
	
	function scroll() {

	}

	function _update() {

	}

	function resize() {

	}

	// initialize
	init();

	// public functions accessible externally.
	return {
		getEl : function() {
			return el
		},

		update : function() {
			_update();
			// resize();
		},

		destory : function() {
			remove();
		},
		
		animateIn: function(parent,direction,cb){
			_animateIn(parent,direction,cb)
		}
	}
}

module.exports = example;

