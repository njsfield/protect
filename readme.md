# Protect

## Overview

A super simple tool for applying shallow type checks to functions.
Both input & output type checks are evaluated at runtime.
TypeErrors are thrown if mismatches are found.
Types are declared via *default parameters*...

Without output type declared;
```javascript
const protect = require('protect');

// Default parameters are constructors
let myFunc = (arr = [Number], func = Function) => {
  return arr.map(func);
}

myFunc = protect(myFunc);

myFunc([0,1,2,3], (x) => x * 2); // [0,2,4,6]
myFunc(null, (x) => x * 2); // TypeError: Invalid type at argument: 0. Expected [Number], Received null
```
With output type declared;
```javascript
let myFunc = (arr = [Number], func = Function) => {
  return false;
}
// myFunc now expects its return value to always be an array
myFunc = protect(myFunc, [Number]);
myFunc([0,1,2,3], (x) => x * 2); // Wrong type returned by function: Expected [Number], Returned Boolean
```
