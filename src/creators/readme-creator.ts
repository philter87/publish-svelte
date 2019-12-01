import {readTemplate} from "./templates/template-reader";
import {PubsOptions} from "../pubs-options";
import {join, parse} from "path";
import {writeFileSync, mkdirSync, existsSync, readFileSync, unlinkSync} from "fs";

export const README_FILENAME = 'README.md';

export function deleteReadmeVersionFile(opts: PubsOptions){
  unlinkSync(join(parse(opts.srcFile).dir, getReadmeFileNameFromOpts(opts)))
}

export function createReadmeFiles(opts: PubsOptions){
  const readMeString = createReadmeString(opts.componentName, opts.packageName, opts.packageVersion);
  const srcDir = parse(opts.srcFile).dir;
  if (!existsSync(opts.outputDir)){
    mkdirSync(opts.outputDir);
  }
  writeFileSync(join(opts.outputDir, README_FILENAME), readMeString);
  writeFileSync(join(srcDir, getReadmeFileNameFromOpts(opts)), readMeString);
}

export function getReadmeFileNameFromOpts(opts: PubsOptions){
  return getReadmeFileName(opts.srcFile);
}

export function getReadmeFileName(srcFile: string){
  return parse(srcFile).name + ".md";
}

export function createReadmeString(componentName: string, packageName: string, packageVersion: string){
  return readTemplate('readme-template.md')
    .replace(/{PACKAGE_VERSION}/g, packageVersion)
    .replace(/{PACKAGE_NAME}/g, packageName)
    .replace(/{COMPONENT_NAME}/g, componentName);
}

function extractPackageNameFromFile(readmeFilePath: string) {
  const fileContent: string = readFileSync(readmeFilePath, {encoding: 'utf8'});
  const firstLine = fileContent.split('\n')[0];
  return firstLine.replace('#', '').trim();
}

export function extractPubsOptionsFromReadmeFile(readmeFilePath: string): Partial<PubsOptions> {
  if(!existsSync(readmeFilePath)) return {};

  const content: string = readFileSync(readmeFilePath, {encoding: 'utf8'});
  return {
    srcFile: '',
    componentName: /componentName:(.*)\)/g.exec(content)[1],
    packageVersion: /packageVersion:(.*)\)/g.exec(content)[1],
    packageName: /packageName:(.*)\)/g.exec(content)[1],
  }
}

export function parseOptionsFromReadmeFile(readmeFilePath: string): PubsOptions{
  const fileInfo = parse(readmeFilePath);
  const words = fileInfo.name.split('-v');
  const componentName = words[0];
  const packageVersion = words[1];
  const packageName = extractPackageNameFromFile(readmeFilePath);
  return {srcFile: '', componentName, packageVersion, packageName};
}
