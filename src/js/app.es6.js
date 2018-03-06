import TweenMax from 'gsap';

import {HIDE} from './constants/classes';
import GlobalStore from './models/globalStore';
import RootComponent from './components/rootComponent';
import ResizeComponent from './components/resizeComponent';

class App {

	constructor() {

		console.log('--- APP ---'); // @preserve eslint-disable-line no-console
		console.log('\n\n\n'); // @preserve eslint-disable-line no-console

		new ResizeComponent({});

		new RootComponent({
			callback: this.start.bind(this),
		});

		this.bindGlobalEvents()
	}

	bindGlobalEvents() {
		
	}

	start() {
		setTimeout(() => {
			var cw = document.querySelectorAll(".content-wrapper");
			for (var c = 0; c < cw.length; c++) {
				cw[c].classList.remove(HIDE);
			}
			GlobalStore.set('forceResize', GlobalStore.get('forceResize') + 1 );

		}, 150 );

		TweenMax.ticker.addEventListener("tick", (e) => this.raf());
	}

	// request animation frame managed by Tweenmax ticker.
	raf() {
		// update run through the RAF call stack:
		for( var c = 0; c < GlobalStore.get('rafCallStack').length; c++) {
			GlobalStore.get('rafCallStack')[c]();
		}
	}
}


// initialize the APP do not make a global reference to it.
new App();
