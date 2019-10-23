const optionUtils = require('../src/option-utils');
const assert = require('assert');

describe('options-utils', () => {
  it('no srcPath', () => {
    assert.throws(() => optionUtils(), Error)
  });
  it('srcPath is in options', () => {
    let srcPath = "aSrcPath";
    let result = optionUtils({srcPath});
    assert(srcPath === result.srcPath);
  });
});