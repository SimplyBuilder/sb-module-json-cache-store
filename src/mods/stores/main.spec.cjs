"use strict";

const {describe,it} = require("node:test");
const {jsonCacheStores} = require("./main.cjs");
const {ok} = require("node:assert");

exports = module.exports = (mock) => {
    describe("stores module tests", () => {
        it("main module", () => {
            ok(typeof jsonCacheStores === "function");
        });
        it("cache store module", () => {
            ok(typeof jsonCacheStores().cache === "function");
        });
    });
}