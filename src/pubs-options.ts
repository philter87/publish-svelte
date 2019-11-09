import {join, parse} from "path";

export interface PubsOptions {
  srcFile: string;
  outputDirectory?: string;
  packageName?: string;
  packageVersion?: string;
  componentName?: string;
}

export function initOptions(opts: PubsOptions): PubsOptions {
  if (!opts.srcFile) {
    throw Error('srcFile is a required field')
  }
  let parsed = parse(opts.srcFile);
  return {
    srcFile: opts.srcFile,
    outputDirectory: opts.outputDirectory || join(parsed.dir, parsed.name),
    componentName: opts.componentName || parsed.name,
    packageName: opts.packageName || toKebabCase(parsed.name),
    packageVersion: opts.packageVersion || "0.0.1"
  }
}

function toKebabCase(camelCase: string){
  return camelCase.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
