import {RollupBuild} from "rollup";
import {PubsOptions} from "./pubs-options";
import {parse} from "path";

export function findNestedSvelteComponents(opts:PubsOptions, rollupBuild: RollupBuild) {
  const srcComponentFile = parse(opts.srcFile).name;

  const nestedSvelteComponents = rollupBuild.watchFiles.filter( f => {
    const parsed = parse(f);
    if (parsed.name === srcComponentFile) {
      return false;
    } else if (parsed.ext === '.svelte') {
      return true;
    }
    return false;
  });
}
