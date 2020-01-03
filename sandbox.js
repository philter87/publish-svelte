const fs = require('fs');
const svelte = require('svelte/compiler');

const start = new Date().getTime();
const content = fs.readFileSync('Simple.svelte', {encoding: 'utf8'});
const {
  js,
  css,
  ast,
  warnings,
  vars,
  stats
} = svelte.compile(content);
console.log(vars);
console.log(new Date().getTime() - start);