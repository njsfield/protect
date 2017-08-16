const {_prepareArgTypeChecks} = require('./_prepareArgTypeChecks');
const {_compareTypes} = require('./_compareTypes');
const {_handleMismatch} = require('./_handleMismatch');

/**
 * _protect
 *
 * Protects a function by analysing it's expected
 * inputs (from default parameters) before
 * it's called. Optionally, an expected type
 * can be given to check against the functions
 * output.
 *
 * @param  {Function} f - a function, with inputs
 * (optionally) containing default assignments.
 * @param  {Any} expected - (optional), an expected
 * type of output from the function
 * @return {ResultOfSideEffect} - If type mismatches
 * found, then side effect of TypeError will be produced.
 * Otherwise result of function will be returned
 */
const _protect = (f, expected) => {
  // Check for correct input
  if (!f instanceof Function) {
    throw new Error('Protect: 1st argument must be a function');
  }
  // Basic arg type checking
  if (!expected) {
    // Return function ready for arg type checks
    return _prepareArgTypeChecks(f);
  };
  // Initialise prepared
  const prepared = _prepareArgTypeChecks(f);
  // Return function ready for full check
  return (...args) => {
    // Analyse
    const actual = prepared(...args);
    // Compare
    const result = _compareTypes(actual, expected);

    // Check result object
    // If failed then handle mismatch
    if (!result.passed) {
      _handleMismatch({mode: 'output'}, result.actual, result.expected);
    }
    // Finalise output
    return actual;
  };
};

module.exports = {
  _protect
};
