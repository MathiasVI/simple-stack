/*
 * A component is a 'page' within your app. It holds many different views
 * and displays a specific state. Your account profile section would be one component
 * and a directory listing would be another.
 *
*/

class BaseComponent {

	constructor(obj) {
		if ( obj.el ) this.el = obj.el;
		if ( obj.id ) this.id = obj.id;
		this.children = new Map();
		this._data = obj;
		this.preconfigure();
		this.bindEvents();
	}

	constructChildren() {
	}

	preconfigure() {
	}

	bindEvents() {
	}

	destroy() {
		// destroy unbind all children.
		for( var c = 0; c < this.children.length; c++){
			this.children[c].destroy();
		}
	}

}


export default BaseComponent;
