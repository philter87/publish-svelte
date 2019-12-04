import assert from 'assert';
import {pubs} from "../src/pubs";
import { join } from 'path';
import {PubsOptions} from "../src/pubs-options";
import {existsSync} from "fs";

const TEST_COMPONENT = "TestSvelteComponent";
const PARENT_COMPONENT = "ParentComponent";
const SVELTE_COMPONENT_DIR = join(__dirname, "components");

function verifyCleanUp(opts: Partial<PubsOptions>) {
  assert(!existsSync(opts.outputDir))
}

describe('pubs', () => {
  it('Simple, files should exist', () => {
    var opts: Partial<PubsOptions> = {srcFile: join(SVELTE_COMPONENT_DIR, TEST_COMPONENT + ".svelte"), skipPublish: true};
    return pubs(opts)
      .then( () => verifyCleanUp(opts))
  });
  it('Nested Component, files should exist', () => {
    let opts: Partial<PubsOptions> = {srcFile: join(SVELTE_COMPONENT_DIR, PARENT_COMPONENT + ".svelte"), skipPublish: true};
    return pubs(opts)
      .then( () => verifyCleanUp(opts))
  });
});
