import assert from 'assert';
import {parseArguments} from "../src/argument-parser";

describe('argument-parser', () => {
  it('parse arguments', () => {
    const srcFile = 'aSrcFile.svelte';
    const output = 'outputDir';
    const packageName = 'packName';
    const packageVersion = '0.3.1';
    const componentName = 'compName';
    const args = ['', '', '--keep-bundle', srcFile, '--skip-publish', '--package-name', packageName, '-o', output, '-n', componentName,'--package-version', packageVersion];
    const pubsOpts = parseArguments(args);
    assert(pubsOpts.keepBundle);
    assert(pubsOpts.skipPublish);
    assert(pubsOpts.packageName === packageName);
    assert(pubsOpts.packageVersion === packageVersion);
    assert(pubsOpts.componentName === componentName);
    assert(pubsOpts.srcFile === srcFile);
    assert(pubsOpts.outputDir === output);
  })
});
