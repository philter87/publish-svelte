import {join, parse} from 'path';
import {copyFileSync} from 'fs';
import {OutputOptions, rollup} from "rollup";
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import {INDEX_ES, INDEX_UMD} from "./constants";
import {createHtmlExamples} from './creators/html-creator'
import {initOptions, PubsOptions} from "./pubs-options";
import {createPackageFile} from "./creators/package-json-creator";
import {createReadmeFiles} from "./creators/readme-creator";
import {cleanUp} from "./clean-up";

export function pubs(pubsOptions: PubsOptions) {
  pubsOptions = initOptions(pubsOptions);
  const pathComponent = pubsOptions.srcFile;
  const file = parse(pathComponent);
  const componentName = file.name;
  const outputPath = join(file.dir, componentName);

  const inputOptionsRollup = {
    input: pathComponent,
    plugins: [svelte(), resolve()]
  };

  const outputOptionsRollup: OutputOptions[] = [
    {format: 'umd', name: componentName, file: join(outputPath, INDEX_UMD)},
    {format: 'es', file: join(outputPath, INDEX_ES)}
  ];

  return rollup(inputOptionsRollup)
    .then(bundle => Promise.all(outputOptionsRollup.map(output => bundle.write(output))))
    .then(() => createHtmlExamples(componentName, outputOptionsRollup))
    .then(() => copyFileSync(pathComponent, join(outputPath, file.base)))
    .then(() => createPackageFile(componentName, outputPath))
    .then(() => createReadmeFiles(pubsOptions))
    .then(() => cleanUp(pubsOptions))
    .catch(d => console.log("Error", d));
}
