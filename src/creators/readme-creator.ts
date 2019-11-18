import {readTemplate} from "./templates/template-reader";
import {PubsOptions} from "../pubs-options";
import {join, parse} from "path";
import {writeFileSync, mkdirSync, existsSync, readFileSync} from "fs";


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
  return readTemplate('readme-template.md')
    .replace(/{PACKAGE_NAME}/g, packageName)
    .replace(/{COMPONENT_NAME}/g, componentName);
}

function extractPackageNameFromFile(readmeFilePath: string) {
  const fileContent: string = readFileSync(readmeFilePath, {encoding: 'utf8'});
  const firstLine = fileContent.split('\n')[0];
  return firstLine.replace('#', '').trim();
}

export function parseOptionsFromReadmeFile(readmeFilePath: string): PubsOptions{
  const fileInfo = parse(readmeFilePath);
  const words = fileInfo.name.split('-v');
  const componentName = words[0];
  const packageVersion = words[1];
  const packageName = extractPackageNameFromFile(readmeFilePath);
  return {srcFile: '', componentName, packageVersion, packageName};
}
