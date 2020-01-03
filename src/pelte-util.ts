import {join, parse} from "path";
import {PelteOptions} from "./pelte-options";
import {existsSync, mkdirSync, readFileSync} from "fs";
import {green} from "kleur";
import {compile} from 'svelte/compiler';

export interface FieldInfo {
  name: string;
  defaultValue: string | number | null;
}

export interface WebComponentInfo {
  exists: boolean;
  name?: string;
  requireDefine?: boolean;
}
export function createDir(opts: PelteOptions){
  if (!existsSync(opts.outputDir)){
    mkdirSync(opts.outputDir);
  }
}
export function readFileUtf8(file: string) {
  return readFileSync(file, {encoding: 'utf8'});
}

export function changeExtension(srcFile: string, extention: 'md' | 'json'){
  const parsed = parse(srcFile);
  return join(parsed.dir, parsed.name + "." + extention);
}

export function detectCustomComponentOpts(opts: Partial<PelteOptions>): WebComponentInfo {
  try {
    return detectCustomComponent(readFileUtf8(opts.srcFile));
  } catch (e) {
    return {exists: false};
  }
}

export function detectCustomComponent(content: string): WebComponentInfo {
  const dispatchRegex = /<svelte:options\s+.*?tag=["'{](.*?)["'}].*?>/g;
  const match = dispatchRegex.exec(content);
  if(match && match.length > 1) {
    const name = match[1];
    return {
      exists: true,
      name: name == 'null' ? null : name,
      requireDefine: name == 'null'
    }
  } else {
    return {
      exists: false
    }
  }
}

export function findEventEmitters(content: string): string[] {
  const eventNames = [];
  const dispatchRegex = /dispatch\s*\(\s*['"]?(.+?)['"]?\s*,/g;
  iterateMatches(dispatchRegex, content, match => eventNames.push(match[1]));
  return eventNames;
}

export function findVarsFromFile(opts: Partial<PelteOptions>): string[] {
  try {
    return findVars(readFileUtf8(opts.srcFile));
  } catch (e) {
    return [];
  }
}
export function findVars(content: string): string[] {
  return compile(content).vars.filter( v => v.module == false && v.export_name).map( v => v.export_name);
}

export function findExportedFields(content: string): FieldInfo[] {
  const fields: FieldInfo[] = [];
  //                        export   let    name   =     " value  "       ;
  const regexFieldDefault = /export\s+(let|const)\s+(\w+)\s*=\s*['"]?(.*?)['"]?\s*;/g;
  iterateMatches(regexFieldDefault, content, m => fields.push({name: m[2], defaultValue: m[3]}));

  //                      export      let         name        ;
  const regexFieldNoDefault = /export\s+(let|const)\s+(\w+)\s*;/g;
  iterateMatches(regexFieldNoDefault, content, m => fields.push({name: m[2], defaultValue: m[3]}));
  return fields;
}

function iterateMatches(regex: RegExp, content: string, callback: (RegExpExecArray) => void ){
  let match = regex.exec(content);
  while(match != null) {
    callback(match);
    match = regex.exec(content);
  }
}

export function sayHello() {
  console.log(green('Hello!!!'));
  console.log(green('My name is Pelte and I will help you share svelte component with the world.'));
}
