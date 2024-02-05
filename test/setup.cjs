"use strict";

const {resolve} = require("node:path");
const fastGlob = require('fast-glob');
const {globSync} = fastGlob;

const sourceFiles = resolve('src');
const buildFiles = resolve('build');
const mock = require("./mock.cjs");

if(process?.env && typeof process.env["unitTest"] === "undefined") process.env["unitTest"] = buildFiles;

const commonJsfiles = globSync(sourceFiles +"/**/*.spec.cjs");

if(commonJsfiles.length >= 1) {
    commonJsfiles.forEach(file => {
        try {
            require(file)(mock);
        } catch {
            console.log("error on:", file);
        }
    });
}
//require("./build/plain.cjs");