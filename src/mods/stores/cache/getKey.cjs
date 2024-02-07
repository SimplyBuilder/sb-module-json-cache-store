"use strict";
/**
 * Provides utility functions for generating unique identifiers and keys.
 * This module includes methods for creating unique instance identifiers and generating
 * hash-based keys for items. It leverages cryptographic functions to ensure uniqueness
 * and reliability of the generated values.
 *
 * @module KeyUtilities
 */

const {randomUUID, subtle} = require("uncrypto");
const {sha256base64} = require("ohash");
/**
 * Generates a unique identifier for cache store instances.
 * Utilizes the `randomUUID` function from the "uncrypto" package to generate a UUID,
 * which is then prefixed with "instanceId-" to create a unique identifier for cache instances.
 *
 * @function getUUID
 * @returns {string|undefined} A unique identifier for a cache store instance, or undefined on error.
 */
const getUUID = () => {
    try {
        const key = randomUUID();
        if(key) return "instanceId-"+key;
    } catch (err) {
        console.error(err);
    }
    return undefined;
};

/**
 * Generates a unique key for caching items based on provided data.
 * Converts the input data to a string, trims it, and then uses the `sha256base64` function
 * from the "ohash" package to generate a SHA-256 hash in base64 encoding. This hash is
 * prefixed with "itemId-" to create a unique key for cache items.
 *
 * @function getKey
 * @param {string|number} data - The data from which to generate a cache key.
 * @returns {string|undefined} A unique key for a cache item, or undefined on error.
 */
const getKey = (data) => {
    try {
        if(typeof data === "string" || typeof data === "number") {
            const id = data.toString().trim();
            if(id && id.length >= 1) {
                const key = sha256base64(id);
                if(key) return "itemId-"+ key;
            }
        }
    } catch (err){
        console.error(err);
    }
    return undefined;
};
/**
 * A collection of utility methods for generating identifiers and keys.
 * This object consolidates the `getKey` and `getUUID` functions for easy access
 * and use within other parts of the application.
 *
 * @const methods
 * @type {Object}
 * @property {Function} getKey - Generates a unique key for cache items.
 * @property {Function} getUUID - Generates a unique identifier for cache instances.
 */
const methods = {
    getKey, getUUID
};
/**
 * Freezes the `methods` object to prevent any modifications, ensuring the integrity
 * and reliability of the utility functions for generating identifiers and keys.
 */
Object.freeze(methods);
/**
 * Exports the `methods` object, making the `getKey` and `getUUID` functions available
 * for use in managing cache keys and instance identifiers within the application.
 */
exports = module.exports = methods;