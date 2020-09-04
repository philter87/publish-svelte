import {PelteOptions} from "../pelte-options";
import {writeFileSync} from "fs";
import {dirname, join} from "path";
import {createDir} from "../pelte-util";
const TS_CONFIG_FILE = `
{
  "extends": "@tsconfig/svelte/tsconfig.json",

  "include": ["src/**/*"],
  "exclude": ["node_modules/*", "__sapper__/*", "public/*"],
}
`

export const TS_CONFIG_NAME = "tsconfig.json";

export function createTsConfig(opts: PelteOptions) {
    createDir(opts);
    if(!opts.init) {
        writeFileSync(join(opts.outputDir, TS_CONFIG_NAME), TS_CONFIG_FILE);
        writeFileSync(getTsConfigPath(opts), TS_CONFIG_FILE);
    }
}

export function getTsConfigPath(opts: PelteOptions) {
    const folderPath = dirname(opts.srcFile)
    return join(folderPath, TS_CONFIG_NAME);
}