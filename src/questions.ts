import prompts from 'prompts'
import {parseDefaultOptionsFromFileName, PelteOptions} from "./pelte-options";
import {green} from "kleur";
import {extractPelteOptionsFromJson} from "./creators/package-json-creator";
import {sayHello} from "./pelte-util";

function shouldWeSkipPublishToNpm(questions: any[], cliArguemnts: Partial<PelteOptions>) {
  if(cliArguemnts.skipPublish === undefined) {
    questions.push({
      type: 'text',
      name: 'skipPublish',
      message: 'Skip publish to npm the first time (y/n)?',
      initial: 'y',
      format: (s: string) => { return s.startsWith('y') || s.startsWith('Y') || s.toLocaleLowerCase() === 'yes' }
    })
  }
}

export function askQuestions(cliArguements: Partial<PelteOptions>): Promise<PelteOptions> {
  cliArguements = Object.assign(cliArguements, extractPelteOptionsFromJson(cliArguements));
  const defaultOpts = parseDefaultOptionsFromFileName(cliArguements.srcFile);
  const questions = [];
  if(!cliArguements.packageName) {
    questions.push({
      type: 'text',
      name: 'packageName',
      message: 'Package Name',
      initial: defaultOpts.packageName
    })
  }
  if(!cliArguements.packageVersion) {
    questions.push({
      type: 'text',
      name: 'packageVersion',
      message: 'Package Version',
      initial: defaultOpts.packageVersion
    })
  }
  if(questions.length > 0) {
    sayHello();
    console.log(green('I need a name and a version: '));
    console.log(green('(Press enter if you like my suggestions)'));
    console.log();
    shouldWeSkipPublishToNpm(questions, cliArguements);
  }
  return prompts(questions).then( answers => Object.assign(cliArguements, answers));
}
