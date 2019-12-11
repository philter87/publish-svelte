import { writeFileSync } from 'fs'
import { join } from 'path'
import {INDEX_ES, INDEX_UMD} from "../constants";
import {PelteOptions} from "../pelte-options";

export function generatePackageObject(opts: PelteOptions){
  var packageJson: any = {};
  packageJson.name = opts.packageName;
  packageJson.version = opts.packageVersion;
  packageJson.svelte = opts.componentName+".svelte";
  packageJson.main = INDEX_UMD;
  packageJson.module = INDEX_ES;
  return packageJson;
}

export function createPackageFile(opts: PelteOptions) {
  const json = generatePackageObject(opts);
  const jsonPretty = JSON.stringify(json, null, 2);
  writeFileSync(join(opts.outputDir, "package.json"), jsonPretty)
}
