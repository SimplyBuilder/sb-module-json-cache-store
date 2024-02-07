"use strict";

/**
 * A module for managing JSON cache instances, including modules and components.
 * This script initializes cache instances and sets up internal symbols for settings and storage.
 *
 * @module JSONCacheStoreModule
 */

/**
 * Cache instance to hold the singleton reference.
 * This variable may contain an instance of the cache management system, ensuring
 * that only one instance exists throughout the application lifecycle.
 *
 * @type {Object|undefined}
 */
let cacheInstance;

/**
 * Imports the JSON cache functionality for modules.
 * This component is responsible for caching and retrieving module-related data.
 *
 * @const jsonCacheModules
 * @type {Object}
 */
const {jsonCacheModules} = require("./mods/main.cjs");

/**
 * Imports the JSON cache functionality for components.
 * This component is responsible for caching and retrieving component-related data.
 *
 * @const jsonCacheComponents
 * @type {Object}
 */
const {jsonCacheComponents} = require("./mods/components/main.cjs");

/**
 * A unique symbol representing the settings within the cache management system.
 * This symbol is used as a key to store and retrieve settings in a way that prevents
 * property name collisions.
 *
 * @const settingsSymbol
 * @type {Symbol}
 */
const settingsSymbol = Symbol("settings");

/**
 * A unique symbol representing the store within the cache management system.
 * Similar to `settingsSymbol`, this symbol is used to uniquely identify the store
 * for caching data, ensuring protected access.
 *
 * @const storeSymbol
 * @type {Symbol}
 */
const storeSymbol = Symbol("store");

/**
 * Represents a caching interface for JSON data, providing methods for caching management and retrieval.
 *
 * This class initializes a JSON cache with specific settings, offering functionalities such as clearing the cache,
 * accessing cache settings, and asynchronously fetching JSON data with cache support. It utilizes symbols
 * to ensure private properties and methods, enhancing encapsulation.
 *
 * @class JsonCacheInterface
 * @memberof module:JSONCacheStoreModule
 */
class JsonCacheInterface {
    /**
     * Constructs a new instance of JsonCacheInterface with the provided settings.
     * Initializes internal storage and settings using provided configurations.
     *
     * @constructor
     * @param {Object} settings - Configuration settings for the cache instance.
     */
    constructor(settings) {
        this[storeSymbol] = {};
        this[settingsSymbol](settings);
        /**
         * @private
         * @ignore
         */
        Object.defineProperty(this, storeSymbol, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        /**
         * @private
         * @ignore
         */
        Object.defineProperty(this, settingsSymbol, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        /**
         * Clears the cache storage.
         * This method provides a public interface to clear cached data.
         *
         * @returns {number} The number of items removed from the cache, indicating the cache is now empty.
         */
        Object.defineProperty(this, 'clear', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: () => {
                const instance = this;
                return instance[storeSymbol].clear();
            }
        });
        /**
         * Retrieves the cache settings.
         * This getter method provides read-only access to the cache settings.
         *
         * @returns {Object} - The current cache settings.
         */
        Object.defineProperty(this, 'settings', {
            enumerable: true,
            get () {
                const instance = this;
                const {settings} = instance[storeSymbol].store();
                if(settings) return settings;
                return {};
            }
        });
        /**
         * Asynchronously fetches JSON data, with support for caching.
         * This method attempts to retrieve cached data or fetches from the provided URL if not cached.
         *
         * @param {Object} data - The data needed for fetching JSON, including URL and cache settings.
         * @param {string} data.url - The URL from which to fetch JSON data.
         * @param {number} [data.ttl] - The time-to-live (TTL) for the cache entry.
         * @param {boolean} [data.dynamic=false] - Indicates if the fetched data should bypass the cache.
         * @returns {Promise<Object|undefined>} - A promise that resolves to the fetched JSON data or undefined on failure.
         */
        Object.defineProperty(this, 'getJson', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: async (data) => {
                const {url, ttl, dynamic} = data;
                const instance = this;
                const store = instance[storeSymbol];
                const {settings} = instance[storeSymbol].store();
                const components = jsonCacheComponents();
                const fetchJson = await components.cacheJson({
                    store, settings, req: {url, ttl, dynamic}
                });
                if(fetchJson) return fetchJson;
                return undefined;
            }
        });
        Object.freeze(this['clear']);
        Object.freeze(this['settings']);
        Object.freeze(this['getJson']);
        Object.freeze(this[settingsSymbol]);
        Object.preventExtensions(this);
    }
    /**
     * Private method to initialize or update cache settings.
     * This method is symbolically referenced to ensure it remains private and not directly accessible.
     *
     * @private
     * @param {Object} [settings={}] - Configuration settings for the cache instance.
     * @returns {Object} - The updated settings object after initialization.
     */
    [settingsSymbol](settings = {}) {
        try {
            const instance = this;
            const {cache} = jsonCacheModules.stores;
            let test;
            if(settings.test) {
                test = settings.test;
                delete settings.test
            }
            instance[storeSymbol] = cache(settings);
            Object.freeze(instance[storeSymbol]);
            const components = jsonCacheComponents();
            components.cacheAutoClean({
                cache: instance[storeSymbol], test
            })
            return instance[storeSymbol].store().settings;
        } catch (err) {
            console.error(err);
        }
        return {};
    }
}

/**
 * Initializes and returns a singleton instance of JsonCacheInterface, providing a JSON caching mechanism.
 *
 * This function configures and returns a caching instance designed for JSON data, based on provided settings.
 * It supports custom configurations for the time-to-live (TTL) of cache entries, the minimum TTL, and the autoclean
 * interval for removing expired cache entries. If the cache instance does not exist, it initializes a new one
 * with the given configuration. Otherwise, it returns the existing instance.
 *
 * @function jsonCache
 * @memberof module:JSONCacheStoreModule
 * @param {Object} [config] - Optional configuration settings for the cache instance.
 * @param {number} [config.ttl=300000] - Time To Live (TTL) for cache entries in milliseconds. Defaults to 300,000ms (5 minutes).
 * @param {number} [config.min=60000] - Minimum TTL for cache entries in milliseconds. Defaults to 60,000ms (1 minute).
 * @param {number} [config.clean=15000] - Interval for the autoclean process in milliseconds. Defaults to 15,000ms (15 seconds).
 * @returns {JsonCacheInterface} - The initialized or existing JsonCacheInterface instance.
 */
const jsonCache = (config = {}) => {
    try {
        if(typeof cacheInstance === "undefined") cacheInstance = new JsonCacheInterface(config);
    } catch (err) {
        console.error(err);
    }
    return cacheInstance;
};
/**
 * Prevents further modifications to the jsonCache function, ensuring its configuration remains immutable.
 */
Object.freeze(jsonCache);
/**
 * Exports the jsonCache function as part of the module's public API.
 */
exports = module.exports = { jsonCache };