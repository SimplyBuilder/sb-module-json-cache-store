"use strict";

const {describe, it} = require("node:test");
const {cacheAutoClean} = require("./main.cjs");
const {ok} = require("node:assert");

const items = new Map();

exports = module.exports = (mock) => {
    const {data, itemId, itemJson} = mock;
    const cache = {
        get list () {
            return Array.from(items.keys());
        },
        store: () => {
            return {
                items,
                settings: { ttl: 120000, min: 60000, clean: 15000 }
            }
        }
    };
    const test = {
        next: 1,
        limit: 5,
        interval: 500
    };
    describe("component cacheAutoClean module tests", () => {
        it("mock addItem", () => {
            const itemTimestamp = Date.now();
            cacheAutoClean({cache, test});
            items.set(itemId, {
                key: itemId,
                url: data.url,
                ttl: data.ttl,
                timestamp: itemTimestamp,
                json: itemJson
            });
        });
    });
};