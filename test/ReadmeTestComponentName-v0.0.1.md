# readme-test-package

TestSvelteComponent is a vanilla javascript component which will work in any frontend framework. You can install from npm like this:

```text
npm install --save test-svelte-component
```

#### Vanilla Javascript
Below you can see how to use the component with vanilla js.
```html
...
<head>
    ...
    <script src="./node_module/test-svelte-component/index.js"></script>
</head>
<body>
    <script>
        new TestSvelteComponent({target:document.body})
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
    import TestSvelteComponent from 'test-svelte-component'
</script>
<TestSvelteComponent/>
```
