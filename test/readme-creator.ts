import {createReadmeFiles, parseOptionsFromReadmeFile} from "../src/creators/readme-creator";
import {join} from 'path';
import assert from 'assert';
import {PubsOptions} from "../src/pubs-options";


const componentName = 'TestSvelteComponent';
const outputDirectory = join(__dirname, 'components', componentName);
const srcFile = join(outputDirectory + '.svelte');
const packageName = 'test-svelte-package';
const packageVersion = '0.0.1';

describe('readme creator', () => {
  it('is file created', () => {
    let opts: PubsOptions = {srcFile, packageName, packageVersion, componentName, outputDirectory};
    createReadmeFiles(opts);
  })
});


const NAME = 'ReadmeTestComponentName';
const VERSION = '0.0.1';
const PACKAGE_NAME = 'readme-test-package';
describe('readme file parser', () => {
  it('Component Name from file name', () => {
    let opts = parseOptionsFromReadmeFile('./test/' + NAME + '-v' + VERSION + '.md');
    assert(opts.packageVersion === VERSION);
    assert(opts.componentName === NAME);
    assert(opts.packageName === PACKAGE_NAME );
  })
});
