import {dirname, join} from "path";
import {writeFileSync} from "fs";
import {PubsOptions} from "../pubs-options";
import {INDEX_ES_HTML, INDEX_UMD_HTML} from "./templates";

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
  const importLine = `import ${opts.componentName} from './index.mjs'`;
  const createLine = `new ${opts.componentName}({target:document.body})`;
  return replaceTemplateWith(INDEX_ES_HTML, importLine, createLine);
}

function replaceTemplateWith(template, importLine: string, createLine: string) {
  return template
    .replace('{IMPORT_STATEMENT}', importLine)
    .replace('{NEW_COMPONENT_STATEMENT}', createLine);
}

function createUmdModuleHtmlExample(opts: PubsOptions) {
  const importLine = `<script src="./index.js"></script>`;
  const createLine = `new ${opts.componentName}({target:document.body})`;
  return replaceTemplateWith(INDEX_UMD_HTML, importLine, createLine);
}
