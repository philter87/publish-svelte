import commander = require("commander");
import {PubsOptions} from "./pubs-options";
var pjson = require('../package.json');

commander
  .version(pjson.version)
  .option('--keep', 'Keep the compiled files')
  .option('--dry-run', 'Run without publishing to npm')
  .option('--package-version <type>', 'Set package version. Default from  md file if exists')
  .option('--package-name <type>', 'Set package name. Default from md file if exists')
  .option('-n, --component-name <type>', 'Component name. Default name of svelte file')
  .option('-o, --output-dir <type>', 'The output directory of the compiled component');

function removeUndefined(opts) {
  Object.keys(opts).forEach(key => opts[key] === undefined ? delete opts[key] : '');
  return opts;
}

export function parseArguments(processArgv: string[]): Partial<PubsOptions> {
  const parsed = commander.parse(processArgv);
  let opts = removeUndefined(parsed.opts());
  return Object.assign({srcFile: parsed.args[0]}, opts);
}
