import {execSync} from "child_process";
import {PubsOptions} from "./pubs-options";

export function isLoggedIn() {
  try {
    execSync('npm whoami', {encoding: 'utf8'});
    return true
  } catch (e) {
    return false;
  }
}

export function publish(opts: PubsOptions) {
  execSync('npm publish dist')
}
