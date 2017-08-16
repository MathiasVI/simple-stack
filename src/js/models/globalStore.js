class GlobalStore {
	constructor() {
		this._type = 'CommonModel';
		this._eventTypes = new Array();
		this._callbackFunctions = new Array();
		this._dataObj = {
			created_at: new Date(),
			rafCallStack: [],
			scroll: {
				targetY: 0,
				currentY: 0
			},
			// SCROLL_LOCK : lock the scroll when expanding/collapsing playlists so we can update the Y positioning without janking
			scrollLock: false,
			viewport: {
				width: 0,
				height: 0,
				docHeight: 0,
				scrollHeight: 0
			},
			forceResize: 0,
			currentState: 'root',
		}
	}

	on ( eventType, callback ) {
		if ( this._eventTypes.findIndex(x => x == eventType) == -1 ) {
			this._eventTypes.push(eventType);
		}

		if ( this._callbackFunctions[eventType] ) {
			this._callbackFunctions[eventType].push(callback);
		} else {
			this._callbackFunctions[eventType] = new Array();
			this._callbackFunctions[eventType].push(callback);
		}
	}

	set (attr, val, silent) {
		if ( silent ) {
			this._dataObj[attr] = val;
		} else {
			if ( this._dataObj[attr] !== val ) {
				const previous = this._dataObj[attr];
				this._dataObj[attr] = val;
				this._eventTypes.forEach( ( eventType, index ) => {
					this._callbackFunctions[eventType].forEach( ( callback, index ) => {
						if ( eventType.indexOf("change:") > -1 ) {
							if ( eventType === ( "change:" + attr ) ) {
								callback.call(this, val, previous);
							}
						} else {
							callback.call(this, val, previous);
						}
					});
				});
			}
		}
	}

	get (attr) {
		return this._dataObj[attr];
	}
}

export default new GlobalStore();
