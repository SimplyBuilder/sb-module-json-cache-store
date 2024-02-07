"use strict";
/**
 * Removes a specific item from the cache based on its URL.
 * This function aims to delete a cache item by generating a unique key from the provided URL
 * and removing the corresponding item from the cache. It verifies that the operation is performed
 * on an instance of the CacheStoreInterface and that the URL meets the minimum length requirement.
 * The function ensures that the item is successfully removed by checking the absence of the key
 * in the cache after the deletion attempt.
 *
 * @function remItem
 * @param {Object} data - The data required to remove the cache item.
 * @param {CacheStoreInterface} data.instance - The cache store instance from which to remove the item.
 * @param {string} data.url - The URL associated with the cache item to be removed.
 * @returns {boolean} - Returns true if the item is successfully removed; otherwise, false.
 */
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
/**
 * Freezes the `remItem` function to prevent any modifications, ensuring the integrity
 * and reliability of the cache item removal mechanism. This action reinforces the principle
 * of immutability for critical functionalities within the application.
 */
Object.freeze(remItem);
/**
 * Exports the `remItem` function, making it available for cache management operations
 * within other parts of the application. By providing this function as part of the module's
 * public interface, other components can easily manage cached data, contributing to a more
 * efficient and clean application architecture.
 */
exports = module.exports = {remItem};