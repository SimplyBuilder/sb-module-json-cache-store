"use strict";

const {describe, it} = require("node:test");
const {hasItem} = require("./hasItem.cjs");
const {ok} = require("node:assert");

exports = module.exports = (mock) => {
    const {instance, data, itemId, itemJson, items} = mock;
    const itemTimestamp = Date.now();

    describe("CacheStoreInterface hasItem unit tests", () => {
        it("mock hasItem", () => {
            instance['hasItem'] = hasItem;
        });
        it("test hasItem not exist", () => {
            const result = instance.hasItem({instance, ...data});
            ok(typeof result === "boolean");
            ok(result === false);
        });
        it("test hasItem exist", () => {
            items.set(itemId, {
                key: itemId,
                url: data.url,
                ttl: data.ttl,
                timestamp: itemTimestamp,
                json: itemJson
            });
            const result = instance.hasItem({instance, ...data});
            ok(typeof result === "boolean");
            ok(result);
        });
        it("clear hasItem", () => {
            items.clear();
        });
    });
};