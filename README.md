# publish-svelte
publish-svelte or pubs is a cli tool to easily compile, bundle and publish svelte components to npm. 
The bundle will contain both svelte files and vanilla js files, so the components can run "everywhere" no matter the framework. 
A readme file will also be published to npm, which will describe how to use the component.

#### Installation 
```text
npm install -g publish-svelte
``` 

#### Usage
Publish your svelte component to npm:

```text
pubs ./MySvelteComponent.svelte
```

This will automatically compile, bundle and publish to npm. It requires you to be logged in to npm. A package name is automatically derived from the svelte component file. So MySvelteComponent becomes pubs-my-svelte-component and the version will be 0.0.1.

The bundle will be cleaned up after publish, but a file called MySvelteComponent.md will be created next to the svelte file. Here you can describe what your component does and how to use it. The md-file will be used the next time your run the pubs-command. Furthermore, you can change the package name, package version and the component name in some comments in the md-file. Most likely, you will need to increment the package version.

You can also overwrite the default settings with this command:
```text
pubs ./MySvelteComponent.svelte --package-name awesome-svelte-component
```

You can examine the bundle with:
```text
pubs ./MySvelteComponent.svelte --skip-publish --keep-bundle
```
"--skip-publish" to skip publishing to npm and "--keep-bundle" will keep the bundle files which are otherwise cleaned.

See other available arguements with:
```text
pubs ./MySvelteComponent.svelte --help
```