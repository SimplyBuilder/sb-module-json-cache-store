"use strict";

const {describe, it} = require("node:test");
const {jsonCacheComponents} = require("./main.cjs");
const {ok} = require("node:assert");

exports = module.exports = (mock) => {
    describe("components module tests", () => {
        it("main module", () => {
            ok(typeof jsonCacheComponents === "function");
        });
        it("cacheAutoClean component module", () => {
            ok(typeof jsonCacheComponents().cacheAutoClean === "function");
        });
        it("cacheJson component module", () => {
            ok(typeof jsonCacheComponents().cacheJson === "function");
        });
    });
};