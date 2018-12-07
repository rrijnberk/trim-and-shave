const fs = require('fs-extra');
const path = require('path');

const SOURCE_DIR = 'test/src';
const TARGET_DIR = 'test/target';

class Files {
  static get(fileName) {
    return new TestFile(fileName);
  }
}

class TestFile {
  constructor(fileName) {
    this.sourceFilePath = path.resolve(SOURCE_DIR, fileName);
    this.targetFilePath = path.resolve(TARGET_DIR, fileName);
  }

  get source() {
    return fs.readFileSync(this.sourceFilePath).toString();
  }

  get target() {
    return fs.readFileSync(this.targetFilePath).toString();
  }
}

exports.Files = new Files();

