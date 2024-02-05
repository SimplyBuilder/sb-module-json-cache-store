"use strict";

const {describe, it} = require("node:test");
const {remItem} = require("./remItem.cjs");
const {ok} = require("node:assert");

exports = module.exports = (mock) => {
    const {instance, data, itemId, itemJson, items} = mock;
    const itemTimestamp = Date.now();
    describe("CacheStoreInterface remItem unit tests", () => {
        it("mock remItem", () => {
            instance['remItem'] = remItem;
        });
        it("test remItem not exist", () => {
            const result = instance.remItem({instance, url: data.url});
            ok(typeof result === "boolean");
            ok(result === false);
            ok(items.size === 0);
        });
        it("test remItem exist", () => {
            items.set(itemId, {
                key: itemId,
                url: data.url,
                ttl: data.ttl,
                timestamp: itemTimestamp,
                json: itemJson
            });
            ok(items.size === 1);
            const result = instance.remItem({instance, url: data.url});
            ok(typeof result === "boolean");
            ok(result);
            ok(items.size === 0);
        });
        it("clear remItem", () => {
            items.clear();
        });
    });
};