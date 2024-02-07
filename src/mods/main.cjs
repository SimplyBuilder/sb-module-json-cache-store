"use strict";
/**
 * @module jsonCacheModules
 * @description Provides a centralized access point to various JSON caching functionalities,
 * including components for managing cache entries and stores for handling cache data storage.
 *
 * This module aggregates caching-related functionalities by importing and initializing
 * the necessary components and stores from separate modules. The resulting `jsonCacheModules`
 * object offers a cohesive interface to interact with different aspects of JSON caching,
 * such as components for cache manipulation and stores for data persistence.
 *
 * The `jsonCacheModules` object is frozen to prevent modifications, ensuring its integrity
 * and stability across the application.
 */

/**
 * Requires and initializes the JSON cache stores.
 *
 * @const jsonCacheStores
 * @type {Object}
 */
const {jsonCacheStores} = require("./stores/main.cjs");
/**
 * Requires and initializes the JSON cache components.
 *
 * @const jsonCacheComponents
 * @type {Object}
 */
const {jsonCacheComponents} = require("./components/main.cjs");
/**
 * Aggregates and exposes the initialized JSON cache components and stores.
 *
 * @const jsonCacheModules
 * @type {Object}
 * @property {Object} components - The initialized JSON cache components.
 * @property {Object} stores - The initialized JSON cache stores.
 */
const jsonCacheModules = {
    components: jsonCacheComponents(),
    stores: jsonCacheStores()
};
/**
 * Freezes the `jsonCacheModules` object to prevent any modifications, ensuring its
 * contents remain stable and unchanged throughout the application lifecycle.
 */
Object.freeze(jsonCacheModules);
/**
 * Exports the `jsonCacheModules` object, providing access to JSON cache components
 * and stores through a unified interface.
 */
exports = module.exports = { jsonCacheModules };