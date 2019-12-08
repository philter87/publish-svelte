import assert from 'assert';
import {pubs} from "../src/pubs";
import { join, parse } from 'path';
import {PubsOptions} from "../src/pubs-options";
import {existsSync, unlinkSync} from "fs";
import {cleanUp} from "../src/clean-up";

const TEST_COMPONENT = "TestLodash";
const PARENT_COMPONENT = "Parent";
const SVELTE_COMPONENT_DIR = join(__dirname, "components");

function verifyAndCleanUp(opts: PubsOptions, otherFiles: string[] = []) {
  const parsed = parse(opts.srcFile);
  // outputDir needs to be reassigned manually
  opts.outputDir = join(parsed.dir, parsed.name);
  let files = ['index.js', 'index.mjs', parsed.base, "package.json", "README.md"].concat(otherFiles);

  for(let file of files) {
    assert(existsSync(join(opts.outputDir, file)), "File was not created in bundle: " + file);
  }
  // md file is deleted
  unlinkSync(opts.outputDir+".md");

  opts.keepBundle = false;
  cleanUp(opts);
  assert(!existsSync(opts.outputDir))
}

describe('pubs', () => {
  it('Simple, files should exist', () => {
    var opts: PubsOptions = {srcFile: join(SVELTE_COMPONENT_DIR, TEST_COMPONENT + ".svelte"), skipPublish: true, keepBundle: true};
    return pubs(opts)
      .then( () => verifyAndCleanUp(opts))
  });
  it('Two nested components should be copied to bundle. NestedComponent and NestedFolder/Another', () => {
    let opts: PubsOptions = {srcFile: join(SVELTE_COMPONENT_DIR, PARENT_COMPONENT + ".svelte"), skipPublish: true, keepBundle: true};
    return pubs(opts)
      .then( () => verifyAndCleanUp(opts, ['Nested.svelte', join('SubFolder', 'NestedInFolder.svelte')]))
  });
});
