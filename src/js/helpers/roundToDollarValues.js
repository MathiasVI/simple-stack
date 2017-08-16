function roundToDollarValues(num) {
	let val = Math.round( num * 100) / 100;
	// toFixed(2) force 2 decimal points
	return val.toFixed(2);
}

module.exports = roundToDollarValues;
