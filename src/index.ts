#!/usr/bin/env node
import {PubsOptions} from "./pubs-options";
import {pubs} from "./pubs";
import {parseArguments} from "./argument-parser";

const pubsOptions: PubsOptions = parseArguments(process.argv)

pubs(pubsOptions);
