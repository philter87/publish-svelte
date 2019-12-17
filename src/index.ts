#!/usr/bin/env node
import {pelte} from "./pelte";
import {parseArguments} from "./argument-parser";
import {askQuestions} from "./questions";
import {green} from 'kleur'
import {sayHello} from "./pelte-util";
const pelteOptions = parseArguments(process.argv);

if(!pelteOptions.srcFile) {
  sayHello();
  console.log(green('Example usage: "pelte MySvelteComponent.svelte" or "pelte --help"'))
} else {
  askQuestions(pelteOptions).then( opts => {
    return pelte(opts);
  });
}
