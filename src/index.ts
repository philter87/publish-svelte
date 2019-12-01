#!/usr/bin/env node
import {pubs} from "./pubs";
import {parseArguments} from "./argument-parser";

const pubsOptions = parseArguments(process.argv);

pubs(pubsOptions);
