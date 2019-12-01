import assert from 'assert';
import {generateHtmlAsString} from "../src/creators/html-creator";
import {PubsOptions} from "../src/pubs-options";
const COMPONENT_NAME = "TestComponentName";
const PUBS_OPTIONS:PubsOptions = {srcFile: '', componentName: COMPONENT_NAME};

describe('htmlCreator', () => {
  describe('HTML with ES module', () => {
    it('should include component name', () => {
      let html = generateHtmlAsString(PUBS_OPTIONS, "es");
      assert(html.includes(COMPONENT_NAME))
    });

    it('should include type="module"', () => {
      let html = generateHtmlAsString(PUBS_OPTIONS, "es");
      assert(html.includes('type="module"'));
    });

    it('should include import statement', () => {
      let html = generateHtmlAsString(PUBS_OPTIONS, "es");
      assert(html.includes('import'));
    });
    it('should NOT include src=""', () => {
      let html = generateHtmlAsString(PUBS_OPTIONS, "es");
      assert(!html.includes('src="'));
    });
  });
  describe('HTML with UMD Module', () => {
    it('should include component name', () => {
      let html = generateHtmlAsString(PUBS_OPTIONS, "umd");
      assert(html.includes(COMPONENT_NAME))
    });

    it('should NOT include type="module"', () => {
      let html = generateHtmlAsString(PUBS_OPTIONS, "umd");
      assert(!html.includes('type="module"'));
    });

    it('should NOT include import statement', () => {
      let html = generateHtmlAsString(PUBS_OPTIONS, "umd");
      assert(!html.includes('import'));
    });

    it('should include src=""', () => {
      let html = generateHtmlAsString(PUBS_OPTIONS, "umd");
      assert(html.includes('src="'));
    });
  })
});
