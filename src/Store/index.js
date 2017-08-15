const Enhancer = require('../Enhancer');

const enhancer = new Enhancer();

// Main Lib
class Store {
  // Initial method
  enhanceAll () {
    Object.keys(this).forEach(x => {
      const temp = enhancer.addChecks(this[x])
      this[x] = temp;
    })
  }
}

module.exports = Store;
