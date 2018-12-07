const assert = require('assert');
const sinon = require('sinon');

const mutationPipeline = require('../../../lib/support/mutation.pipeline.ts');


describe('The mutation pipeline', () => {
  let source, firstProcessor, secondProcessor, thirdProcessor,
      result, firstResult, secondResult, thirdResult;

  beforeEach(() => {
    source = 'The source content';
    firstResult = 'The result of the first processor';
    secondResult = 'The result of the second processor';
    thirdResult = 'The result of the third processor';

    firstProcessor = sinon.stub().returns(firstResult);
    secondProcessor = sinon.stub().returns(secondResult);
    thirdProcessor = sinon.stub().returns(thirdResult);

    result = mutationPipeline(source, [
      firstProcessor, secondProcessor, thirdProcessor
    ]);
  });


  it('calls the first processor with the source', () => {
    assert(firstProcessor.calledWith(source));
  });

  it('calls the second processor with the result of the first processor', () => {
    assert(secondProcessor.calledWith(firstResult));
  });

  it('calls the third processor with the result of the second processor', () => {
    assert(thirdProcessor.calledWith(secondResult));
  });

  it('returns the result of the final processor', () => {
    assert.equal(result, thirdResult);
  });
});