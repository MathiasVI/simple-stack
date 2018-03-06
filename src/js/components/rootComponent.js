import GlobalStore from '../models/globalStore';
import BaseComponent from './baseComponent';

import RootView from '../views/rootView';

class RootComponent extends BaseComponent {

	constructor(obj) {
		super(obj);
		this.el = document.querySelector('#root');
		
		this.elParentWrapper = this.el.parentNode;

		this.currentState = 'root';
		GlobalStore.set('currentState', this.currentState);
		
		this.constructRoot();
		this.renderChildren();

		if (obj.callback) {
			obj.callback();
		}
	}

	constructRoot() {
		this.children.set('root',
			new RootView({
				UUID: 'root'
			})
		);
	}

	renderChildren() {
		for (let [index, child] of this.children) {
			console.log(index, child);
			child.render();
		}

		GlobalStore.set('forceResize', GlobalStore.get('forceResize') + 1 );
		
		window.scrollTo(0,0);
	}

	//CALLED FROM SUPERCLASS
	bindEvents() {
		GlobalStore.on('change:viewport', this.viewportUpdate.bind(this));

	}

	viewportUpdate(e) {
		
	}
}


export default RootComponent;
