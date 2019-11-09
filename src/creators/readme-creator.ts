import {readTemplate} from "./templates/template-reader";
import {PubsOptions} from "../pubs-options";
import {join, parse} from "path";
import {writeFileSync, mkdir, mkdirSync, existsSync} from "fs";

export function createReadmeFiles(opts: PubsOptions){
  const readMeString = createReadmeString(opts.componentName, opts.packageName);
  const srcDir = parse(opts.srcFile).dir;
  if (!existsSync(opts.outputDirectory)){
    mkdirSync(opts.outputDirectory);
  }
  writeFileSync(join(opts.outputDirectory, "readme.md"), readMeString);
  writeFileSync(join(srcDir, getReadmeFileName(opts)), readMeString);
}

export function getReadmeFileName(opts: PubsOptions){
  return opts.componentName + "-v"+ opts.packageVersion + ".md";
}

export function createReadmeString(componentName: string, packageName: string){
  const readMeTemplate = readTemplate('readme-template.md')
    .replace('{PACKAGE_NAME}', packageName)
    .replace('{COMPONENT_NAME}', componentName);
  return readMeTemplate
}
