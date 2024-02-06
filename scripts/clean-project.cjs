"use strict";
const {resolve} = require("node:path");
const fs = require('node:fs');
const fastGlob = require('fast-glob');
const {globSync} = fastGlob;

const rootPath = resolve(__dirname, "..");
const tmps = [
    `${rootPath}/build`,
    `${rootPath}/lib`
];

const removeItem = (item) => {
    try {
        fs.rm(item, { recursive: true, force: true }, err => {
            if (err) throw err;
            console.log(`${item} is deleted!`);
        });
    } catch (err) {
        console.error(err);
    }
}

const packfiles = globSync(`${rootPath}/*.tgz`);

if(packfiles.length >= 1) {
    packfiles.forEach(item => {
        removeItem(item);
    });
}
tmps.forEach(item => {
    removeItem(item);
});