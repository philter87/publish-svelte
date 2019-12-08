import {join } from 'path';
import {OutputOptions, rollup} from "rollup";
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import {INDEX_ES, INDEX_UMD} from "./constants";
import {createHtmlExamples} from './creators/html-creator'
import {mergeOptions, PubsOptions, PubsStats} from "./pubs-options";
import {createPackageFile} from "./creators/package-json-creator";
import {createReadmeFiles, extractPubsOptionsFromReadmeFile, getReadmeFileNameFromOpts} from "./creators/readme-creator";
import {cleanUp} from "./clean-up";
import {publish} from "./npm-publish";
import {findNestedSvelteComponents} from "./dependency-analysor";
import commonjs from "rollup-plugin-commonjs";
import {copySvelteFiles} from "./svelte-copier";

export function pubs(cmdOptions: Partial<PubsOptions>) {
  if (!cmdOptions.srcFile) {
    console.log("You must supply a svelte source file. Example: \"pubs MySvelteComponent.svelte\", or use \"pubs --help\"");
    return;
  }
  const opts = mergeOptions(cmdOptions);
  const inputOptionsRollup = {
    input: opts.srcFile,
    plugins: [svelte(), resolve(), commonjs()]
  };

  const rollupWriteOpts: OutputOptions[] = [
    {format: 'umd', name: opts.componentName, file: join(opts.outputDir, INDEX_UMD)},
    {format: 'es', file: join(opts.outputDir, INDEX_ES)}
  ];

  return rollup(inputOptionsRollup)
    .then(bundle => {
      opts.watchFiles = bundle.watchFiles;
      Promise.all(rollupWriteOpts.map(output => bundle.write(output)))
    })
    .then(() => createHtmlExamples(opts, rollupWriteOpts))
    .then(() => copySvelteFiles(opts))
    .then(() => createPackageFile(opts))
    .then(() => createReadmeFiles(opts))
    .then(() => publish(opts))
    .then(() => cleanUp(opts))
    .catch(d => console.log("Error", d));
}
