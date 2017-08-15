const { Store, Enhancer } = require('./src');

// Base method
const log = (...args) => console.log(...args);

// Initialise
const _ = new Store();

// Make lib
_.add     = (a = Number, b = Number) => a + b;
_.delete  = (a = Number, b = Number) => a - b;
_.map     = (arr = Array, f = Function) => arr.map(f);
_.getProp = (obj = Object, prop = String) => obj[prop];
_.concat  = (a = String, b = String) => a + b;

// enhance
_.enhanceAll();

log(_.add(1,3)) // 4
log(_.add(1,5)) // 6
log(_.map([0,1,2,3], (x) => x + 1))
log(_.getProp({name: "john"}, "name"))
log(_.concat("the ", "string"))

// addChecks
const enhancer = new Enhancer();

const add = enhancer.addChecks((a = Number, b = Number) => a + b)
log(add(1,3)) // 4
