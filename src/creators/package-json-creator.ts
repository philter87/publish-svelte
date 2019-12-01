import { writeFileSync } from 'fs'
import { join } from 'path'
import {INDEX_ES, INDEX_UMD} from "../constants";
import {PubsOptions} from "../pubs-options";

export function generatePackageObject(opts: PubsOptions){
  var packageJson: any = {};
  packageJson.name = opts.packageName;
  packageJson.version = opts.packageVersion;
  packageJson.svelte = opts.componentName+".svelte";
  packageJson.main = INDEX_UMD;
  packageJson.module = INDEX_ES;
  return packageJson;
}

export function createPackageFile(opts: PubsOptions) {
  const json = generatePackageObject(opts);
  const jsonPretty = JSON.stringify(json, null, 2);
  writeFileSync(join(opts.outputDir, "package.json"), jsonPretty)
}
