"use strict";

const {describe, it} = require("node:test");
const {getKey, getUUID} = require("./getKey.cjs");
const {ok, equal} = require("node:assert");

const key = 'itemId-iDufQhdISvayx5VNIHQW7KX9m7TiYqlx6r1eIDQ6qaA';
const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

exports = module.exports = (mock) => {
    const {data} = mock;

    describe("CacheStoreInterface getKey unit tests", () => {
        it("test getKey", () => {
            const result = getKey(data.url);
            ok(typeof result === "string");
            ok(result.startsWith("itemId"));
            equal(result, key);
        });
        it("test getUUID", () => {
            const result = getUUID(data.url);
            const uuid = result.replace('instanceId-', '');
            ok(typeof result === "string");
            ok(result.startsWith("instanceId"));
            ok(regex.test(uuid));
        });
    });
};