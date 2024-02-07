"use strict";
/**
 * Validates the input data for caching operations.
 * This function checks if the provided data meets the necessary criteria for adding an item to the cache,
 * including type checks for each piece of data and ensuring the instance conforms to the CacheStoreInterface.
 *
 * @function validate
 * @param {Object} data - The data to be validated.
 * @param {Object} data.instance - The cache store instance where the item will be added.
 * @param {number} data.ttl - The time-to-live (TTL) for the cache item.
 * @param {string} data.url - The URL associated with the cache item.
 * @param {string} data.json - The JSON string to be cached.
 * @returns {boolean} Returns true if the data passes all validation checks; otherwise, false.
 */
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
/**
 * Adds a new item to the cache, if it passes validation checks.
 * This function attempts to add a new item to the cache, identified by a URL, with a specified TTL and content.
 * It first validates the input data and, if successful, stores the item in the cache using a unique key.
 *
 * @function addItem
 * @param {Object} data - The data for the cache item to be added.
 * @param {Object} data.instance - The cache store instance where the item will be added.
 * @param {number} data.ttl - The time-to-live (TTL) for the cache item.
 * @param {string} data.url - The URL associated with the cache item.
 * @param {string} data.json - The JSON string to be cached.
 * @returns {Object|undefined} Returns the cached item object if addition is successful; otherwise, undefined.
 */
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
/**
 * Freezes the `addItem` function to prevent modifications, ensuring its integrity and reliability.
 */
Object.freeze(addItem);
/**
 * Exports the `addItem` function, making it available for cache management operations within other parts of the application.
 * This function is essential for maintaining an up-to-date and efficient cache system by adding new items as needed.
 */
exports = module.exports = {addItem};