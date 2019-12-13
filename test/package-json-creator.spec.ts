import {INDEX_ES, INDEX_UMD} from "../src/constants";
import assert from 'assert';
import {extractPelteOptionsFromJsonPath, generatePackageObject} from "../src/creators/package-json-creator";
import { join } from "path";

describe('packageJsonCreator', () => {
    it('generateJson', () => {
        const componentName = "MySvelteComponentTest";
        const packageName = 'my-svelte-component-test';
        const packageJson = generatePackageObject({srcFile: '', componentName, packageName});
        assert.equal(packageJson['svelte'], componentName + ".svelte");
        assert.equal(packageJson['main'], INDEX_UMD);
        assert.equal(packageJson['module'], INDEX_ES);
        assert.equal(packageJson['name'], packageName);
    });
    it('read pelte options', () => {
       const pelteOptions = extractPelteOptionsFromJsonPath(join('test','SimpleSvelteComponent.json'));
       assert.equal(pelteOptions.packageName, 'pelte-simple-svelte-component');
       assert.equal(pelteOptions.componentName, 'SimpleSvelteComponent');
       assert.equal(pelteOptions.packageVersion, '0.0.5')
    })
});
