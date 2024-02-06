"use strict";

const {describe, it} = require("node:test");
const {jsonCacheModules} = require("./main.cjs");
const {ok} = require("node:assert");

exports = module.exports = (mock) => {
    describe("modules tests", () => {
        it("main module", () => {
            ok(typeof jsonCacheModules === "object");
        });
        it("components module", () => {
            ok(typeof jsonCacheModules.components === "object");
        });
        it("stores module", () => {
            ok(typeof jsonCacheModules.stores === "object");
        });
    });
}