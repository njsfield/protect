// Used when no default
// parameter defined
exports._wildCard = "*";

// Available constructor names
// to match against
exports.constructors = [
  "Function",
  "String",
  "Array",
  "Object",
  "Number",
  "Boolean",
  "Set",
  "Map",
  "Symbol"
]
// Safe check to extract arg
// type
exports._getType = (arg) => {
  if (arg === null) return "null";
  if (arg === undefined) return "undefined";
  return arg.constructor.name;
}

// Returns array of default strings
// Use regular expressions to match
// against a stringifed function
exports.getDefaults = (f) =>
  f
    .toString()
    .replace(/(function\s\w*(?=\())?\((.*)\)\s.*/, "$2")
    .split(",")
    .map(x => x.trim())
    .map(x =>
      /\w+\s*=s*/.test(x) ?
        x.replace(/\w+\s*=s*/, "").trim() :
        exports._wildCard
    )

// Stores the argument types of a function
// then (when called), compares the runtime
// argument types against the stored (expected)
// types, if mismatches then TypeError thrown,
// otherwise the function is called
exports._protectInputs = (f) => {
  const argTypes = exports.getDefaults(f);
  const temp = f;

  // Return new protected method
  return (...args) => {
    args.forEach((arg,i) => {
      // Extract constructor name, compare against saved
      const actualType = exports._getType(arg);
      if (actualType !== argTypes[i] && argTypes[i] !== exports._wildCard) {
        throw new TypeError(`Invalid type at argument: ${i}. Expected ${argTypes[i]}, Received ${actualType}`)
      }
    })
    // Continue to evaluate if valid
    return temp(...args);
  }
}

// Applies _protectInput steps to a function,
// extracts the result of the function call,
// then compares the stored (expected) output type against the
// runtime output type
exports._protectAll = (f, outputType) => {
  return (...args) => {
    // Initial input checks
    const result = exports._protectInputs(f)(...args);
    // Check constructor
    if (result.constructor.name !== outputType.name) {
      throw new TypeError(`Wrong type returned by function: Expected ${outputType.name}, Returned ${result.constructor.name}`)
    }
    return result;
  }

}

// Main protect function.
// Validates function input
// and routes function to _protectInputs
// or _protectAll.
// Validates (optional) second argument to assert
// it's a constructor
exports.protect = (f, outputType) => {
  // Check for correct input
  if (!f instanceof Function) {
    throw new Error('Protect: 1st argument must be a function');
  }
  // Basic input protection needed
  if (!outputType) {
    return exports._protectInputs(f)
  };
  // If output also requires checking
  if (exports.constructors.includes(outputType.name)) {
    return exports._protectAll(f, outputType)
  } else {
    throw new TypeError('Protect: 2nd argument must be a simple base constructor, e.g "String", "Function"');
  }
};
