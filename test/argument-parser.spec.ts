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
    const opts = parseArguments(args);
    assert(opts.keepBundle);
    assert(opts.skipPublish);
    assert(opts.packageName === packageName);
    assert(opts.packageVersion === packageVersion);
    assert(opts.componentName === componentName);
    assert(opts.srcFile === srcFile);
    assert(opts.outputDir === output);
  })
});
