import {PubsOptions} from "./pubs-options";
import {HTML_FILE_PREFIX} from "./creators/html-creator";
import {join} from "path";
import {existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync} from "fs";

function cleanUpFilePath(filePath) {
  const exist = existsSync(filePath);
  if (exist) {
    unlinkSync(filePath);
  }
  return exist;
}

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
  if(opts.keepBundle) { return true }
  let files = ['index.js', 'index.mjs', HTML_FILE_PREFIX + 'es.html', HTML_FILE_PREFIX + 'umd.html',
    opts.componentName + ".svelte", "package.json", "README.md"];
  files = files.map( f => join(opts.outputDir, f));

  if(opts.watchFiles) {

  }
  let exists = true;
  for (let file of files) {
    exists = exists && cleanUpFilePath(file)
  }
  rmdirSync(opts.outputDir);
  return exists;
}
