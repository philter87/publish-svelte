
import assert from 'assert';
import {initOptions} from "../src/pubs-options";

const COMPONENT_NAME = "MySvelteComponent";
const SRC_FILE = "./src/" + COMPONENT_NAME + ".svelte";

describe('options-utils', () => {
  it('no srcFile', () => {
    assert.throws(() => initOptions({srcFile: null}), Error)
  });
  it('srcFile is in options', () => {
    let result = initOptions({srcFile: SRC_FILE});
    assert(SRC_FILE === result.srcFile);
  });
  it('Automatically assign packageName, packageVersion, componentName from srcFile', () => {
    let result = initOptions({srcFile: SRC_FILE});
    assert(COMPONENT_NAME === result.componentName);
    assert( "my-svelte-component" === result.packageName);
    assert( '0.0.1' === result.packageVersion);
  });
  it('Hardcode version', () => {
    let expectedVersion = '1.0.0';
    let result = initOptions({srcFile: SRC_FILE, packageVersion: expectedVersion});
    assert( expectedVersion === result.packageVersion);
  });
  it('Hardcode package name', () => {
    let expectedPackageName = 'my-random-name';
    let result = initOptions({srcFile: SRC_FILE, packageName: expectedPackageName});
    assert( expectedPackageName === result.packageName);
  });
});
