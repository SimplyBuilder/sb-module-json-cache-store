"use strict";

const {describe, it} = require("node:test");
const {cache} = require("./main.cjs");
const {ok} = require("node:assert");

let instance;

exports = module.exports = (mock) => {
    const {data} = mock;
    describe("CacheStoreInterface tests", () => {
        it("create store", () => {
            instance = cache({
                ttl: data.ttl
            });
            ok(instance.instanceOf === "CacheStoreInterface");
            ok(instance.test());
        });
        it("store.list empty", () => {
            const result = instance.list;
            ok(typeof result === "object");
            ok(Array.isArray(instance.list));
            ok(result.length === 0);
        });
        it("store.instanceId", () => {
            const result = instance.instanceId();
            ok(result.startsWith('instanceId-'));
        });
        it("store.remItem not exist", () => {
            const result = instance.remItem({url: data.url});
            ok(typeof result === "boolean");
            ok(result === false);
        });
        it("store.hasItem not exist", () => {
            const result = instance.hasItem({url: data.url});
            ok(typeof result === "boolean");
            ok(result === false);
        });
        it("store.getItem not exist", () => {
            const result = instance.getItem({url: data.url});
            ok(typeof result === "undefined");
        });
        it("store.addItem", () => {
            const result = instance.addItem(data);
            ok(typeof result === "object");
            ok(result.key);
            ok(result.ttl);
            ok(result.url);
            ok(result.timestamp);
            ok(result.json);
        });
        it("store.hasItem", () => {
            const result = instance.hasItem({url: data.url});
            ok(typeof result === "boolean");
            ok(result);
        });
        it("store.getItem", () => {
            const result = instance.getItem({url: data.url});
            ok(typeof result === "object");
            ok(result.key);
            ok(result.ttl);
            ok(result.url);
            ok(result.timestamp);
            ok(result.json);
        });
        it("store.list", () => {
            const result = instance.list
            ok(typeof result === "object");
            ok(Array.isArray(instance.list));
            ok(result.length >= 1);
        });
        it("store.remItem ", () => {
            const result = instance.remItem({url: data.url});
            ok(typeof result === "boolean");
            ok(result);
        });
        it("store.clear ", () => {
            const result = instance.clear();
            ok(result === 0);
        });
    });
};