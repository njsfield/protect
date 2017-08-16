const test = require('tape');
const {_prepareArgTypeChecks } = require('../src/_prepareArgTypeChecks');

/*
  protectInputs
*/

// Basic
test('_prepareArgTypeChecks (basic) tests', (t) => {
  const received = {
    a: _prepareArgTypeChecks((a,b) => a + b)(1,2),
    b: _prepareArgTypeChecks((a = String, b) => a + b)("test ",2),
    c: _prepareArgTypeChecks((a = String, b = String) => a + b)("string ", "test"),
    d: _prepareArgTypeChecks((a = Number, b = String) => a + b)(1, " test"),
    e: _prepareArgTypeChecks((a = Function, b = String) => a(b))((x) => x.toUpperCase(), "test"),
    f: _prepareArgTypeChecks((a = Function, b = String, c = {testKey: String}) => a(c[b]))((x) => x, "testKey", {testKey: "test"}),
    g: _prepareArgTypeChecks((a,b,c,d,e,f = [Number],g,h) => f)(0,0,0,0,0,[1,2,3],0,0)
  };

  const expected = {
    a: 3,
    b: "test 2",
    c: "string test",
    d: "1 test",
    e: "TEST",
    f: "test",
    g: [1,2,3]
  };

  // Runner
  Object.keys(received).forEach(k => {
    t.deepEqual(received[k], expected[k]);
  });

  t.end();
});

// Complex
test('_prepareArgTypeChecks (complex) tests', (t) => {

  // Set test input
  const testInput = {
    name: "John",
    age: 24,
    results: [{
      english: 76,
      maths: 89,
      science: 92
    }],
    onInput: (x) => x
  };
  // Utilise TestInputType
  const testFunc = (b = ({
    name: String,
    age: Number,
    results: [{
      english: Number,
      maths: Number,
      science: Number
    }],
    onInput: Function
  })) => {
    return true;
  };

  // Attempt
  const received = _prepareArgTypeChecks(testFunc)(testInput);
  t.equal(received, true, 'Can evaulate complex types');
  t.end();
});
