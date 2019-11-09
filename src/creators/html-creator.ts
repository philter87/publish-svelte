import fs from "fs";
import path, {join} from "path";
import {readTemplate} from "./templates/template-reader";

export const HTML_FILE_PREFIX = 'index-example-';

export function createHtmlExamples(componentName, outputOptions) {
  return outputOptions.map(outputOption => write(componentName, outputOption));
}

function write(componentName, outputOption) {
  const format = outputOption.format;
  const outputPath = path.dirname(outputOption.file);
  const filePath = path.join(outputPath, `${HTML_FILE_PREFIX}${format}.html`);
  let html = generateHtmlAsString(componentName, format);
  fs.writeFileSync(filePath, html);
  return html;
}

export function generateHtmlAsString(componentName, format) {
  if (format === 'es') {
    return createEsModuleHtmlExample(componentName);
  } else if (format === 'umd') {
    return createUmdModuleHtmlExample(componentName);
  } else {
    throw Error('Format is not handled correct: ' + format);
  }
}

function createEsModuleHtmlExample(componentName) {
  const esTemplate = readTemplate('index-example-es.html');
  const importLine = `import ${componentName} from './index.mjs'`;
  const createLine = `new ${componentName}({target:document.body})`;
  return esTemplate.replace('{IMPORT_STATEMENT}', importLine).replace('{NEW_COMPONENT_STATEMENT}', createLine)
}

function createUmdModuleHtmlExample(componentName) {
  const umdTemplate = readTemplate('index-example-umd.html');
  const createLine = `new ${componentName}({target:document.body})`;
  return umdTemplate.replace('{NEW_COMPONENT_STATEMENT}', createLine);
}
