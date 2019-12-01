

import {readTemplate} from "./templates/template-reader";
import {dirname, join} from "path";
import {writeFileSync} from "fs";
import {PubsOptions} from "../pubs-options";

export const HTML_FILE_PREFIX = 'index-example-';

export function createHtmlExamples(opts: PubsOptions, outputOptions) {
  return outputOptions.map(outputOption => write(opts, outputOption));
}

function write(opts: PubsOptions, outputOption) {
  const format = outputOption.format;
  const outputPath = dirname(outputOption.file);
  const filePath = join(outputPath, `${HTML_FILE_PREFIX}${format}.html`);
  let html = generateHtmlAsString(opts, format);
  writeFileSync(filePath, html);
  return html;
}

export function generateHtmlAsString(opts: PubsOptions, format) {
  if (format === 'es') {
    return createEsModuleHtmlExample(opts);
  } else if (format === 'umd') {
    return createUmdModuleHtmlExample(opts);
  } else {
    throw Error('Format is not handled correct: ' + format);
  }
}

function createEsModuleHtmlExample(opts: PubsOptions) {
  const esTemplate = readTemplate('index-example-es.html');
  const importLine = `import ${opts.componentName} from './index.mjs'`;
  const createLine = `new ${opts.componentName}({target:document.body})`;
  return replaceTemplateWith(esTemplate, importLine, createLine);
}

function replaceTemplateWith(umdTemplate, importLine: string, createLine: string) {
  return umdTemplate
    .replace('{IMPORT_STATEMENT}', importLine)
    .replace('{NEW_COMPONENT_STATEMENT}', createLine);
}

function createUmdModuleHtmlExample(opts: PubsOptions) {
  const umdTemplate = readTemplate('index-example-umd.html');
  const importLine = `<script src="./index.js"></script>`
  const createLine = `new ${opts.componentName}({target:document.body})`;
  return replaceTemplateWith(umdTemplate, importLine, createLine);
}
