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
The command will also create a MySvelteComponent.md file next to svelte file. Here you can describe what your component
does and how to use it. The md-file will also contain the package name, package version and the component name in some 
comments. This information is used when publishing the pubs-command again. The minor version is automatically incremented.


You can examine the bundle before you publish to npm by using these arguments:
```text
pubs ./MySvelteComponent.svelte --skip-publish --keep-bundle
```
"--skip-publish" to skip publishing to npm and "--keep-bundle" will keep the bundle files, which are otherwise cleaned.
