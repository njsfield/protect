const test = require('tape');
const {_getDefaults, _parseHead} = require('../src/_getDefaults');

/*
  _parseHead
 */
test('_parseHead (basic)', (t) => {
  let received, expected;
  // 1.
  received = _parseHead('a');
  expected = ['a'];
  t.deepEqual(received, expected, 'Should perform (basic) shallow comma split');

  // 2.
  received = _parseHead('a = b, c, d');
  expected = ['a = b', 'c', 'd'];
  t.deepEqual(received, expected, 'Should perform (basic) shallow comma split');
  t.end();
});

test('_parseHead (complex)', (t) => {
  let received, expected;

  received = _parseHead('a = Function, b = String, c = {testKey: String}');
  expected = ['a = Function', 'b = String', 'c = {testKey: String}'];
  t.deepEqual(received, expected, 'Should perform (complex) shallow comma split');

  received = _parseHead('a = b, c, d = ({name: String, age: Number, data: [{lastSeen: String}], time: String}), e');
  expected = ['a = b', 'c', 'd = ({name: String, age: Number, data: [{lastSeen: String}], time: String})', 'e'];
  t.deepEqual(received, expected, 'Should perform (complex) shallow comma split');
  t.end();
});

/*
  _getDefaults
 */

test('_getDefaults (basic) tests', (t) => {
  const received = {
    a: _getDefaults((a,b) => a + b),
    b: _getDefaults((a = String, b) => a + b),
    c: _getDefaults((a = String, b = String) => a + b),
    d: _getDefaults((a = Number, b = String) => a + b),
    e: _getDefaults((a = Function, b = String) => a(b)),
    f: _getDefaults((a = Function, b = String, c = Object) => a(b[c])),
    g: _getDefaults((a,b,c,d,e,f = Array,g,h) => f)
  };

  const expected = {
    a: ["*", "*"],
    b: [String, "*"],
    c: [String, String],
    d: [Number, String],
    e: [Function, String],
    f: [Function, String, Object],
    g: ["*","*","*","*","*",Array,"*","*"]
  };

  // Test runner
  Object.keys(received).forEach(k => {
    t.deepEqual(received[k], expected[k]);
  });

  t.end();
});

test('_getDefaults (complex) tests', (t) => {
  const received = _getDefaults((a = ({name: String, age: Number, data: [{custom: Boolean}]}), b = Function) => b(a));

  const expected = [
    {name: String, age: Number, data: [{custom: Boolean}]},
    Function
  ];

  t.deepEqual(received, expected);
  t.end();
});
