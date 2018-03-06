
// import {READY, HIDE} from '../constants/classes';
import CONFIG from '../constants/config';
import GlobalStore from '../models/globalStore';

class RootView {

	constructor(obj) {
		this._data = obj;

		this.imgList = [
			"5267379275_1a84a09e3d_b.jpg",
			"5267991896_8137250f0c_b.jpg",
			"5899076139_363c094e92_b.jpg",
			"5899079855_6699907c42_b.jpg",
			"5899080979_5742d2c233_b.jpg",
			"P4220231.jpg",
			"PB060853.jpg",
		];

		this.imageIndex = 0;

	}

	render() {
		this._data.copy = CONFIG.root;

		this.el = document.querySelector('#root-view');
		
		this.bindEvents();

		this.loadNewImg();

	}

	loadNewImg() {
		this.imageIndex = Math.floor(Math.random() * this.imgList.length);
	}

	bindEvents() {
		GlobalStore.on('change:scroll', this.scrollUpdate.bind(this));
		GlobalStore.on('change:viewport', this.onResize.bind(this));

		// bind children:
		// this.el_input.addEventListener('keyup', this.sanitizeInput.bind(this));

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
