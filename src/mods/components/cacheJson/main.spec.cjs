"use strict";

const {describe, it} = require("node:test");
const {cacheJson} = require("./main.cjs");
const {ok, notEqual, equal} = require("node:assert");
const settings = { ttl: 120000, min: 60000, clean: 15000 };

exports = module.exports = (mock) => {
    const {data, itemId, items} = mock
    const req = {
        url: data.url,
        ttl: data.ttl
    };
    const store = {
        getItem: (data) => {
            if(data) return items.get(itemId);
        },
        addItem: (data) => {
            const schema = {
                key: itemId,
                timestamp: Date.now()
            };
            items.set(itemId, {...schema, ...data});
            return items.get(itemId);
        }
    };
    describe("component cacheJson module tests", () => {
        it("cacheJson from url", async () => {
            await cacheJson({store, settings, req}).then(result => {
                ok(typeof result.key === "string");
                ok(typeof result.ttl === "number");
                ok(typeof result.url === "string");
                ok(typeof result.timestamp === "number");
                ok(typeof result.json === "string");
                ok(typeof result.cache === "undefined");
                equal(result.url, data.url);
            });
        });
        it("cacheJson from cache", async () => {
            await cacheJson({store, settings, req}).then(result => {
                ok(typeof result.key === "string");
                ok(typeof result.ttl === "number");
                ok(typeof result.url === "string");
                ok(typeof result.timestamp === "number");
                ok(typeof result.json === "string");
                ok(typeof result.cache === "boolean");
                equal(result.url, data.url);
                equal(result.cache, true);
            });
        });
        it("instance clear ", () => {
            items.clear();
            ok(items.size === 0);
        });
    });
};