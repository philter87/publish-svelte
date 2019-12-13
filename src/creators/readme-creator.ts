import {PelteOptions} from "../pelte-options";
import {join } from "path";
import {writeFileSync, existsSync, unlinkSync} from "fs";
import {README_MD} from "./templates";
import {changeExtension, createDir, readFileUtf8} from "../pelte-util";

export const README_FILENAME = 'README.md';

export function deleteReadmeVersionFile(opts: PelteOptions){
  unlinkSync(changeExtension(opts.srcFile, 'md'));
}

export function createReadmeFiles(opts: PelteOptions){
  const readMeFile = changeExtension(opts.srcFile, 'md');
  const mdExists = existsSync(join(readMeFile));
  const readMeString = mdExists ?
    readFileUtf8(readMeFile) :
    README_MD;

  createDir(opts);
  if(!opts.init) {
    writeFileSync(join(opts.outputDir, README_FILENAME), readMeString);
  }
  writeFileSync(changeExtension(opts.srcFile, 'md'), readMeString);
}
