function getTopLeftOfElement(element) {
	var top = 0;
	var left = 0;
	
	do {
		top += element.offsetTop;
		left += element.offsetLeft;
	} while(element = element.offsetParent);

	return {left: left, top: top};
}

module.exports = getTopLeftOfElement;