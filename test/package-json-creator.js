const packageJsonCreator = require('../src/package-json-creator');
const consts = require('../src/pubs-constants');
const assert = require('assert');

describe('packageJsonCreator', () => {
  it('generate', () => {
    var componentName = "MySvelteComponentTest";
    var packageJson = packageJsonCreator.generate(componentName);
    assert(packageJson['svelte'] === componentName + ".svelte");
    assert(packageJson['main'] === consts.INDEX_UMD);
    assert(packageJson['module'] === consts.INDEX_ES);
  })
});