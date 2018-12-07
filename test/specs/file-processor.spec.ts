const Files = require('../support/file.util.ts').Files;
const aggregate = require('../../lib/processors/aggregate.processor.ts');
const alphabetize = require('../../lib/processors/alphabetize.processor.ts');
const assert = require('assert');

describe('File processor', () => {
  let file;

  it('aggregates style definitions', () => {
    file = Files.get('01_Aggregate.css');
    assert.equal(aggregate(file.source), file.target);
  });

  it('alphabetizes the style paths', () => {
    file = Files.get('02_Alphabetize.css');
    assert.equal(alphabetize(file.source), file.target)
  })
});