/* Message Builders */
const _inputErrorMessage = (position) =>
  `Wrong type at argument ${position}`;

const _outputErrorMessage = () =>
  `Wrong type returned by function`;

const _comparisonMessage = (actual, expected) =>
  `Expected: ${expected}, but got: ${actual}`;

/**
 * _handleMismatch
 *
 * @param  {Object} options - object
 * containing mode, either 'input' or 'output'.
 * If 'input' then additional 'position' key must
 * be provided, referring to argument position of function
 * where error has occured.
 *
 * @param  {String} actual - stringifed type value
 * @param  {String} expected - stringifed type value
 * @return {SideEffect} - Throw TypeError with descriptive message
 */
const _handleMismatch = (options, actual, expected) => {
  // Initialise message
  let message = 'Protect: ';

  // 1. Build head of message
  switch (options.mode) {
  case 'input': {
    message += _inputErrorMessage(options.position);
    break;
  };
  case 'output': {
    message += _outputErrorMessage();
    break;
  };
  }

  // 2. Add tail
  message += '. ';
  message += _comparisonMessage(actual, expected);

  // 3. Throw message
  throw new TypeError(message);

};

module.exports = {
  _handleMismatch
};
