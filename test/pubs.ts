import assert from 'assert';
import {HTML_FILE_PREFIX} from "../src/creators/html-creator";
import {pubs} from "../src/pubs";
const fs = require('fs');

const path = require('path');

const TEST_COMPONENT = "TestSvelteComponent";
const PARENT_COMPONENT = "ParentComponent";
const NESTED_COMPONENT = "NestedComponent";
const SVELTE_COMPONENT_DIR = path.join(__dirname, "components");

function fileExistsAndCleanup(outputDir, file) {
  let filePath = path.join(outputDir, file);
  const exist = fs.existsSync(filePath);
  if(exist){
    fs.unlinkSync(filePath);
  } else {
    assert(exist, "We expected a file to be created at " + filePath + ", but it does not exist.")
  }
  return exist;
}

function testFilesAndCleanup(componentName){
    let outputDir = path.join(SVELTE_COMPONENT_DIR, componentName);
    fileExistsAndCleanup(outputDir, 'index.js');
    fileExistsAndCleanup(outputDir, 'index.mjs');
    fileExistsAndCleanup(outputDir, HTML_FILE_PREFIX + 'es.html');
    fileExistsAndCleanup(outputDir, HTML_FILE_PREFIX + 'umd.html');
    fileExistsAndCleanup(outputDir, componentName + '.svelte');
    fileExistsAndCleanup(outputDir, "package.json");
    fileExistsAndCleanup(outputDir, "readme.md");
    fs.rmdirSync(outputDir)
}

describe('pubs', () => {
  it('Simple, files should exist', () => {
    var opts = {srcFile: path.join(SVELTE_COMPONENT_DIR, TEST_COMPONENT + ".svelte")};
    return pubs(opts).then(
        () => testFilesAndCleanup(TEST_COMPONENT)
    )
  })
  it('Nested Component, files should exist', () => {
    let opts = {srcFile: path.join(SVELTE_COMPONENT_DIR, PARENT_COMPONENT + ".svelte")};
    return pubs(opts).then( () => {
      testFilesAndCleanup(PARENT_COMPONENT);
      //fileExistsAndCleanup(outputDir, NESTED_COMPONENT + ".svelte")
    })
  })
});
