const test = require('tape');
const {_protect} = require('../src/_protect');

/*
   protect
  */

test('_protect tests', (t) => {
  const received = {
    a: _protect((a,b) => a + b,
      Number)(1,2),
    b: _protect((a = String, b) => a + b,
      String)("test ",2),
    c: _protect((a = String, b = String) => a + b,
      String)("string ", "test"),
    d: _protect((a = Number, b = String) => a + b,
      String)(1, " test"),
    e: _protect((a = Function, b = String) => a(b),
      String)((x) => x.toUpperCase(), "test"),
    f: _protect((a = Function, b = String, c = {testKey: String}) => a(c[b]),
      String)((x) => x, "testKey", {testKey: "test"}),
    g: _protect((a,b,c,d,e,f = [Number],g,h) => f,
      [Number])(0,0,0,0,0,[1,2,3],0,0)
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

  // Test runner
  Object.keys(received).forEach(k => {
    t.deepEqual(received[k], expected[k]);
  });

  t.end();
});
