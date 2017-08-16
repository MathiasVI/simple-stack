
function mapRange(value, low1, high1, low2, high2) {
  var val = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  if ( value > high1 ) val = high2;
  else if ( value < low1 ) val = low2;

  return val;
}

module.exports = mapRange;
