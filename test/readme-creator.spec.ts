import {
  createReadmeFiles,
  deleteReadmeVersionFile, extractPubsOptionsFromReadmeFile,
  README_FILENAME
} from "../src/creators/readme-creator";
import {join} from 'path';
import {unlinkSync, rmdirSync, readFileSync} from 'fs';
import assert from 'assert';
import {PubsOptions} from "../src/pubs-options";

const componentName = 'TestSvelteComponent';
const componentDir = join(__dirname, 'components');
const outputDirectory = join(componentDir, componentName);
const srcFile = join(outputDirectory + '.svelte');
const packageName = 'test-svelte-package';
const packageVersion = '0.0.1';
const pubsOpts = {srcFile, componentName, packageName, packageVersion, outputDir: outputDirectory};

function cleanUpMdFiles(opts: PubsOptions){
  unlinkSync(join(opts.outputDir, README_FILENAME));
  rmdirSync(opts.outputDir);
}

describe('readme creator', () => {
  it('is file created', () => {
    createReadmeFiles(pubsOpts);
    cleanUpMdFiles(pubsOpts);
    deleteReadmeVersionFile(pubsOpts)
  });
});

const componentName1 = 'SimpleSvelteComponent';
export const PACKAGE_VERSION = '0.1.5';
const PACKAGE_NAME = 'simple-svelte-component';
describe('readme file parser', () => {
  it('PubsOptions from readme file', () => {
    let opts = extractPubsOptionsFromReadmeFile(join('.','test',  componentName1 + '.md'));
    assert(opts.packageVersion === PACKAGE_VERSION);
    assert(opts.componentName === componentName1);
    assert(opts.packageName === PACKAGE_NAME );
  });
  it('Use existing md file instead of creating a new', () => {
    let opts: PubsOptions = {
      srcFile: join(__dirname, componentName1 + '.svelte'),
      componentName: componentName1,
      packageName: PACKAGE_NAME,
      packageVersion: PACKAGE_VERSION,
      outputDir: join(__dirname, componentName1)};
    createReadmeFiles(opts);
    const content = readFileSync(join(opts.outputDir, README_FILENAME), {encoding: 'utf8'});
    assert(content.includes("RANDOM STRING TO VERIFY"));
    cleanUpMdFiles(opts);
  })
});
