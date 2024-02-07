"use strict";

import {describe, it} from "node:test";
import "#json-cache.min.umd.mjs";
import {deepEqual, equal, notEqual, ok} from "node:assert";
// noinspection JSUnresolvedReference
const {jsonCache} = SimplyBuilder;

const data = {
    url: 'https://gist.githubusercontent.com/jamilservicos/19709abf0d44f914ecb8337e8bff220b/raw/sb-struct-hello-world.json',
    ttl: 100
}

describe("umd esm import and tests", () => {
    let instance;
    const ttl = (1000 * 60 * 2);

    it("create instance", () => {
        const result = jsonCache({ttl, test: true});
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


export default {}