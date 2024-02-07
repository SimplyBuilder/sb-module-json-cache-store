"use strict";
/**
 * Manages automatic cleaning of expired items from the cache.
 * This module includes functionalities to start and stop an autoclean task that periodically
 * checks for and removes expired items from the cache based on their TTL (Time To Live).
 *
 * @module CacheAutoClean
 */

/**
 * Stores internal state for the autoclean process, including task scheduling and test configurations.
 */
const internalStore = {
    task: {
        enable: false,
        schedule: undefined
    }
};
/**
 * Clears any scheduled autoclean task, effectively stopping the autoclean process.
 *
 * @function clearSchedule
 * @returns {boolean} Always returns true, indicating the schedule has been cleared.
 */
const clearSchedule = () => {
    try {
        const timer = internalStore.task.schedule;
        if (timer) clearTimeout(timer);
    } catch {}
    internalStore.task.enable = false;
    internalStore.task.schedule = undefined;
    if(internalStore.test) console.log("autoclean test: clearSchedule done");
    return true;
};
/**
 * Iterates over cache items and removes those that have expired based on their TTL.
 *
 * @function removeItems
 * @returns {boolean} Always returns true, indicating the removal process has completed.
 */
const removeItems = () => {
    try {
        const {cache} = internalStore;
        const now = Date.now();
        const store = cache.store().items;
        const items = Array.from(store.values());
        items.forEach((value) => {
            const {key} = value;
            if (key && value) {
                const age = now - value.timestamp;
                if (age >= value.ttl) {
                    store.delete(key);
                    if (internalStore.test) console.log("autoclean test: item expired", key);
                }
            }
        });
        if (internalStore.test) console.log("autoclean test: removeItems done");
    } catch (err) {
        console.error(err);
    }
    return true;
};
/**
 * Initiates the autoclean process by scheduling the removeItems task at intervals
 * specified by the cache settings. If a test mode is enabled, it also handles test logic.
 *
 * @function startAutoClean
 * @returns {boolean} Always returns true, indicating the autoclean process has been started.
 */
const startAutoClean = () => {
    const {clean} = internalStore.settings;
    if (clearSchedule()) {
        if (internalStore.test) {
            internalStore.task.enable = true;
            internalStore.task.schedule = setTimeout(() => {
                if (internalStore.test.limit >= internalStore.test.next) {
                    console.log("autoclean test:", internalStore.test.next);
                    internalStore.test.next++;
                    if(internalStore.test.next >= 2) removeItems();
                    startAutoClean();
                } else console.log("autoclean test: startAutoClean done");
            }, internalStore.test.interval);
        } else if (clean && removeItems()) {
            internalStore.task.enable = true;
            internalStore.task.schedule = setTimeout(() => {
                startAutoClean();
            }, Number(clean));
        }
    }
    return true;
};
/**
 * Stops the autoclean process and optionally rechecks to ensure the task is stopped.
 *
 * @function stopAutoClean
 * @param {boolean} recheck - Optional parameter to trigger a recheck for stopping the task.
 * @returns {boolean} Always returns true, indicating the autoclean process has been stopped.
 */
const stopAutoClean = (recheck = false) => {
    try {
        if ((internalStore.task.enable) && (clearSchedule())) return stopAutoClean(true);
        if (recheck) {
            setTimeout(() => {
                stopAutoClean();
            }, 1000);
        }
    } catch {}
    return true;
};
/**
 * Defines test types and associated logic for running autoclean in a test environment.
 */
const testTypes = {
    "boolean": (data) => {
        console.log("autoclean test: start from main done");
        if(data) return true;
    },
    "object": (data) => {
        internalStore['test'] = data;
        if(clearSchedule()) startAutoClean();
        return true;
    }
}
/**
 * Initializes and manages the autoclean functionality for cache items. It configures
 * the autoclean process based on cache settings and optional test parameters.
 *
 * @function cacheAutoClean
 * @param {Object} data - Configuration and parameters for autoclean, including cache instance and test settings.
 * @returns {boolean} Always returns true, indicating the autoclean has been configured or started.
 */
const cacheAutoClean = (data) => {
    const {cache, test} = data;
    const stores = cache.store();
    internalStore['settings'] = stores.settings;
    internalStore['cache'] = cache;
    if(testTypes[typeof test]) return testTypes[typeof test](test);
    if(clearSchedule()) startAutoClean();
    return true;
};
/**
 * Freezes the `cacheAutoClean` function to prevent modifications, ensuring the integrity
 * and reliability of the automatic cache cleaning mechanism.
 */
Object.freeze(cacheAutoClean);
/**
 * Exports the `cacheAutoClean` function, making it available for managing automatic
 * cache cleaning within other parts of the application. This function is essential for
 * maintaining an efficient and optimized cache by automatically removing expired items.
 */
exports = module.exports = { cacheAutoClean };