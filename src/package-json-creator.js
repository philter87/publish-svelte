const fs = require('fs');
const constants = require('./pubs-constants');
const path = require('path');

function createPackageJson(componentName){
  var packageJson = {};
  packageJson.name = componentName;
  packageJson.version = "0.0.1";
  packageJson.svelte = componentName+".svelte";
  packageJson.main = constants.INDEX_UMD;
  packageJson.module = constants.INDEX_ES;
  return packageJson;
};

module.exports.generate = createPackageJson;

module.exports.write = function (componentName, outputPath) {
  var json = createPackageJson(componentName, outputPath);
  var jsonPretty = JSON.stringify(json, null, 2);
  fs.writeFileSync(path.join(outputPath, "package.json"), jsonPretty)
}