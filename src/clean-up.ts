import {PelteOptions} from "./pelte-options";
import {existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync} from "fs";
import {getTsConfigPath} from "./creators/ts-config-creator";

export function deleteFolderRecursive(path: string) {
  var files = [];
  if( existsSync(path) ) {
    files = readdirSync(path);
    files.forEach(function(file){
      var curPath = path + "/" + file;
      if(lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
  }
}

export function cleanUp(opts: PelteOptions) {
  if(opts.keepBundle) { return }
  //let files = ['index.js', 'index.mjs', opts.componentName + ".svelte", "package.json", "README.md"];
  deleteFolderRecursive(opts.outputDir);
  unlinkSync(getTsConfigPath(opts))
}
