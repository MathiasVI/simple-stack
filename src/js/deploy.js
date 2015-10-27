import App from 'app';

// shortcut for logs.
window.trace = function(str) {
	// do nothing. we are in deployment mode.
}

window.app = new App();