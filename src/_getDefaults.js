const {_wildCard} = require('./_wildCard');

/**
 * _parseHead
 *
 * Advanced comma splitting algorithm.
 * Allows nested default parameters to
 * be ignored (when searching for commas)
 * @param  {String} str [description]
 * @return {[String]} - returns array of strings
 */
const _parseHead = (str) => {
  // Initialise result
  const results = [];
  // Initialise continue flag
  let shouldContinue = str.length > 0;
  // Main loop
  while (shouldContinue) {
    // Increment/decrement this value
    // when curly braces/brackets found found
    let curlyBraceDepth = 0;
    for (let i = 0; i < str.length; i++) {
      // Hold current
      const current = str[i];
      // ++ if we're enterring an object/array
      if (current === '{' || current === '[') {
        curlyBraceDepth++;
      // -- if we're exiting an object/array
      } else if (current === '}' || current === ']') {
        curlyBraceDepth--;
      // ONLY push a chunk of string if we're
      // not nested in an array/object
      } else if (current === ',' && !curlyBraceDepth) {
        // Allow trim
        results.push(str.slice(0, i).trim());
        // Set strings new size
        str = str.slice(i+1);
        break;
      }
      // Always run final check
      if (i === str.length - 1) {
        // If we're at the end of the loop,
        // push the remaining string
        results.push(str.trim());
        shouldContinue = false;
        break;
      }
    }
  }
  return results;
};

// Regex to extract head from stringified function
const GET_HEAD_REGEX = /^\s*(function\s*\w*(?=\())?\((.*)\)\s*((=>)|{)/;

// Regex to extract default part of argument statement
const GET_DEFAULT_REGEX = /\w+\s*=s*\(?(.+)\)?/;

/**
 * _evalDefaultPart
 *
 * Takes a string representation
 * of one portion of a default
 * parameter statement of a function,
 *
 * parses it and returns the result.
 *
 * E.g.
 *
 * "a = String" -> String
 * "b = Function" -> Function
 * "c = {name: "John"}" -> {name: "John"}
 *
 *
 * @param  {String} x string representation
 * of default assignment statement
 * @return {any} - raw default value
 */
const _evalDefaultPart = (x) => {
  // Extract part
  const part = x.match(GET_DEFAULT_REGEX)[1].trim();
  // If part is a stringifed object, eval
  // will fail. Check for braces
  if (part.trim()[0] === '{') {
    // Eval with surrounding array braces
    // then return first array item
    return eval(`[${part}]`)[0];
  } else {
    // Otherwise, eval
    return eval(part);
  }
};

/**
 * _getDefaults
 *
 * Extracts the head of a function,
 * then parses the default parameters
 * and returns them in an array.
 *
 * If an argument doesn't contain a default
 * parameter, a wildcard is used to fill its place
 * in the output array
 *
 * @param  {Function} f [description]
 * @return {Array} - returns array of raw
 * default values from head
 *
 */
const _getDefaults = (f) => {
  // 1. Extract head
  f = f
    .toString()
    .replace(/\n/g, "")
    .match(GET_HEAD_REGEX)[2];
  // 2. Parse head
  f = _parseHead(f);
  // 3. Map
  f = f
    .map(x =>
      /\w+\s*=s*/.test(x) ?
        _evalDefaultPart(x) :
        _wildCard
    );
  return f;
};

module.exports = {
  _getDefaults,
  _evalDefaultPart,
  GET_HEAD_REGEX,
  GET_DEFAULT_REGEX,
  _parseHead
};
