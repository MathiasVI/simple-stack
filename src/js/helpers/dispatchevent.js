// help from:
 // http://stackoverflow.com/questions/5342917/custom-events-in-ie-without-using-libraries

// dispatch events at the document level.
//i.e. dispatchEvent(Events.view.ytplay, {vid: this.Data.bts.id, id: this.Data.id });

function dispatchEvent(eventName, detail) {
	try{
		var event = new CustomEvent(eventName, {detail: detail});
		document.dispatchEvent(event);
	}catch(err) {
		
		// trace( ' custom event err on dispatch');
		// trace( err );
		// probably IE...
		try {
			var event = document.createEvent("CustomEvent");
			event.initCustomEvent(eventName,false,false,
				detail
			);

			document.dispatchEvent(event);
		}catch(err) {
			// We get here: we are in a shit show.
			trace("  initCustomEvent failed as well");
		}

	};
}

module.exports = dispatchEvent;