import { writeFileSync } from 'fs'
import { join } from 'path'
import {INDEX_ES, INDEX_UMD} from "../constants";

export function generatePackageObject(componentName){
  var packageJson: any = {};
  packageJson.name = componentName;
  packageJson.version = "0.0.1";
  packageJson.svelte = componentName+".svelte";
  packageJson.main = INDEX_UMD;
  packageJson.module = INDEX_ES;
  return packageJson;
}

export function createPackageFile(componentName, outputPath) {
  const json = generatePackageObject(componentName);
  const jsonPretty = JSON.stringify(json, null, 2);
  writeFileSync(join(outputPath, "package.json"), jsonPretty)
}
