import {readFileSync} from "fs";

const svelte = require('svelte/compiler');

const {
  js,
  css,
  ast,
  warnings,
  vars,
  stats
} = svelte.compile('SimpleSvelteComponent.svelte');
console.log(vars, js);
const content = readFileSync('SimpleSvelteComponent.svelte', {encoding: 'utf8'});

