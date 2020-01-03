import {join} from "path";
import {writeFileSync} from "fs";
import {PelteOptions} from "../pelte-options";
import {INDEX_CE_HTML, INDEX_ES_HTML, INDEX_UMD_HTML} from "./templates";
import {getCeName} from "./readme-utils";

export const HTML_FILE_PREFIX = 'index-example-';

export function createHtmlExamples(opts: PelteOptions, outputOptions) {
  // create custom element example
  if(opts.webComponentInfo && opts.webComponentInfo.exists) {
    write(opts, {format: 'ce'});
  }
  return outputOptions.map(outputOption => write(opts, outputOption));
}

function write(opts: PelteOptions, outputOption) {
  const format = outputOption.format;
  const filePath = join(opts.outputDir, `${HTML_FILE_PREFIX}${format}.html`);
  let html = generateHtmlAsString(opts, format);
  writeFileSync(filePath, html);
  return html;
}

function createCeHtmlExample(opts: PelteOptions) {
  const importLine = `<script src="./index.js"></script>`;
  const createLine = `<${getCeName(opts)} />`;
  return replaceTemplateWith(INDEX_CE_HTML, importLine, createLine);
}

export function generateHtmlAsString(opts: PelteOptions, format): string {
  if (format === 'es') {
    return createEsModuleHtmlExample(opts);
  } else if (format === 'umd') {
    return createUmdModuleHtmlExample(opts);
  } else if (format == 'ce') {
    return createCeHtmlExample(opts)
  } else {
    throw Error('Format is not handled correct: ' + format);
  }
}

function createEsModuleHtmlExample(opts: PelteOptions) {
  const importLine = `import ${opts.componentName} from './index.mjs'`;
  const createLine = `new ${opts.componentName}({target:document.body})`;
  return replaceTemplateWith(INDEX_ES_HTML, importLine, createLine);
}

function replaceTemplateWith(template, importLine: string, createLine: string) {
  return template
    .replace('{IMPORT_STATEMENT}', importLine)
    .replace('{NEW_COMPONENT_STATEMENT}', createLine);
}

function createUmdModuleHtmlExample(opts: PelteOptions) {
  const importLine = `<script src="./index.js"></script>`;
  const createLine = `new ${opts.componentName}({target:document.body})`;
  return replaceTemplateWith(INDEX_UMD_HTML, importLine, createLine);
}
