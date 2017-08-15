const test = require('tape');
const { getDefaults, _protectInputs, _protectAll, protect } = require('../src');

/*
  Initialise
 */

test('Initialise', (t) => {
  t.ok(true, 'init test');
  t.end();
})

/*
  getDefaults
 */

 test('getDefault tests', (t) => {
   const received = {
     a: getDefaults((a,b) => a + b),
     b: getDefaults((a = String, b) => a + b),
     c: getDefaults((a = String, b = String) => a + b),
     d: getDefaults((a = Number, b = String) => a + b),
     e: getDefaults((a = Function, b = String) => a(b)),
     f: getDefaults((a = Function, b = String, c = Object) => a(b[c])),
     g: getDefaults((a,b,c,d,e,f = Array,g,h) => f)
   }

   const expected = {
     a: ["*", "*"],
     b: ["String", "*"],
     c: ["String", "String"],
     d: ["Number", "String"],
     e: ["Function", "String"],
     f: ["Function", "String", "Object"],
     g: ["*","*","*","*","*","Array","*","*"]
   }

   // Test runner
   Object.keys(received).forEach(k => {
     t.deepEqual(received[k], expected[k]);
   })

   t.end();
 })

 /*
   protectInputs
  */

test('_protectInputs tests', (t) => {
  const received = {
    a: _protectInputs((a,b) => a + b)(1,2),
    b: _protectInputs((a = String, b) => a + b)("test ",2),
    c: _protectInputs((a = String, b = String) => a + b)("string ", "test"),
    d: _protectInputs((a = Number, b = String) => a + b)(1, " test"),
    e: _protectInputs((a = Function, b = String) => a(b))((x) => x.toUpperCase(), "test"),
    f: _protectInputs((a = Function, b = String, c = Object) => a(c[b]))((x) => x, "testKey", {testKey: "test"}),
    g: _protectInputs((a,b,c,d,e,f = Array,g,h) => f)(0,0,0,0,0,[1,2,3],0,0)
  }

  const expected = {
    a: 3,
    b: "test 2",
    c: "string test",
    d: "1 test",
    e: "TEST",
    f: "test",
    g: [1,2,3]
  }

  // Test runner
  Object.keys(received).forEach(k => {
    t.deepEqual(received[k], expected[k]);
  })

  t.end();
})


 /*
   protectAll
  */

test('_protectAll tests', (t) => {
  const received = {
    a: _protectAll((a,b) => a + b,
      Number)(1,2),
    b: _protectAll((a = String, b) => a + b,
      String)("test ",2),
    c: _protectAll((a = String, b = String) => a + b,
      String)("string ", "test"),
    d: _protectAll((a = Number, b = String) => a + b,
      String)(1, " test"),
    e: _protectAll((a = Function, b = String) => a(b),
      String)((x) => x.toUpperCase(), "test"),
    f: _protectAll((a = Function, b = String, c = Object) => a(c[b]),
      String)((x) => x, "testKey", {testKey: "test"}),
    g: _protectAll((a,b,c,d,e,f = Array,g,h) => f,
      Array)(0,0,0,0,0,[1,2,3],0,0)
  }

  const expected = {
    a: 3,
    b: "test 2",
    c: "string test",
    d: "1 test",
    e: "TEST",
    f: "test",
    g: [1,2,3]
  }

  // Test runner
  Object.keys(received).forEach(k => {
    t.deepEqual(received[k], expected[k])
  })

  t.end();
})


/*
  protect
 */

 test('_protectAll tests', (t) => {
   // Base func
   const myMap = (a = Array, f = Function) => a.map(f);
   let protectedFunc, received, expected;

   /* Inputs only */
   protectedFunc = protect(myMap);
   received = protectedFunc([0,1,2,3,4], (x) => x * 2);
   expected = [0,2,4,6,8]

   // Check result
   t.deepEqual(received, expected, "Can type check inputs only");

   /* Inputs & Output */
   protectedFunc = protect(myMap, Array);
   received = protectedFunc([0,1,2,3,4], (x) => x * 2);
   expected = [0,2,4,6,8];

   // Check result
   t.deepEqual(received, expected, "Can type check inputs & output");

   t.end();
 })
