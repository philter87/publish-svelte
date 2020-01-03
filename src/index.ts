#!/usr/bin/env node
import {pelte} from "./pelte";
import {parseArguments} from "./argument-parser";
import {askQuestions} from "./questions";
import {green, red} from 'kleur'
import {sayHello} from "./pelte-util";
import {existsSync} from "fs";

const pelteOptions = parseArguments(process.argv);

if(!pelteOptions.srcFile) {
  sayHello();
  console.log(green('Example usage: "pelte MySvelteComponent.svelte" or "pelte --help"'))
} else {
  if (existsSync(pelteOptions.srcFile)) {
    askQuestions(pelteOptions).then( opts => pelte(opts) );
  } else {
    console.log(red(`The file "${pelteOptions.srcFile}" does not exist.`))
  }
}
