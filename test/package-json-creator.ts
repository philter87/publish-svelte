import {INDEX_ES, INDEX_UMD} from "../src/constants";
import assert from 'assert';
import {generatePackageObject} from "../src/creators/package-json-creator";



describe('packageJsonCreator', () => {
    it('generateJson', () => {
        var componentName = "MySvelteComponentTest";
        var packageJson = generatePackageObject(componentName);
        assert(packageJson['svelte'] === componentName + ".svelte");
        assert(packageJson['main'] === INDEX_UMD);
        assert(packageJson['module'] === INDEX_ES);
    })
});
