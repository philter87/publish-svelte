import {PubsOptions} from "./pubs-options";
import {existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync} from "fs";

export function deleteFolderRecursive(path: string) {
  var files = [];
  if( existsSync(path) ) {
    files = readdirSync(path);
    files.forEach(function(file,index){
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

export function cleanUp(opts: PubsOptions) {
  if(opts.keepBundle) { return }
  //let files = ['index.js', 'index.mjs', opts.componentName + ".svelte", "package.json", "README.md"];
  deleteFolderRecursive(opts.outputDir);
}
