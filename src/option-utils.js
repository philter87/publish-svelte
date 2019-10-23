const path = require('path');

module.exports = function defaultPubsOptions(opts){
  if(!opts.srcPath) {
    throw Error('srcPath is a required field')
  }
  var srcFile = path.parse(opts.srcPath);
  return {
    srcPath: opts.srcPath,
    outputDirectory: opts.outputDirectory | srcFile.dir,
  }
};