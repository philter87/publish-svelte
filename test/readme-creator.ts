import {
  createReadmeFiles,
  deleteReadmeVersionFile, extractPubsOptionsFromReadmeFile,
  README_FILENAME
} from "../src/creators/readme-creator";
import {join} from 'path';
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
  unlinkSync(join(opts.outputDir, README_FILENAME));
  rmdirSync(opts.outputDir);
  deleteReadmeVersionFile(opts)
}

describe('readme creator', () => {
  it('is file created', () => {
    let opts: PubsOptions = {srcFile, packageName, packageVersion, componentName, outputDir: outputDirectory};
    createReadmeFiles(opts);
    cleanUpMdFiles(opts);
  })
});

const NAME = 'SimpleSvelteComponent';
export const PACKAGE_VERSION = '0.1.5';
const PACKAGE_NAME = 'simple-svelte-component';
describe('readme file parser', () => {
  it('PubsOptions from readme file', () => {
    let opts = extractPubsOptionsFromReadmeFile(join('.','test',  NAME + '.md'));
    assert(opts.packageVersion === PACKAGE_VERSION);
    assert(opts.componentName === NAME);
    assert(opts.packageName === PACKAGE_NAME );
  })
});
