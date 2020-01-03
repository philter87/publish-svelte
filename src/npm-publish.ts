import {execSync} from "child_process";
import {PelteOptions} from "./pelte-options";
import {green} from "kleur";

export function publish(opts: PelteOptions) {
  if(!opts.skipPublish) {
    try {
      const result = execSync('npm publish ' + opts.outputDir, {stdio: 'pipe', encoding: 'utf8'});
      console.log(green("Successful publish!!!"));
      console.log(green("Package: " + opts.packageName + ":" + opts.packageVersion));
    } catch (e) {
      const error: string = e.stderr;
      if (error.includes('You cannot publish over the previously published versions')) {
        console.log(`The version ${opts.packageVersion} is already published, you will need to increment version with "pelte ${opts.componentName}.svelte --patch"` )
      } else {
        console.error("Error while publishing to npm. You might not be logged in or the package already exists. " +
          "You can compile your package without publishing to npm with --skip-publish and --keep-bundle")
      }
    }
  }
}
