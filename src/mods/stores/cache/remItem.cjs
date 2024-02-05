"use strict";

const remItem = (data) => {
    const {instance, url} = data;
    try {
        if (instance && instance.instanceOf === 'CacheStoreInterface' &&
            typeof url === "string" && url.toString().trim().length >= 6) {
            const store = instance.store();
            const key = instance.getKey(url);
            if(key.startsWith("itemId-") && store.items.delete(key) &&
                store.items.has(key) === false) return true;
        }
    } catch (err) {
        console.error(err);
    }
    return false;
};
Object.freeze(remItem);
exports = module.exports = {
    remItem
};