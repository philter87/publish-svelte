import {readFileSync} from "fs";
import {join} from "path";

export function readTemplate(fileName: string): string{
  return readFileSync(join('src', 'creators', 'templates', fileName), 'utf8')
}
