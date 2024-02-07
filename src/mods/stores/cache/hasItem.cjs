"use strict";
/**
 * Checks if a specific item identified by its URL exists in the cache.
 * This function determines the presence of a cache item by generating a unique key
 * from the provided URL and checking if this key exists within the cache items.
 * It ensures the operation is performed on an instance of the CacheStoreInterface and
 * that the provided URL meets the minimum length requirement.
 *
 * @function hasItem
 * @param {Object} data - The data needed to check for the item's existence.
 * @param {CacheStoreInterface} data.instance - The cache store instance to query.
 * @param {string} data.url - The URL associated with the cache item to check.
 * @returns {boolean|undefined} - Returns true if the item exists, false if not, or undefined on error.
 */
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
/**
 * Freezes the `hasItem` function to prevent any modifications, ensuring the reliability
 * and stability of the cache query mechanism. This action reinforces the principle of
 * immutability for critical functionalities within the application.
 */
Object.freeze(hasItem);
/**
 * Exports the `hasItem` function, making it available for cache query operations within
 * other parts of the application. By providing this function as part of the module's
 * public interface, other components can easily check for the existence of cached data,
 * contributing to a more efficient and responsive application architecture.
 */
exports = module.exports = {hasItem};