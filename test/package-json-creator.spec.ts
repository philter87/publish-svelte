import {INDEX_ES, INDEX_UMD} from "../src/constants";
import assert from 'assert';
import {generatePackageObject} from "../src/creators/package-json-creator";

describe('packageJsonCreator', () => {
    it('generateJson', () => {
        const componentName = "MySvelteComponentTest";
        const packageName = 'my-svelte-component-test';
        const packageJson = generatePackageObject({srcFile: '', componentName, packageName});
        assert.equal(packageJson['svelte'], componentName + ".svelte");
        assert.equal(packageJson['main'], INDEX_UMD);
        assert.equal(packageJson['module'], INDEX_ES);
        assert.equal(packageJson['name'], packageName);
    })
});
