"use strict";

const hasItem = (data) => {
    const {instance, url} = data;
    try {
        if (instance && instance.instanceOf === 'CacheStoreInterface' &&
            typeof url === "string" && url.toString().trim().length >= 6) {
            const store = instance.store();
            const key = instance.getKey(url);
            if(key.startsWith("itemId-")) return store.items.has(key);
        }
    } catch (err) {
        console.error(err);
    }
    return undefined;
};
Object.freeze(hasItem);
exports = module.exports = {
    hasItem
};