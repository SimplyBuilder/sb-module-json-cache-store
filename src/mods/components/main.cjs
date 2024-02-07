"use strict";
/**
 * Aggregates and provides access to various components essential for JSON caching operations.
 * This module imports functionalities such as caching JSON data and automatically cleaning the cache,
 * then exposes these functionalities through a unified interface. The `jsonCacheComponents` function
 * facilitates easy integration of these caching mechanisms into other parts of the application, enhancing
 * data management and performance.
 *
 * @module JsonCacheComponents
 */

/**
 * Imports essential caching functionalities from separate modules.
 *
 * @const {Function} cacheJson - Functionality for caching JSON data.
 * @const {Function} cacheAutoClean - Functionality for automatically cleaning up expired cache entries.
 */
const {cacheJson} = require("./cacheJson/main.cjs");
const {cacheAutoClean} = require("./cacheAutoClean/main.cjs");

/**
 * Initializes and returns an object containing JSON caching functionalities.
 * This function consolidates various JSON caching components into a single object,
 * making them accessible through a unified interface. It simplifies the process of
 * utilizing these components throughout the application.
 *
 * @function jsonCacheComponents
 * @returns {Object} An object containing the `cacheAutoClean` and `cacheJson` functionalities.
 */
const jsonCacheComponents = () => {
    return {
        cacheAutoClean, cacheJson
    };
};

/**
 * Freezes the `jsonCacheComponents` function to prevent any modifications, ensuring the stability
 * and reliability of the caching components provided. This action reinforces the immutability
 * principle, keeping the components' configurations and functionalities consistent across the application.
 */
Object.freeze(jsonCacheComponents);

/**
 * Exports the `jsonCacheComponents` function, making the JSON caching functionalities available
 * for integration and use within other parts of the application. This approach facilitates a modular
 * and efficient caching system, allowing for effective data management and performance optimization.
 */
exports = module.exports = { jsonCacheComponents };
