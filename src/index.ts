#!/usr/bin/env node
import {pelte} from "./pelte";
import {parseArguments} from "./argument-parser";

const pelteOptions = parseArguments(process.argv);

pelte(pelteOptions);
