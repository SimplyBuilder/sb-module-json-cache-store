"use strict";

const {describe} = require("node:test");
const {cacheJson} = require("./main.cjs");

exports = module.exports = (mock) => {
    describe("mods/components/cacheJson/main.js tests", () => {
        console.log("mods/components/cacheJson", cacheJson);
    });
};