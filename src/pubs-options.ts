import {join, parse} from "path";
import {
  extractPubsOptionsFromReadmeFile,
  getReadmeFileName
} from "./creators/readme-creator";

export interface PubsOptions {
  srcFile: string;
  keepBundle?: boolean;
  skipPublish?: boolean;
  outputDir?: string;
  packageName?: string;
  packageVersion?: string;
  componentName?: string;
  patch?: boolean;
  minor?: boolean;
  major?: boolean;
}

export const DEFAULT_INIT_VERSION = '0.0.1';

export function mergeOptions(cliArguments: Partial<PubsOptions>): PubsOptions {
  const defaultOpts = parseDefaultOptionsFromFileName(cliArguments.srcFile);
  const mdOpts = extractPubsOptionsFromReadmeFile(getReadmeFileName(cliArguments.srcFile));
  return {...defaultOpts, ...mdOpts, ...cliArguments};
}

export function incrementVersion(opts: PubsOptions){
  if(opts.patch || opts.minor || opts.major) {
    const versions = opts.packageVersion.split(".");
    let patch = opts.patch ? parseInt(versions[0])+1 : versions[0];
    let minor = opts.minor ? parseInt(versions[1])+1 : versions[1];
    let major = opts.major ? parseInt(versions[2])+1 : versions[2];
    opts.packageVersion = `${major}.${minor}.${patch}`;
  }
  return opts;
}

export function parseDefaultOptionsFromFileName(srcFile: string): PubsOptions {
  let parsed = parse(srcFile);
  return {
    srcFile: srcFile,
    keepBundle: false,
    skipPublish: false,
    outputDir: join(parsed.dir, parsed.name),
    componentName: parsed.name,
    packageName: 'pubs-' + toKebabCase(parsed.name),
    packageVersion: DEFAULT_INIT_VERSION
  }
}

function toKebabCase(camelCase: string){
  return camelCase.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
