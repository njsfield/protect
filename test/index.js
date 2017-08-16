const test = require('tape');

/*
  Initialise
 */

test('Initialise', (t) => {
  t.ok(true, 'init test');
  t.end();
});

/*
  Run all
*/

require('./_getDefaults.test.js');
require('./_stringifyType.test.js');
require('./_prepareArgTypeChecks.test.js');
require('./_protect.test.js');
