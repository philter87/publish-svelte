import commander = require("commander");
import {PelteOptions} from "./pelte-options";
var pjson = require('../package.json');

commander
  .version(pjson.version)
  .option('--init', 'Initialize the component. The will create a md file and json file next to the Svelte source file where you can adjust settings like package name and version')
  .option('-k, --keep-bundle', 'Skip clean up of bundle')
  .option('-s, --skip-publish', 'Skip publish of bundle')
  .option('--package-version <type>', 'Set package version. Default from  md file if exists')
  .option('--package-name <type>', 'Set package name. Default from md file if exists')
  .option('-n, --component-name <type>', 'Component name. Default name of svelte file')
  .option('-o, --output-dir <type>', 'The output directory of the compiled component')
  .option('--custom-element', 'Compile as web components. pelte will automatically enable this flag if it sees a svelte:options tag="my-element"')
  .option('--patch', 'increment patch version number. Ex: 1.0.0 -> 1.0.1')
  .option('--minor', 'increment version number. Ex: 1.0.0 -> 1.1.0')
  .option('--major', 'increment version number. Ex: 1.0.0 -> 2.0.0');

function removeUndefined(opts) {
  Object.keys(opts).forEach(key => opts[key] === undefined ? delete opts[key] : '');
  return opts;
}

export function parseArguments(processArgv: string[]): Partial<PelteOptions> {
  const parsed = commander.parse(processArgv);
  let opts = removeUndefined(parsed.opts());
  return Object.assign({srcFile: parsed.args[0]}, opts);
}
