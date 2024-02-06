"use strict";

const {describe, it} = require("node:test");
const {getKey, getUUID} = require("./getKey.cjs");
const {ok, equal} = require("node:assert");

const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

exports = module.exports = (mock) => {
    const {data, itemId} = mock;

    describe("CacheStoreInterface getKey unit tests", () => {
        it("test getKey", () => {
            const result = getKey(data.url);
            ok(typeof result === "string");
            ok(result.startsWith("itemId"));
            equal(result, itemId);
        });
        it("test getUUID", () => {
            const result = getUUID();
            const uuid = result.replace('instanceId-', '');
            ok(typeof result === "string");
            ok(result.startsWith("instanceId"));
            ok(regex.test(uuid));
        });
    });
};