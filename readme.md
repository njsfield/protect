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
let myFunc = (arr = Array, func = Function) => {
  return arr.map(func);
}

myFunc = protect(myFunc);

myFunc([0,1,2,3], (x) => x * 2); // [0,2,4,6]
myFunc(null, (x) => x * 2); // TypeError: Invalid type at argument: 0. Expected Array, Received null
```
With output type declared;
```javascript
let myFunc = (arr = Array, func = Function) => {
  return false;
}
// myFunc now expects its return value to always be an array
myFunc = protect(myFunc, Array);
myFunc([0,1,2,3], (x) => x * 2); // Wrong type returned by function: Expected Array, Returned Boolean
```

## Available Types

Function,  
String,  
Array,  
Object,  
Number,  
Boolean,  
Set,  
Map,  
Symbol  

## Next Steps

- Add checks for nested Types;
```javascript
let myFunc = (arr = [String], func = Function) => {
  return arr.map(func);
}
```
- Add ability to create custom types.
