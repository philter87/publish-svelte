import assert from 'assert';
import {pelte, generate, parseOptions} from "../src/pelte";
import { join, parse } from 'path';
import {PelteOptions} from "../src/pelte-options";
import {existsSync, unlinkSync} from "fs";
import {cleanUp} from "../src/clean-up";
import {changeExtension} from "../src/pelte-util";

const TEST_COMPONENT = "TestLibImport";
const PARENT_COMPONENT = "Parent";
const SVELTE_COMPONENT_DIR = join(__dirname, "components");

describe('pelte', () => {
  it('Simple, files should exist', () => {
    var opts: PelteOptions = {srcFile: join(SVELTE_COMPONENT_DIR, TEST_COMPONENT + ".svelte"), skipPublish: true, keepBundle: true};
    return pelte(opts)
      .then( () => verifyAndCleanUp(opts))
  });
  it('Two nested components should be copied to bundle. NestedComponent and NestedFolder/Another', () => {
    let opts: PelteOptions = {srcFile: join(SVELTE_COMPONENT_DIR, PARENT_COMPONENT + ".svelte"), skipPublish: true, keepBundle: true};
    return pelte(opts)
      .then( () => verifyAndCleanUp(opts, ['Nested.svelte', join('SubFolder', 'NestedInFolder.svelte')]))
  });
});

describe('generate', () => {
  it('Simple, files should exist', () => {
    var opts: PelteOptions = {srcFile: join(SVELTE_COMPONENT_DIR, TEST_COMPONENT + ".svelte"), skipPublish: true, keepBundle: true };
    return generate(opts)
      .then((results) => verifyGenerate(results, opts))
  });
  it('Two nested components should be copied to bundle. NestedComponent and NestedFolder/Another', () => {
    let opts: PelteOptions = {srcFile: join(SVELTE_COMPONENT_DIR, PARENT_COMPONENT + ".svelte"), skipPublish: true, keepBundle: true };
    return generate(opts)
      .then((results) => verifyGenerate(results, opts))
  });
});

function verifyAndCleanUp(opts: PelteOptions, otherFiles: string[] = []) {
  const parsed = parse(opts.srcFile);
  // outputDir needs to be reassigned manually
  opts.outputDir = join(parsed.dir, parsed.name);
  let files = ['index.js', 'index.mjs', parsed.base, "package.json", "README.md"].concat(otherFiles);

  for(let file of files) {
    assert(existsSync(join(opts.outputDir, file)), "File was not created in bundle: " + file);
  }

  unlinkSync(changeExtension(opts.srcFile, "md"));
  unlinkSync(changeExtension(opts.srcFile, "json"));

  opts.keepBundle = false;
  cleanUp(opts);
  assert(!existsSync(opts.outputDir))
}

function verifyGenerate(results, opts: PelteOptions) {
  const { rollupWriteOpts } = parseOptions(opts);
  results.forEach(result => {
    assert(rollupWriteOpts.find(writeOpts => writeOpts.format == result.options.format), "Rollup write options should exist on `options` key")
    assert(result.bundle, "Generated rollup bundle should exist on `bundle` key")
  })
}
