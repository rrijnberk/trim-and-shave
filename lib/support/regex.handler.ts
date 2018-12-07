module.exports = class regex {
  constructor(regex) {
    this.regex = regex;
  }

  exec(str, handler) {
    let m;

    while ((m = this.regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === this.regex.lastIndex) {
        this.regex.lastIndex++;
      }

      handler(...m);
    }
  }
};