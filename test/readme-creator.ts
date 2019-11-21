import {
  createReadmeFiles,
  deleteReadmeVersionFile,
  getReadmeFileName,
  parseOptionsFromReadmeFile, README_FILENAME
} from "../src/creators/readme-creator";
import {join, parse} from 'path';
import {unlinkSync, rmdirSync} from 'fs';
import assert from 'assert';
import {PubsOptions} from "../src/pubs-options";


const componentName = 'TestSvelteComponent';
const componentDir = join(__dirname, 'components');
const outputDirectory = join(componentDir, componentName);
const srcFile = join(outputDirectory + '.svelte');
const packageName = 'test-svelte-package';
const packageVersion = '0.0.1';

function cleanUpMdFiles(opts: PubsOptions){
  unlinkSync(join(opts.outputDirectory, README_FILENAME));
  rmdirSync(opts.outputDirectory);
  deleteReadmeVersionFile(opts)
}

describe('readme creator', () => {
  it('is file created', () => {
    let opts: PubsOptions = {srcFile, packageName, packageVersion, componentName, outputDirectory};
    createReadmeFiles(opts);
    cleanUpMdFiles(opts);
  })
});


const NAME = 'ReadmeTestComponentName';
const VERSION = '0.0.1';
const PACKAGE_NAME = 'readme-test-package';
describe('readme file parser', () => {
  it('Component Name from file name', () => {
    let opts = parseOptionsFromReadmeFile(join('.','test',  NAME + '-v' + VERSION + '.md'));
    assert(opts.packageVersion === VERSION);
    assert(opts.componentName === NAME);
    assert(opts.packageName === PACKAGE_NAME );
  })
});
