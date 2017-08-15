class Enhancer {
  // Assign wildcard
  constructor() {
    this._wildCard = "*";
  }

  // Convert function to array of default assignments
  // If argument has no assignment, then fill array value with "*"
  getDefaults (f) {
    return f
      .toString()
      .replace(/(function\s\w*(?=\())?\((.*)\)\s.*/, "$2")
      .split(",")
      .map(x => x.trim())
      .map(x =>
        /\w+\s*=s*/.test(x) ?
          x.replace(/\w+\s*=s*/, "").trim() :
          this._wildCard
      )
  }

  // Protect a function
  addChecks (f) {
    if (!(f instanceof Function)) return;
    const argTypes = this.getDefaults(f);
    const temp = f;

    // Return new protected method
    return (...args) => {
          args.forEach((arg,i) => {
            if (arg.constructor.name !== argTypes[i] && argTypes[i] !== this._wildCard) {
              throw new Error(`Wrong typed at argument: ${i+1}. Expected ${argTypes[i]}, Received ${arg.constructor.name}`)
            }
          })
      // Continue to evaluate if valid
      return temp(...args);
    }
  }
}

module.exports = Enhancer;
