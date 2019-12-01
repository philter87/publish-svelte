# simple-svelte-component
[comment]: <> (packageVersion:0.1.5)
[comment]: <> (packageName:simple-svelte-component)
[comment]: <> (componentName:SimpleSvelteComponent)

SimpleSvelteComponent is a vanilla javascript component which will work in any frontend framework. You can install from npm like this:

```text
npm install --save simple-svelte-component
```

#### Vanilla Javascript
Below you can see how to use the component with vanilla js.
```html
...
<head>
    ...
    <script src="./node_module/simple-svelte-component/index.js"></script>
</head>
<body>
    <script>
        new SimpleSvelteComponent({target:document.body})
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
    import SimpleSvelteComponent from 'simple-svelte-component'
</script>
<SimpleSvelteComponent/>
```
