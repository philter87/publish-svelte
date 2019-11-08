const pubs = require('../src/pubs');
const HTML_FILE_PREFIX = require('../src/html-creator').HTML_FILE_PREFIX;
const fs = require('fs');
const assert = require('assert');
const path = require('path');

const TEST_COMPONENT = "TestSvelteComponent";
const PARENT_COMPONENT = "ParentComponent";
const NESTED_COMPONENT = "NestedComponent"
const COMPONENTS_DIR = path.join(__dirname, "components");

function fileExistsAndCleanup(outputDir, file) {
  let filePath = path.join(outputDir, file);
  const exist = fs.existsSync(filePath);
  if(exist){
    fs.unlinkSync(filePath);
  } else {
    assert(exist, "File did not exist " + filePath)
  }
  return exist;
}

function testFilesAndCleanup(componentName){
    let componentPath = path.join(COMPONENTS_DIR, componentName)
    fileExistsAndCleanup(componentPath, 'index.js');
    fileExistsAndCleanup(componentPath, 'index.mjs');
    fileExistsAndCleanup(componentPath, HTML_FILE_PREFIX + 'es.html');
    fileExistsAndCleanup(componentPath, HTML_FILE_PREFIX + 'umd.html');
    fileExistsAndCleanup(componentPath, componentName + '.svelte');
    fileExistsAndCleanup(componentPath, "package.json");
    fs.rmdirSync(componentPath)
}

describe('pubs', () => {
  it('Simple, files should exist', () => {
    var opts = {srcPath: path.join(COMPONENTS_DIR, TEST_COMPONENT + ".svelte")};
    return pubs(opts).then(
        () => testFilesAndCleanup(TEST_COMPONENT)
    )
  })
  it('Nested Component, files should exist', () => {
    let outputDir = path.join(COMPONENTS_DIR, PARENT_COMPONENT);
    let opts = {srcPath: path.join(COMPONENTS_DIR, PARENT_COMPONENT + ".svelte")}
    return pubs(opts).then( () => {
      testFilesAndCleanup(PARENT_COMPONENT);
      fileExistsAndCleanup(outputDir, NESTED_COMPONENT + ".svelte")
    })
  })
});