import {PelteOptions} from "./pelte-options";
import {copyFileSync, mkdirSync} from "fs";
import {join, parse, relative} from "path";

function isSvelteDependency(f, srcComponentFile) {
  const parsed = parse(f);
  return parsed.ext === '.svelte' && parsed.name !== srcComponentFile;

}

export function findNestedSvelteComponents(opts:PelteOptions) {
  const srcComponentFile = parse(opts.srcFile).name;
  if(opts.watchFiles) {
    return opts.watchFiles.filter( f => isSvelteDependency(f, srcComponentFile));
  } else {
    return []
  }
}

export function copySvelteFiles(opts: PelteOptions) {
  const targetSvelteFile = join(opts.outputDir, opts.componentName + '.svelte');
  copyFileSync(opts.srcFile, targetSvelteFile);
  const srcDir = parse(opts.srcFile).dir;
  const nestedSvelteComponents = findNestedSvelteComponents(opts);

  nestedSvelteComponents.forEach( svelteDependency => {
    let parsed = parse(svelteDependency);
    const relativeDir = relative(srcDir, parsed.dir);
    if(relativeDir.startsWith('..')) {
      console.error('The component "' + parse(opts.srcFile).base + '" depends on "' + parsed.base + '". This is not allowed. "' + parsed.base + '" must be located in the same folder or in a child folder. The javascript modules will work, but another svelte project will not be able to use this bundle');
    } else {
      mkdirSync(join(opts.outputDir, relativeDir), {recursive: true});
      const target = join(opts.outputDir, relativeDir, parsed.base);
      copyFileSync(svelteDependency, target)
    }
  })
}
