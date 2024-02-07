"use strict";
/**
 * @module jsonCacheStores
 * @description Exports a function that provides access to various caching functionalities.
 * This module specifically focuses on returning an object containing the `cache` functionality,
 * allowing for flexible cache management and operations within the application.
 *
 * The `cache` functionality is imported from a separate module and is designed to handle
 * data storage, retrieval, and management in an efficient manner. By encapsulating this
 * functionality within `jsonCacheStores`, the module offers a streamlined interface for
 * interacting with the cache system.
 *
 * To ensure the integrity and stability of the returned `cache` object, `jsonCacheStores`
 * is frozen, preventing any modifications to its structure or functionality.
 */

/**
 * Requires the cache functionality from the specified module.
 *
 * @const cache
 * @type {Object}
 */
const {cache} = require("./cache/main.cjs");
/**
 * Provides an accessor function to the cache functionalities.
 *
 * @function jsonCacheStores
 * @returns {Object} An object containing the `cache` functionality, allowing for direct interaction with the cache system.
 */
const jsonCacheStores = () => {
    return {
        cache
    };
};
/**
 * Freezes the `jsonCacheStores` function to prevent any modifications, ensuring that
 * the cache functionality remains consistent and reliable throughout the application lifecycle.
 */
Object.freeze(jsonCacheStores);
/**
 * Exports the `jsonCacheStores` function, making it available for importing in other parts of the application.
 * This approach modularizes cache management, enabling easy integration and use of caching features.
 */
exports = module.exports = { jsonCacheStores };