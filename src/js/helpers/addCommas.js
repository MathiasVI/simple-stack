function addCommas(num) {
	// return String(num).replace(/(.)(?=(\d{3})+$)/g,'$1,')
	return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

module.exports = addCommas;
