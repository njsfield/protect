const {_wildCard} = require('./_wildCard');

// Main constructors
const _constructors = [
  "Function",
  "String",
  "Array",
  "Object",
  "Number",
  "Boolean",
  "Set",
  "Map"
];

// Hold complex (requires deeper checks)
const _complexConstructors = [
  "Object",
  "Array"
];

/**
 * _stringifyType
 *
 * takes any value and parses it
 * to create a stringifed type
 * representation of it.
 * For undefined values,
 * a wildcard is used to fill
 * the result
 *
 * E.g.
 *
 * Object -> "Object"
 * "hello" -> "String"
 * {name: 'John'} -> {name: String}
 * [] -> [*]
 *
 *
 * @param  {any} val - any value
 * @return {String} - stringified representation
 * of type
 */
const _stringifyType = (val) => {
  // Use wildcard for undefined
  if (val === undefined) return _wildCard;
  if (val === null) return "null";

  // 1. Type Value. Check for base constructor
  if (val.name && _constructors.includes(val.name)) {
    return val.name;
  }
  // Not a construor, parse.
  const parsed = val.constructor.name;

  // 2. Raw Value. Check if raw value is complex
  if (_complexConstructors.includes(parsed)) {
    // If we have an array...
    if (parsed === "Array") {
      // Recurse with it's first value
      return `[${_stringifyType(val[0])}]`;
    } else {
      // It's an object
      // Build a stringifed shape of the object (recurse)
      // Start with the keys
      const keys = Object.keys(val);
      if (!keys.length) return '{}';
      return (
        `{${keys
          .reduce((acc,key,i) => {
            // Is it the final key?
            const end = i === keys.length - 1 ? '' : ', ';
            // Return acc and stringifed result
            return acc + `${key}: ${_stringifyType(val[key])}${end}`;
          },"")}}`
      );
    }
  } else {
    // Return basic constructor
    return val.constructor.name;
  }
};

// Export simple & complex
module.exports = {
  _stringifyType,
  _constructors,
  _complexConstructors
};
