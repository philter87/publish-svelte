import {createReadmeFiles} from "../src/creators/readme-creator";
import {join} from 'path';


const componentName = 'TestSvelteComponent';
const outputDirectory = join(__dirname, 'components', componentName);
const srcFile = join(outputDirectory + '.svelte');
const packageName = 'test-svelte-package';
const packageVersion = '0.0.1';

describe('readme creator', () => {
  it('is file created', () => {
    createReadmeFiles({srcFile, packageName, packageVersion, componentName, outputDirectory})
  })
});
