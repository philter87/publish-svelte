import {join, parse} from 'path';
import {copyFileSync} from 'fs';
import {OutputOptions, rollup} from "rollup";
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import {INDEX_ES, INDEX_UMD} from "./constants";
import {createHtmlExamples} from './creators/html-creator'
import {mergeOptions, PubsOptions} from "./pubs-options";
import {createPackageFile} from "./creators/package-json-creator";
import {createReadmeFiles, extractPubsOptionsFromReadmeFile, getReadmeFileNameFromOpts} from "./creators/readme-creator";
import {cleanUp} from "./clean-up";
import {publish} from "./npm-publish";

export function pubs(cmdOptions: Partial<PubsOptions>) {
  if (!cmdOptions.srcFile) {
    console.log("A svelte source file is required. Example: pubs MySvelteComponent.svelte");
    return;
  }
  const opts = mergeOptions(cmdOptions);
  const inputOptionsRollup = {
    input: opts.srcFile,
    plugins: [svelte(), resolve()]
  };

  const outputOptionsRollup: OutputOptions[] = [
    {format: 'umd', name: opts.componentName, file: join(opts.outputDir, INDEX_UMD)},
    {format: 'es', file: join(opts.outputDir, INDEX_ES)}
  ];

  return rollup(inputOptionsRollup)
    .then(bundle => Promise.all(outputOptionsRollup.map(output => bundle.write(output))))
    .then(() => createHtmlExamples(opts, outputOptionsRollup))
    .then(() => copyFileSync(opts.srcFile, join(opts.outputDir, opts.componentName + '.svelte')))
    .then(() => createPackageFile(opts))
    .then(() => createReadmeFiles(opts))
    .then(() => publish(opts))
    .then(() => cleanUp(opts))
    .catch(d => console.log("Error", d));
}
