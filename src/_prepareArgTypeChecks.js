const {_getDefaults}   = require('./_getDefaults');
const {_isWildCard}     = require('./_isWildCard');
const {_compareTypes}   = require('./_compareTypes');
const {_handleMismatch} = require('./_handleMismatch');

/**
 * _prepareArgTypeChecks
 *
 * Prepares a function by
 * extract its default parameters
 *
 * Then when called (before evaluation)
 * compares each
 * actual argument against its
 * expected (previously stored)
 * argument.
 *
 * Comparison is done seperately
 * to compare types.
 *
 * If arguments match expected
 * types, the function is then
 * called.
 *
 * @param  {Function} f - function to be
 * prepared
 * @return {Function} - prepared function
 */
const _prepareArgTypeChecks = (f) => {
  // Hold raw defaults
  // May include wildcard
  const defaults = _getDefaults(f);
  const temp = f;

  // Return new protected method
  return (...args) => {
    args.forEach((arg,i) => {
      // Only compare types if current cached type isnt wildcard
      if (!_isWildCard(defaults[i])) {
        // Generate result report
        const result = _compareTypes(arg, defaults[i]);
        // Check result object
        // If failed then handle mismatch
        if (!result.passed) {
          _handleMismatch({mode: 'input', position: i}, result.actual, result.expected);
        }
      }
    });
    // Continue to evaluate if valid
    return temp(...args);
  };
};

module.exports = {
  _prepareArgTypeChecks
};
