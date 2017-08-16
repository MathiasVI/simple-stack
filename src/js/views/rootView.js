
// import {READY, HIDE} from '../constants/classes';
import CONFIG from '../constants/config';
import GlobalStore from '../models/globalStore';
import ROOT_TEMPLATE from '../templates/root.html';

class RootView {

	constructor(obj) {
		this._data = obj;
	}

	render(_el) {
		this._data.copy = CONFIG.root;
		this.el = this.createRootFromTemplate(ROOT_TEMPLATE(this._data));

		_el.append(this.el);

		this.defineDOMElements();

		this.bindEvents();

		// if (window.ga) {
		// 	window.ga('send', 'pageview', '/root');
		// }

	}

	createRootFromTemplate( template ) {
		let d = document.createElement('div');
		d.innerHTML = template;
		return d.firstChild;
	}

	defineDOMElements() {
		this.rootWrapper = document.querySelector('#content-' + this._data.UUID);

		this.el_input = this.el.querySelector("input");
	}

	bindEvents() {
		GlobalStore.on('change:scroll', this.scrollUpdate.bind(this));
		GlobalStore.on('change:viewport', this.onResize.bind(this));

		// bind children:
		// this.el_input.addEventListener('keyup', this.sanitizeInput.bind(this));

	}


	sanitizeInput(e) {
		console.log('---- sanitize ----');
	}

	scrollUpdate() {

	}

	onResize() {

	}


	destroy() {
		console.log('destroy view...');
	}
}

module.exports = RootView;
