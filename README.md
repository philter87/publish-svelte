# publish-svelte
publish-svelte or pubs is a cli tool to easily compile, bundle and publish svelte components to npm. 
The bundle will contain both svelte files and vanilla js files, so the components can run "everywhere" no matter the framework. 

#### Installation 
```text
npm install -g publish-svelte
``` 

#### Usage
Publish your svelte component to npm:

```text
pubs ./MySvelteComponent.svelte
```

This will automatically compile, bundle and publish to npm. It requires you to be logged in to npm.
The bundle will contain a readme file, that will describe how to use the svelte component. 

You can examine the bundle before you publish to npm by using these arguments:
```text
pubs ./MySvelteComponent.svelte --skip-publish --keep-bundle
```
"--keep" to keep the bundle files, which are otherwise cleaned up and "--dry-run" to not publish to npm.
