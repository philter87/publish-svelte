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

This will automatically compile, bundle the svelte component and publish to npm. It requires you to be logged in to npm.

You can examine the bundle before you publish to npm by using these arguments:
```text
pubs ./MySvelteComponent.svelte --keep --dry-run
```
"--keep" to keep the bundle files, which are otherwise cleaned up and "--dry-run" to not publish to npm.
