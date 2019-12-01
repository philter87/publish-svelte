
import assert from 'assert';
import {DEFAULT_INIT_VERSION, mergeOptions} from "../src/pubs-options";
import {PACKAGE_VERSION} from "./readme-creator";

const COMPONENT_NAME = "MySvelteComponent";
const PACKAGE_NAME = "pubs-my-svelte-component";
const SRC_FILE = "./src/" + COMPONENT_NAME + ".svelte";

describe('options-utils', () => {
  it('no srcFile', () => {
    assert.throws(() => mergeOptions({srcFile: null}), Error)
  });
  it('srcFile is in options', () => {
    let result = mergeOptions({srcFile: SRC_FILE});
    assert(SRC_FILE === result.srcFile);
  });
  it('Automatically assign packageName, packageVersion, componentName from srcFile', () => {
    let result = mergeOptions({srcFile: SRC_FILE});
    assert(COMPONENT_NAME === result.componentName);
    assert( PACKAGE_NAME === result.packageName);
    assert( '0.0.1' === result.packageVersion);
  });
  it('Hardcode version', () => {
    let expectedVersion = '1.0.0';
    let result = mergeOptions({srcFile: SRC_FILE, packageVersion: expectedVersion});
    assert( expectedVersion === result.packageVersion);
  });
  it('Hardcode package name', () => {
    let expectedPackageName = 'my-random-name';
    let result = mergeOptions({srcFile: SRC_FILE, packageName: expectedPackageName});
    assert( expectedPackageName === result.packageName);
  });
  it('Clean up by default', () => {
    let result = mergeOptions({srcFile: SRC_FILE});
    assert(!result.keep);
  });
});

describe('Options Priority: cli arguments, options from readme, defaults', () => {
  it('cli arguments has highest priority. Here: keep=true is used', () => {
    let result = mergeOptions({srcFile: SRC_FILE, keep: true});
    assert(result.keep)
  });
  it('cli argument packageVersion has priority over readme-option', () => {
    const versionExpected = '1.0.0';
    let result = mergeOptions({srcFile: 'SimpleSvelteComponent.svelte', packageVersion: versionExpected});
    assert.equal(result.packageVersion, versionExpected);
  });
  it('default options are preserved', () => {
    let result = mergeOptions({srcFile: SRC_FILE});
    assert.equal(result.componentName, 'MySvelteComponent');
    assert.equal(result.packageVersion, DEFAULT_INIT_VERSION);
    assert.equal(result.packageName, PACKAGE_NAME);
  })
});
