"use strict";

const {describe, it} = require("node:test");
const {jsonCache} = require("./main.cjs");
const {equal, ok} = require("node:assert");

exports = module.exports = (mock) => {
    describe("main module tests", () => {
        it("create instance", () => {
            const ttl = (1000 * 60 * 2);
            const result = jsonCache({ttl});
            ok(typeof result.clear === "function");
            ok(typeof result.settings === "object");
            ok(typeof result.settings.ttl === "number");
            equal(result.settings.ttl, ttl);
        });
    });
};