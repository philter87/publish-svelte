import {PubsOptions} from "./pubs-options";
import {copyFileSync, mkdirSync} from "fs";
import {join, parse, relative} from "path";

function isSvelteDependency(f, srcComponentFile) {
  const parsed = parse(f);
  if (parsed.name === srcComponentFile) {
    return false;
  } else if (parsed.ext === '.svelte') {
    return true;
  }
  return false;
}

export function findNestedSvelteComponents(opts:PubsOptions) {
  const srcComponentFile = parse(opts.srcFile).name;
  if(opts.watchFiles) {
    return opts.watchFiles.filter( f => isSvelteDependency(f, srcComponentFile));
  } else {
    return []
  }
}

export function copySvelteFiles(opts: PubsOptions) {
  const targetSvelteFile = join(opts.outputDir, opts.componentName + '.svelte');
  copyFileSync(opts.srcFile, targetSvelteFile);
  //addBundleFile(opts, targetSvelteFile);
  const srcDir = parse(opts.srcFile).dir;
  const nestedSvelteComponents = findNestedSvelteComponents(opts);

  nestedSvelteComponents.forEach( svelteDependency => {
    let parsed = parse(svelteDependency);
    const relativeDir = relative(srcDir, parsed.dir);
    if(relativeDir.startsWith('..')) {
      console.error('The component "' + parse(opts.srcFile).base + '" depends on "' + parsed.base + '". This is not allowed. "' + parsed.base + '" must be located in the same folder or in a child folder ');
    } else {
      mkdirSync(join(opts.outputDir, relativeDir), {recursive: true});
      const target = join(opts.outputDir, relativeDir, parsed.base);
      copyFileSync(svelteDependency, target)
    }
  })
}
