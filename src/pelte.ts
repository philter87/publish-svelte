import {join } from 'path';
import {OutputOptions, rollup} from "rollup";
import svelte from 'rollup-plugin-svelte';
import {INDEX_ES, INDEX_UMD} from "./constants";
import {createHtmlExamples} from './creators/html-creator'
import {mergeOptions, PelteOptions } from "./pelte-options";
import {createPackageFile} from "./creators/package-json-creator";
import {createReadmeFiles } from "./creators/readme-creator";
import {cleanUp} from "./clean-up";
import {publish} from "./npm-publish";
import {copySvelteFiles} from "./svelte-copier";
import {createTsConfig} from "./creators/ts-config-creator";
import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
// import typescript from '@rollup/plugin-typescript';

export function parseOptions(cmdOptions: Partial<PelteOptions>) {
  const opts = mergeOptions(cmdOptions);

  const inputOptionsRollup = {
    input: opts.srcFile,
    plugins: [
        svelte({
          customElement: opts.webComponentInfo.exists,
          preprocess: sveltePreprocess(),
        }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      // typescript({sourceMap: false}),
    ]
  };

  const rollupWriteOpts: OutputOptions[] = [
    {format: 'umd', name: opts.componentName, file: join(opts.outputDir, INDEX_UMD), sourcemap: false},
    {format: 'es', file: join(opts.outputDir, INDEX_ES), sourcemap: false}
  ];

  return {
    opts,
    inputOptionsRollup,
    rollupWriteOpts
  }
}

export async function generate(cmdOptions: Partial<PelteOptions>) {
  const { inputOptionsRollup, rollupWriteOpts } = parseOptions(cmdOptions);

  const bundle = await rollup(inputOptionsRollup)
  return Promise.all(rollupWriteOpts.map(async writeOpts => ({
    options: writeOpts,
    bundle: await bundle.generate(writeOpts)
  })))
}

export function pelte(cmdOptions: Partial<PelteOptions>) {
  const { opts, inputOptionsRollup, rollupWriteOpts } = parseOptions(cmdOptions);

  createTsConfig(opts);
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
    .then(() => cleanUp(opts))
}
