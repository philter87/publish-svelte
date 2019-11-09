# {PACKAGE_NAME}

{COMPONENT_NAME} is a vanilla javascript component which will work in any frontend framework. You can install from npm like this:

```text
npm install --save {PACKAGE_NAME}
```

#### Vanilla Javascript
Below you can see how to use the component with vanilla js.
```html
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
```

#### ES module
```html
<body>
    <script type="module">
        import SimpleSvelteComponent from './index.mjs'
        new SimpleSvelteComponent({target:document.body})
    </script>
</body>
```
#### Svelte Component
```html
<script>
    import {COMPONENT_NAME} from '{PACKAGE_NAME}'
</script>
<{COMPONENT_NAME}/>
```
