const test = require('tape');
const {_stringifyType} = require('../src/_stringifyType');

/*
   _stringifyType
  */

test('_stringifyType (basic literal) tests', (t) => {
  t.equal(_stringifyType(Object), "Object", "Can stringify literal Object");
  t.equal(_stringifyType(Array), "Array", "Can stringify literal Array");
  t.equal(_stringifyType(String), "String", "Can stringify literal String");
  t.equal(_stringifyType(Number), "Number", "Can stringify literal Number");
  t.equal(_stringifyType(Function), "Function", "Can stringify literal Function");
  t.equal(_stringifyType(Set), "Set", "Can stringify  literal Set");
  t.equal(_stringifyType(Map), "Map", "Can stringify literal Map");
  t.end();
});

test('_stringifyType (basic raw) tests', (t) => {
  t.equal(_stringifyType((x) => x), "Function", "Can stringify raw Function");
  t.equal(_stringifyType(0), "Number", "Can stringify raw Number");
  t.equal(_stringifyType(""), "String", "Can stringify raw String");
  t.equal(_stringifyType(true), "Boolean", "Can stringify raw Boolean");
  t.equal(_stringifyType(undefined), "*", "Should set * for undefined");
  t.equal(_stringifyType(null), "null", "Can stringify null");
  t.end();
});

test('_stringifyType (complex) array tests', (t) => {
  t.equal(_stringifyType([]), "[*]", "Can stringify empty array");
  t.equal(_stringifyType([[]]), "[[*]]", "Can stringify three dimensional array");
  t.equal(_stringifyType([Object]), "[Object]", "Can stringify array with nested object");
  t.equal(_stringifyType([0,0,0,0]), "[Number]", "Can stringify array with numbers");
  t.equal(_stringifyType(["hello", "there"]), "[String]", "Can stringify array with strings");
  t.equal(_stringifyType([{}]), "[{}]", "Can stringify array with empty object");
  t.equal(_stringifyType([(x) => x]), "[Function]", "Can stringify array with functions");
  t.equal(_stringifyType([[[Object]]]), "[[[Object]]]", "Can stringify four dimensional array with Object");
  t.end();
});

test('_stringifyType (complex) object tests', (t) => {
  t.equal(_stringifyType({name: "John"}), "{name: String}", "Can stringify object with single key (basic vals)");
  t.equal(_stringifyType({name: "John", age: 24}), "{name: String, age: Number}", "Can stringify object with multiple keys (basic vals)");
  t.equal(_stringifyType({items: []}), "{items: [*]}", "Can stringify object containing key with array (empty)");
  t.equal(_stringifyType({items: [""]}), "{items: [String]}", "Can stringify object containing key with array (string)");
  t.equal(_stringifyType({items: [{name: "John", age: 24}]}), "{items: [{name: String, age: Number}]}", "Can stringify object with complex array");
  t.end();
});

test('_stringifyType (very complex) object tests', (t) => {
  let actual, expected;

  // Complex object
  actual = _stringifyType({
    name: "john",
    age: 24,
    items: [{
      name: "lunchbox",
      value: "£3",
      meta: {
        weight: 0.34,
        condition: "good",
        replaceable: true,
        related: []
      }
    }],
    onInput: (x) => x
  });

  expected = "{name: String, age: Number, items: [{name: String, value: String, meta: {weight: Number, condition: String, replaceable: Boolean, related: [*]}}], onInput: Function}";

  t.equal(actual, expected, "Can stringify a very complex object");

  t.end();
});
