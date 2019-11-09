#!/usr/bin/env node
import {PubsOptions} from "./pubs-options";
import {pubs} from "./pubs";

const pubsOptions: PubsOptions = {
  srcFile: './SimpleSvelteComponent.svelte' // required
};

pubs(pubsOptions);
