import {join } from 'path';
import {OutputOptions, rollup} from "rollup";
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import {INDEX_ES, INDEX_UMD} from "./constants";
import {createHtmlExamples} from './creators/html-creator'
import {mergeOptions, PelteOptions } from "./pelte-options";
import {createPackageFile} from "./creators/package-json-creator";
import {createReadmeFiles } from "./creators/readme-creator";
import {cleanUp} from "./clean-up";
import {publish} from "./npm-publish";
import commonjs from "rollup-plugin-commonjs";
import {copySvelteFiles} from "./svelte-copier";
import { red } from 'kleur';

export function pelte(cmdOptions: Partial<PelteOptions>) {
  if (!cmdOptions.srcFile) {
    console.log(red('You must supply a svelte source file. Example: "pelte MySvelteComponent.svelte"'));
    return;
  }
  const opts = mergeOptions(cmdOptions);

  const inputOptionsRollup = {
    input: opts.srcFile,
    plugins: [svelte({customElement: opts.webComponentInfo.exists}), resolve(), commonjs()]
  };

  const rollupWriteOpts: OutputOptions[] = [
    {format: 'umd', name: opts.componentName, file: join(opts.outputDir, INDEX_UMD)},
    {format: 'es', file: join(opts.outputDir, INDEX_ES)}
  ];


  createPackageFile(opts);
  createReadmeFiles(opts);
  if(opts.init) {
    return;
  }
  return rollup(inputOptionsRollup)
    .then(bundle => {
      opts.watchFiles = bundle.watchFiles;
      return Promise.all(rollupWriteOpts.map(output => bundle.write(output)))
    })
    .then(() => createHtmlExamples(opts, rollupWriteOpts))
    .then(() => copySvelteFiles(opts))
    .then(() => publish(opts))
    .then(() => cleanUp(opts));
}
