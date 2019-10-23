const pubs = require('../src/pubs');
const HTML_FILE_PREFIX = require('../src/html-creator').HTML_FILE_PREFIX;
const fs = require('fs');
const assert = require('assert');
const path = require('path');

const COMPONENT_NAME = "TestSvelteComponent";
const OUTPUT_DIR = path.join(__dirname, "components", COMPONENT_NAME);

function fileExistsAndCleanup(fileName) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  const exist = fs.existsSync(filePath);
  if(exist){
    fs.unlinkSync(filePath);
  }
  return exist;
}

describe('packageCreator', () => {
  it('files should exist', () => {
    var opts = {srcPath: OUTPUT_DIR+".svelte"};
    pubs(opts).then(
        () => {
          assert(fileExistsAndCleanup('index.js'));
          assert(fileExistsAndCleanup('index.mjs'));
          assert(fileExistsAndCleanup(HTML_FILE_PREFIX + 'es.html'));
          assert(fileExistsAndCleanup(HTML_FILE_PREFIX + 'umd.html'));
          assert(fileExistsAndCleanup(COMPONENT_NAME + '.svelte'));
          assert(fileExistsAndCleanup("package.json"));
        }
    )
  })
});