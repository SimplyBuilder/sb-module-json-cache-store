"use strict";

const {describe, it} = require("node:test");
const {getItem} = require("./getItem.cjs");
const {deepEqual, ok} = require("node:assert");

exports = module.exports = (mock) => {
    const {instance, data, itemId, itemJson, items} = mock;
    const itemTimestamp = Date.now();

    describe("CacheStoreInterface getItem unit tests", () => {
        it("mock getItem", () => {
            instance['getItem'] = getItem;
        });
        it("test getItem not exist", () => {
            const result = instance.getItem({instance, ...data});
            ok(typeof result === "undefined");
        });
        it("test getItem exist", () => {
            items.set(itemId, {
                key: itemId,
                url: data.url,
                ttl: data.ttl,
                timestamp: itemTimestamp,
                json: itemJson
            });
            const result = instance.getItem({instance, ...data});
            ok(typeof result === "object");
            ok(result.key === itemId);
            ok(result.ttl === data.ttl);
            ok(result.url === data.url);
            ok(result.timestamp === itemTimestamp);
            deepEqual(result.json, itemJson);
        });
        it("clear getItem", () => {
            items.clear();
        });
    });
};