"use strict";

const {describe} = require("node:test");
const {cacheAutoClean} = require("./main.cjs");

exports = module.exports = (mock) => {
    describe("mods/components/cacheAutoClean/main.js tests", () => {
        console.log("mods/components/cacheAutoClean", cacheAutoClean);
    });
};