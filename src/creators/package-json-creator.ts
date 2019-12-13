import {existsSync, writeFileSync} from 'fs'
import {join, parse} from 'path'
import {INDEX_ES, INDEX_UMD} from "../constants";
import {PelteOptions} from "../pelte-options";
import {changeExtension, createDir, readFileUtf8} from "../pelte-util";

export interface PackageLike {
  name: string;
  version: string;
  svelte: string;
  main: string;
  module: string;
}

export function generatePackageObject(opts: PelteOptions): PackageLike{
  return {
    name: opts.packageName,
    version: opts.packageVersion,
    svelte: opts.componentName+".svelte",
    main: INDEX_UMD,
    module: INDEX_ES
  };
}

export function createPackageFile(opts: PelteOptions) {
  const json = generatePackageObject(opts);
  const jsonPretty = JSON.stringify(json, null, 2);

  createDir(opts);
  writeFileSync(changeExtension(opts.srcFile, 'json'), jsonPretty);
  if(!opts.init) {
    writeFileSync(join(opts.outputDir, "package.json"), jsonPretty);
  }
}

export function extractPelteOptionsFromJson(pelteOptions: Partial<PelteOptions>) {
  return extractPelteOptionsFromJsonPath(changeExtension(pelteOptions.srcFile, 'json'))
}

export function extractPelteOptionsFromJsonPath(jsonPath: string): Partial<PelteOptions> {
  if(!existsSync(jsonPath)) return {};
  let json: PackageLike = JSON.parse(readFileUtf8(jsonPath));
  return {
    packageName: json.name,
    packageVersion: json.version,
    componentName: parse(json.svelte).name,
  }
}
