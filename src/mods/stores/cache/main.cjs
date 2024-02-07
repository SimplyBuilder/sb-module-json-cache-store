"use strict";
/**
 * Provides utilities and core functionalities for cache store management.
 * This module includes the creation of unique identifiers for cache instances, key generation,
 * and methods to define and freeze properties on cache store objects. It also initializes
 * core symbols used across the cache management system and sets default cache settings.
 *
 * @module CacheManagement
 */

/**
 * Imports utility functions for generating unique identifiers and cache keys.
 *
 * @const {Function} getUUID - Generates a unique identifier for cache instances.
 * @const {Function} getKey - Generates a unique key based on provided data.
 */
const {getUUID, getKey} = require("./getKey.cjs");
/**
 * Imports utility functions for defining and freezing properties on objects.
 *
 * @const {Function} definePropertries - Defines properties on cache store objects.
 * @const {Function} freezePropertries - Freezes properties on cache store objects to prevent modifications.
 */
const {definePropertries} = require("./definePropertries.cjs");
const {freezePropertries} = require("./freezePropertries.cjs");
/**
 * Symbols used as unique identifiers for cache store properties.
 * These symbols represent identifiers, items, and settings within a cache store instance,
 * ensuring property names do not conflict with other object properties.
 *
 * @const cacheStoreIdSymbol - Represents the unique identifier for a cache store instance.
 * @const cacheStoreItemsSymbol - Represents the collection of cached items within a cache store.
 * @const cacheStoreSettingsSymbol - Represents the configuration settings of a cache store.
 */
const cacheStoreIdSymbol = Symbol("cacheStoreId");
const cacheStoreItemsSymbol = Symbol("cacheStoreItems");
const cacheStoreSettingsSymbol = Symbol("cacheStoreSettings");
/**
 * The singleton instance of the cache, if initialized.
 *
 * @var {Object|undefined} cacheInstance - The current instance of the cache, if it exists.
 */
let cacheInstance;
/**
 * A object to store cache instances, indexed by their unique identifiers.
 *
 * @var {Object} CacheStore - An object serving as a registry for cache instances.
 */
const CacheStore = {};
/**
 * Default settings for cache instances.
 * These settings include default TTL (Time To Live), minimum TTL, and autoclean interval,
 * specified in milliseconds.
 *
 * @const settingsModel - The model defining default settings for new cache instances.
 */
const settingsModel = {
    ttl: (1000 * 60 * 5),
    min: (1000 * 60),
    clean: (1000 * 15)
};
/**
 * Represents the interface for interacting with a specific cache store instance.
 * This class encapsulates functionality for managing cache items, retrieving instance-specific
 * settings, and performing cache operations such as listing keys and clearing the cache.
 *
 * Instances of this class are tightly coupled with a unique cache store, identified by an instance ID,
 * and provide a set of methods to interact with this cache store.
 *
 * @class CacheStoreInterface
 */
class CacheStoreInterface {
    constructor(storeInstance) {
        /**
         * Initializes a new instance of the CacheStoreInterface with a specified store instance.
         * This constructor freezes the store instance ID to ensure it remains immutable and
         * defines several properties and methods to interact with the cache store.
         *
         * @param {string} storeInstance - The unique identifier for the cache store instance.
         */
        this[cacheStoreIdSymbol] = storeInstance;
        Object.freeze(this[cacheStoreIdSymbol]);
        Object.defineProperty(this, cacheStoreIdSymbol, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        /**
         * Retrieves the cache store's items and settings.
         *
         * @returns {Object} An object containing the cache items and settings for this instance.
         */
        Object.defineProperty(this, 'store', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                const instance = this;
                return {
                    items: CacheStore[instance[cacheStoreIdSymbol]][cacheStoreItemsSymbol],
                    settings: CacheStore[instance[cacheStoreIdSymbol]][cacheStoreSettingsSymbol],
                };
            }
        });
        /**
         * Gets the unique identifier for this cache store instance.
         *
         * @returns {string} The unique identifier for the cache store instance.
         */
        Object.defineProperty(this, 'instanceId', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: () => {
                const instance = this;
                return instance[cacheStoreIdSymbol];
            }
        });
        /**
         * Retrieves a unique key for caching purposes based on provided data.
         *
         * @param {Object} data - The data from which to generate a cache key.
         * @returns {string} A unique cache key.
         */
        Object.defineProperty(this, 'getKey', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: (data) => getKey(data)
        });
        Object.defineProperty(this, 'instanceOf', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: new.target.name
        });
        /**
         * Lists all keys currently stored in the cache.
         *
         * @returns {Array<string>} An array of keys present in the cache store.
         */
        Object.defineProperty(this, 'list', {
            enumerable: true,
            configurable: false,
            get() {
                const instance = this;
                const store = CacheStore[instance[cacheStoreIdSymbol]];
                return Array.from(store[cacheStoreItemsSymbol].keys());
            }
        });
        /**
         * Clears all items from the cache store.
         *
         * @returns {number} The number of items removed from the cache, indicating the cache is now empty.
         */
        Object.defineProperty(this, 'clear', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                const instance = this;
                const store = CacheStore[instance[cacheStoreIdSymbol]];
                store[cacheStoreItemsSymbol].clear();
                return store[cacheStoreItemsSymbol].size;
            }
        });
        definePropertries(this);
        freezePropertries({
            instance: this,
            items: [...Object.getOwnPropertyNames(this)]
        });
        Object.preventExtensions(this);
    }
    /**
     * A test method to verify the functionality of the interface.
     *
     * @returns {boolean} Always returns true as a basic operation check.
     */
    test() {
        return true;
    }
}
/**
 * Customizes the instanceof behavior for the CacheStoreInterface.
 * This allows for checking the instance against the CacheStoreInterface based on a custom condition,
 * specifically, matching the constructor name with the 'instanceOf' property of the instance.
 */
