const {_wildCard} = require('./_wildCard');
/**
 * _isWildCard
 *
 * check if an argument
 * is wildcard
 * @param  {any} input - any value
 * @return {Boolean}
 */
const _isWildCard = (input) =>
  input === _wildCard;

module.exports = {
  _isWildCard
};
