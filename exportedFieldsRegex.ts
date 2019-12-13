import {findEventEmitters} from "./src/pelte-util";

let aScript = `<svelte:options tag="my-element">`;


const dispatchRegex = /<svelte:options\s+.*?tag=["'{](.*?)["'}].*?>/g;
//console.log(dispatchRegex.exec(aScript))

aScript = `<svelte:options tag={null}>`;
console.log(dispatchRegex.exec(aScript))
