"use strict";
/**
 * Provides utility functions for item manipulation within a cache store, including getting,
 * adding, and removing items, as well as checking for their existence.
 * This module also includes a function to dynamically define these utilities as methods
 * on instances of the CacheStoreInterface class, ensuring these methods are tailored
 * to operate within the context of a specific cache store instance.
 *
 * @module CacheItemUtilities
 */

/**
 * Imports item manipulation functions from separate modules.
 *
 * @const {Function} getItem - Retrieves an item from the cache store by key.
 * @const {Function} addItem - Adds a new item to the cache store.
 * @const {Function} remItem - Removes an item from the cache store by key.
 * @const {Function} hasItem - Checks if an item exists in the cache store by key.
 */
const {getItem} = require("./getItem.cjs");
const {addItem} = require("./addItem.cjs");
const {remItem} = require("./remItem.cjs");
const {hasItem} = require("./hasItem.cjs");
/**
 * A common descriptor to be used for all class properties defined.
 * This sets the properties to be enumerable but not configurable or writable,
 * ensuring that they are exposed for iteration but cannot be modified or deleted.
 */
const descriptor = {
    enumerable: true,
    configurable: false,
    writable: false
};
/**
 * A list of class properties related to cache item manipulation, each associated with
 * a specific utility function.
 */
const classPropertries = [
    {name: 'hasItem', descriptor, func: hasItem},
    {name: 'getItem', descriptor, func: getItem},
    {name: 'addItem', descriptor, func: addItem},
    {name: 'remItem', descriptor, func: remItem}
];
/**
 * Dynamically defines methods on instances of the CacheStoreInterface class for cache item manipulation.
 * This function iterates over the predefined class properties, associating each with the corresponding
 * utility function. It ensures that these methods operate with the context of the specific instance.
 *
 * @function definePropertries
 * @param {CacheStoreInterface} instance - The cache store interface instance on which to define the properties.
 */
const definePropertries = (instance) => {
    try {
        if (instance && (instance.instanceOf === 'CacheStoreInterface')) {
            const items = classPropertries;
            for (let i = (items.length - 1); i >= 0; i--) {
                const item = items[i];
                if (item) {
                    let value;
                    if (item.func) value = (data) => item.func({...data, instance});
                    Object.defineProperty(instance, item.name, {
                        ...item.descriptor, value
                    });
                }
            }
        }
    } catch {}
};
/**
 * Freezes the `definePropertries` function to prevent modifications, ensuring its implementation remains constant.
 */
Object.freeze(definePropertries);
/**
 * Exports the `definePropertries` function, making it available for use in defining item manipulation methods
 * on cache store interface instances.
 */
exports = module.exports = {definePropertries};