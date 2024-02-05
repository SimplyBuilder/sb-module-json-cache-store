"use strict";

const itemId = "itemId-test";
const itemJson = JSON.stringify({test: 1});

const items = new Map();
const data = {
    url: '/assets/json/test.json',
    ttl: 100,
    json: itemJson
}

const instance = {
    instanceOf: 'CacheStoreInterface',
    getKey: (data) => {
        if(data) return itemId;
        return undefined;
    },
    store: () => {
        return {items};
    }
};

module.exports = {
    instance, items, data, itemId, itemJson
};