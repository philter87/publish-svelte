import {PelteOptions} from "../pelte-options";
import {
    existsCe,
    formatName,
    getCeName,
    getCeProp,
    getOtherPropsIfAny,
    getPropAdjustExample,
    getPropsObjectExample
} from "./readme-utils";

export const INDEX_ES_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ES Module Example</title>
  </head>
  <body>
    <script type="module">
      {IMPORT_STATEMENT}
      {NEW_COMPONENT_STATEMENT}
    </script>
  </body>
</html>`.trim();

export const INDEX_UMD_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>UMD Module Example</title>
    {IMPORT_STATEMENT}
  </head>
  <body>
    <script>
      {NEW_COMPONENT_STATEMENT}
    </script>
  </body>
</html>
`.trim();

export const INDEX_CE_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>UMD Module Example</title>
    {IMPORT_STATEMENT}
  </head>
  <body>
    {NEW_COMPONENT_STATEMENT}
  </body>
</html>
`.trim();

export const createReadmeFromOpts = (opts: PelteOptions) => {
return `# ${opts.packageName}
${opts.packageName} is a vanilla javascript component which will work in any frontend framework. You can install from npm like this:

\`\`\`text
npm install --save ${opts.packageName}
\`\`\`

#### Usage: Javascript (assumes es module) 
\`\`\`javascript
import ${opts.componentName} from '${opts.packageName}'

let ${formatName(opts)} = new ${opts.componentName}({target:document.body${getPropsObjectExample(opts)});
${getPropAdjustExample(opts)} ${getOtherPropsIfAny(opts)}
\`\`\`

The "target" is where the component is created. Here it is added to the html body with "document.body", but it could also be document.getElementById('id-of-html-element'). 

You initialize properties with "props" and you can change the prop values by just assigning the props to new values - this will be updated in the UI. 

#### Usage: Legacy Javascript
Below you can see how to use the component with vanilla js.
\`\`\`html
...
<head>
  ...
  <script src="https://unpkg.com/${opts.packageName}@${opts.packageVersion}/index.js"></script>
</head>
<body>
  <script>
    let ${formatName(opts)} = new ${opts.componentName}({target:document.body})
  </script>
</body>
\`\`\`

#### Usage: Web Component (aka. Custom Element)
You can use it as a web component.
\`\`\`html
<head>
  <script src="./node_module/{PACKAGE_NAME}/index.js"></script>
</head>
<body>
  <${getCeName(opts)} ${getCeProp(opts)}/>    
</body>
\`\`\`
${existsCe(opts) ? '' : `WARNING: The author of the component needs to add <svelte:options tag="${getCeName(opts)}"/>.`}
#### Svelte Component
\`\`\`html
<script>
  import ${opts.componentName} from '${opts.packageName}';
</script>
<${opts.componentName}/>
\`\`\`

#### Pelte
This component was created by [pelte](https://www.npmjs.com/package/publish-svelte) (aka publish-svelte)`;
};
