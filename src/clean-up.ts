import {PubsOptions} from "./pubs-options";
import {HTML_FILE_PREFIX} from "./creators/html-creator";
import {join} from "path";
import {existsSync, rmdirSync, unlinkSync} from "fs";

function cleanUpFile(dir, file) {
  let filePath = join(dir, file);
  const exist = existsSync(filePath);
  if (exist) {
    unlinkSync(filePath);
  }
  return exist;
}

export function cleanUp(opts: PubsOptions) {
  let files = ['index.js', 'index.mjs', HTML_FILE_PREFIX + 'es.html', HTML_FILE_PREFIX + 'umd.html',
    opts.componentName + ".svelte", "package.json", "readme.md"];
  let exists = true;
  for (let file of files) {
    exists = exists && cleanUpFile(opts.outputDirectory, file)
  }
  rmdirSync(opts.outputDirectory);
  return exists;
}