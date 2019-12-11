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

export const README_MD = `# {PACKAGE_NAME}
[comment]: <> (packageVersion:{PACKAGE_VERSION})
[comment]: <> (packageName:{PACKAGE_NAME})
[comment]: <> (componentName:{COMPONENT_NAME})

{COMPONENT_NAME} is a vanilla javascript component which will work in any frontend framework. You can install from npm like this:

\`\`\`text
npm install --save {PACKAGE_NAME}
\`\`\`

#### Vanilla Javascript
Below you can see how to use the component with vanilla js.
\`\`\`html
...
<head>
    ...
    <script src="./node_module/{PACKAGE_NAME}/index.js"></script>
</head>
<body>
    <script>
        new {COMPONENT_NAME}({target:document.body})
    </script>
</body>
\`\`\`

#### ES module
\`\`\`html
<body>
    <script type="module">
        import {COMPONENT_NAME} from './node_module/{PACKAGE_NAME}/index.mjs'
        new {COMPONENT_NAME}({target:document.body})
    </script>
</body>
\`\`\`
#### Svelte Component
\`\`\`html
<script>
    import {COMPONENT_NAME} from '{PACKAGE_NAME}'
</script>
<{COMPONENT_NAME}/>
\`\`\`

#### Pelte
This component was created by [pelte](https://www.npmjs.com/package/publish-svelte) (aka publish-svelte)
`;
