"use strict";

const validate = (data) => {
    try {
        const {instance, ttl, url, json} = data;
        if (typeof instance !== "object" ||
            typeof json !== "string" ||
            typeof ttl !== "number" || typeof url !== "string") return false;

        if (instance && instance.instanceOf === 'CacheStoreInterface' &&
            json.toString().trim().length >= 5 &&
            url.toString().trim().length >= 6
        ) return true;
    } catch (err) {
        console.error(err);
    }
    return false;
};

const addItem = (data) => {
    try {
        const {instance, ttl, url, json} = data;
        if (validate(data)) {
            const store = instance.store();
            const key = instance.getKey(url);
            if (key?.startsWith("itemId-")) {
                if (store.items.has(key)) return store.items.get(key);
                const schema = {
                    key, ttl, url,
                    timestamp: Date.now(),
                    json
                };
                if (store.items.set(key, schema)) return store.items.get(key);
            }
        }
    } catch (err) {
        console.error(err);
    }
    return undefined;
};
Object.freeze(addItem);
exports = module.exports = {
    addItem
};