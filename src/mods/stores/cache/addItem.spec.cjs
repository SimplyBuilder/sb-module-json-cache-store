"use strict";

const {describe, it} = require("node:test");
const {addItem} = require("./addItem.cjs");
const {deepEqual, ok} = require("node:assert");

exports = module.exports = (mock) => {
    const {instance, items, data, itemId, itemJson} = mock;
    describe("CacheStoreInterface addItem unit tests", () => {
        it("mock addItem", () => {
            instance['addItem'] = addItem;
        });
        it("test addItem fail on empty ttl", () => {
            const result = instance.addItem({instance, ...data, ttl: undefined});
            ok(typeof result === "undefined");
        });
        it("test addItem fail on empty url", () => {
            const result = instance.addItem({instance, ...data, url: undefined});
            ok(typeof result === "undefined");
        });
        it("test addItem fail on empty json", () => {
            const result = instance.addItem({instance, ...data, json: undefined});
            ok(typeof result === "undefined");
        });
        it("test addItem", () => {
            const result = instance.addItem({instance, ...data});
            ok(typeof result === "object");
            ok(result.key === itemId);
            ok(result.ttl === data.ttl);
            ok(result.url === data.url);
            ok(typeof result.timestamp === "number");
            deepEqual(result.json, itemJson);
        });
        it("clear addItem", () => {
            items.clear();
        });
    });
};