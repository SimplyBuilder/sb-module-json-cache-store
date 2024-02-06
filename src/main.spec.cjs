"use strict";

const {describe, it} = require("node:test");
const {jsonCache} = require("./main.cjs");
const {deepEqual, equal, notEqual, ok} = require("node:assert");

exports = module.exports = (mock) => {
    const {data} = mock;
    let instance;
    const min = (1000 * 60 * 3);
    const ttl = (1000 * 60 * 2);

    describe("main module tests", () => {
        it("create instance", () => {
            const result = jsonCache({ttl});
            instance = result;
            ok(typeof result.clear === "function");
            ok(typeof result.getJson === "function");
            ok(typeof result.settings === "object");
            ok(typeof result.settings.ttl === "number");
            deepEqual(result.settings, { ttl, min: 60000, clean: 15000 });
            deepEqual(instance, result);
        });
        it("getJson from url", async () => {
            await instance.getJson({url: data.url, ttl: data.ttl}).then(result => {
                ok(typeof result.key === "string");
                ok(typeof result.ttl === "number");
                ok(typeof result.url === "string");
                ok(typeof result.timestamp === "number");
                ok(typeof result.json === "string");
                ok(typeof result.cache === "undefined");
                notEqual(result.ttl, data.ttl);
                equal(result.ttl, ttl);
                equal(result.url, data.url);
            });
        });

        it("getJson from cache", async () => {
            await instance.getJson({url: data.url, ttl: data.ttl}).then(result => {
                ok(typeof result.key === "string");
                ok(typeof result.ttl === "number");
                ok(typeof result.url === "string");
                ok(typeof result.timestamp === "number");
                ok(typeof result.json === "string");
                ok(typeof result.cache === "boolean");
                notEqual(result.ttl, data.ttl);
                equal(result.ttl, ttl);
                equal(result.url, data.url);
                equal(result.cache, true);
            });
        });

        it("instance clear ", () => {
            const result = instance.clear();
            ok(result === 0);
        });
    });
};