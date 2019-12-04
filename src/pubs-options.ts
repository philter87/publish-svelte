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
}

export const DEFAULT_INIT_VERSION = '0.0.1';

export function mergeOptions(cliArguments: Partial<PubsOptions>): PubsOptions {
  if (!cliArguments.srcFile) {
    throw Error('srcFile is a required field')
  }
  const defaultOpts = parseDefaultOptionsFromFileName(cliArguments.srcFile);
  const mdOpts = extractPubsOptionsFromReadmeFile(getReadmeFileName(cliArguments.srcFile));
  return {...defaultOpts, ...mdOpts, ...cliArguments};
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
