const fs = require('fs');
const path = require('path');
const HTML_FILE_PREFIX = 'index-example-';

function htmlGeneric(htmlTitle, scriptHead, moduleType, importLine, createLine) {
  // language=HTML
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${htmlTitle}</title>
    ${scriptHead}
  </head>
  <body>
    <script${moduleType}>
      ${importLine}
      ${createLine}  
    </script>
  </body>
</html>`.trim();
}

function createEsModuleHtmlExample(componentName) {
  const title = 'ES Module Example';
  const scriptHead = '';
  const moduleType = ' type="module"';
  const importLine = `import ${componentName} from './index.mjs'`;
  const createLine = `new ${componentName}({target:document.body})`;
  return htmlGeneric(title, scriptHead, moduleType, importLine, createLine);
}

function createUmdModuleHtmlExample(componentName) {
  const title = 'UMD Module Example';
  const scriptHead = '<script src="./index.js"></script>';
  const moduleType = '';
  const importLine = '';
  const createLine = `new ${componentName}({target:document.body})`;
  return htmlGeneric(title, scriptHead, moduleType, importLine, createLine);
}

function generateHtmlAsString(componentName, format){
  if (format === 'es') {
    return createEsModuleHtmlExample(componentName);
  } else if (format === 'umd') {
    return createUmdModuleHtmlExample(componentName);
  } else {
    throw Error('Format is not handled correct: ' + format);
  }
}

function write(componentName, outputOption){
  const format = outputOption.format;
  const outputPath = path.dirname(outputOption.file);
  const filePath = path.join(outputPath, `${HTML_FILE_PREFIX}${format}.html`);
  let html = generateHtmlAsString(componentName, format);
  fs.writeFileSync(filePath, html);
  return html;
}

module.exports.generate = generateHtmlAsString;

module.exports.HTML_FILE_PREFIX = HTML_FILE_PREFIX;

module.exports.write = write;

module.exports.writeAll = function(componentName, outputOptions){
  return outputOptions.map( outputOption => write(componentName, outputOption));
};
