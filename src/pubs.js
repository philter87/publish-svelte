const rollup = require('rollup');
const svelte = require('rollup-plugin-svelte');
const resolve = require('rollup-plugin-node-resolve');
const path = require('path');
const fs = require('fs');
const htmlCreator = require('./html-creator');
const packageJsonCreator = require('./package-json-creator');
const constants = require('./pubs-constants');
const optionUtils = require('./option-utils');

module.exports = function pubs(pubsOptions) {
  pubsOptions = optionUtils(pubsOptions);
  const pathComponent = pubsOptions.srcPath;
  const file = path.parse(pathComponent);
  const componentName = file.name;
  const outputPath = path.join(file.dir, componentName);

  const inputOptionsRollup = {
    input: pathComponent,
    plugins: [svelte(), resolve()]
  };

  const outputOptionsRollup = [
    {format: 'umd', name: componentName, file: path.join(outputPath, constants.INDEX_UMD)},
    {format: 'es', file: path.join(outputPath, constants.INDEX_ES)}
  ];

  return rollup.rollup(inputOptionsRollup)
      .then( bundle => Promise.all(outputOptionsRollup.map( output => bundle.write(output))))
      .then( () => htmlCreator.writeAll(componentName, outputOptionsRollup))
      .then( () => fs.copyFileSync(pathComponent, path.join(outputPath, file.base)))
      .then( () => packageJsonCreator.write(componentName, outputPath))
      .catch(d => console.log("Error", d));
};