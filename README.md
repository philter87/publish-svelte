# publish-svelte
publish-svelte or "pelte" is a cli tool to easily compile, bundle and publish svelte components to npm. 
The bundle will contain both svelte files and vanilla js files, so the components can run "everywhere" no matter the framework. 
A readme file will also be published to npm, which will describe how to use the component. 

"pelte" is optimal if you want to share one or several component in an existing svelte project.
The great benefit is that you dont need to "extract" the component from your project and fiddle with npm link and import statments.

#### Installation 
```text
npm install -g publish-svelte
``` 

#### Usage
Publish your svelte component to npm:

```text
pelte ./MySvelteComponent.svelte
```
This will automatically compile, bundle and publish to npm. The command requires you to be logged in to npm. The package name will be derived from the svelte component, so MySvelteComponent becomes pelte-my-svelte-component with version 0.0.1.

Therefore it might be a good idea to skip the publishing part, when running the command for the first time:

```text
pelte ./MySvelteComponent.svelte --skip-publish
```

The will create two files MySvelteComponent.md and MySvelteComponent.json.  
A package name is automatically derived from the svelte component file, so for instance MySvelteComponent becomes pelte-my-svelte-component and the version will be 0.0.1.

A file called MySvelteComponent.md will be created next to the svelte file. Here you can describe what your component does and how to use it. The md-file will be used the next time your run the pelte-command. Furthermore, you can change the package name, package version and the component name in some comments in the md-file.

You can also increment the package version with patch, minor or major. Here the component is published with a patched version:
```text
pelte ./MySvelteComponent.svelte --patch
```

You can also overwrite the default settings with this command:
```text
pelte ./MySvelteComponent.svelte --package-name awesome-svelte-component
```

You can examine the bundle without publishing to npm with:
```text
pelte ./MySvelteComponent.svelte --skip-publish --keep-bundle
```
"--skip-publish" to skip publishing to npm and "--keep-bundle" will keep the bundle files which are otherwise cleaned.

See other available arguements with:
```text
pelte ./MySvelteComponent.svelte --help
```