Object.defineProperty(CacheStoreInterface, Symbol.hasInstance, {
    get: () => {
        return (instance) => {
            return instance.constructor.name === instance.instanceOf
        }
    }
});
/**
 * Populates cache settings with provided data, ensuring settings adhere to minimum requirements.
 * Merges default settings with user-provided data, then checks and adjusts the TTL (Time To Live),
 * minimum TTL, and clean interval settings to ensure they meet defined minimum values.
 *
 * @function settingsPopulate
 * @param {Object} data - Custom configuration settings provided by the user.
 * @returns {Object} The populated and validated settings object for the cache.
 */
const settingsPopulate = (data) => {
    const schema = {...settingsModel, ...data};
    if((1000 * 60) > schema.ttl) schema.ttl = settingsModel.ttl;
    if((1000 * 60) > schema.min) schema.min = settingsModel.min;
    if((1000 * 5) > schema.clean) schema.clean = settingsModel.clean;
    return schema;
};
/**
 * Prepares a new cache store instance identified by a unique ID.
 * Generates a unique identifier for the cache store instance, then initializes and stores the instance
 * in the CacheStore object if an instance with the same identifier does not already exist.
 * It populates the instance with settings, an empty items Map, and assigns a unique ID.
 *
 * @function prepareInstance
 * @param {Object} [data={}] - Optional initialization data for the cache store instance.
 * @returns {string|undefined} The unique identifier for the newly created cache store instance,
 * or undefined if an instance with the generated ID already exists.
 */
const prepareInstance = (data = {}) => {
    const instanceId = getUUID();
    if(CacheStore[instanceId]) return undefined;
    CacheStore[instanceId] = {
        [cacheStoreIdSymbol]: instanceId,
        [cacheStoreSettingsSymbol]: settingsPopulate(data),
        [cacheStoreItemsSymbol]: new Map()
    };
    return instanceId;
};
/**
 * Creates or retrieves a singleton instance of the CacheStoreInterface, initialized with the provided data.
 * This function is responsible for managing access to a cache store, ensuring there is only one instance
 * of the cache store throughout the application lifecycle.
 *
 * @function cache
 * @param {Object} [data={}] - Optional initialization data for the cache store instance. This could include
 * configurations such as default TTL values, storage options, etc.
 * @returns {CacheStoreInterface} An instance of the CacheStoreInterface, providing various cache management functionalities.
 * @throws {Error} Captures and logs any error that occurs during the instantiation or retrieval of the cache store instance.
 */
const cache = (data = {}) => {
    try {
        const storeInstance = prepareInstance(data);
        if (typeof cacheInstance === "undefined" && storeInstance) {
            cacheInstance = new CacheStoreInterface(storeInstance);
        }
    } catch (err) {
        console.error(err);
    }
    return cacheInstance;
};
/**
 * Prevents further modifications to the cache function, ensuring the integrity of the caching mechanism.
 * Freezing the function prevents any reassignment or changes to its implementation, making the cache
 * functionality reliable and consistent across the application.
 */
Object.freeze(cache);
/**
 * Exports the `cache` function, making it available for use within other parts of the application.
 * By exporting the function, other modules can easily integrate and utilize the caching functionalities
 * provided by the CacheStoreInterface, facilitating efficient data management and retrieval.
 */
exports = module.exports = { cache };