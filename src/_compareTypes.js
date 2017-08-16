const {_stringifyType} = require('./_stringifyType');

/**
 * _compareTypes
 *
 * 1. Run basic checks against stringifed values (their types)
 * 2. If mismatches, run deeper comparison (for empty array/object) values
 * 3. Return object containing stringified values & passed result (boolean)
 *
 * @param  {any} actualRaw  - raw value to compare with
 * @param  {any} expectedRaw  - raw value to compare aginst acutalRaw
 * @return {Object} - Object containing stringified (type converted)
 * values, and result Boolean flag on comparison
 */
const _compareTypes = (actualRaw, expectedRaw) => {
  // Conversion
  const actual = _stringifyType(actualRaw);
  const expected = _stringifyType(expectedRaw);

  // Initial result
  const result = {passed: false, actual, expected};

  // Basic comparison (1)
  if (actual === expected) {
    // Set flag
    result.passed = true;
  }
  // @TODO: Add deeper checks

  return result;
};

module.exports = {
  _compareTypes
};
