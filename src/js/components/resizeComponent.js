import $ from 'webpack-zepto';
import BaseComponent from './baseComponent';
import GlobalStore from '../models/globalStore';


class ResizeComponent extends BaseComponent {

	constructor(obj) {
		super(obj);

		GlobalStore.set('viewport', {
			width: this.getWidth(),
			height: this.getHeight(),
			docHeight: this.getDocHeight(),
			scrollHeight: this.getScrollHeight()
		}, true);

		GlobalStore.on('change:forceResize', this.update.bind(this) );
	}

	bindEvents() {
		this.bindWindowEvents();
	}

	getWidth() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}

	getDocHeight() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	}

	getHeight() {
		return Math.max(document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
	}

	getScrollHeight() {
		return document.documentElement.scrollHeight - window.innerHeight;
	}

	update() {
		GlobalStore.set('viewport', {
			width: this.getWidth(),
			height: this.getHeight(),
			docHeight: this.getDocHeight(),
			scrollHeight: this.getScrollHeight()
		}, false);
	}

	bindWindowEvents() {
			$(window).on('resize', (e) => {
				this.update();
			});
	}
}

export default ResizeComponent;
