"use strict";
/**
 * Provides functionality for fetching, caching, and managing JSON data.
 * This module includes functions for fetching JSON from a URL, saving JSON data to a cache,
 * and preparing data for caching based on dynamic conditions and settings.
 *
 * @module JsonCaching
 */


const { safeDestr } = require("destr");

/**
 * Fetches JSON data from a specified URL using the Fetch API.
 * This function attempts to retrieve JSON data from the provided URL, handling the response
 * and converting it to a text format. It also calculates the size of the fetched JSON for potential
 * use in dynamic caching strategies.
 *
 * @async
 * @function fetchJson
 * @param {string} url - The URL from which to fetch JSON data.
 * @returns {Promise<Object|undefined>} A promise that resolves to an object containing the fetched
 * JSON data and its size, or undefined in case of an error or if the data cannot be fetched.
 */
const fetchJson = async (url) => {
    try {
        const requestJson = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "text/plain",
                "Cache-Control": "no-cache",
            },
        });
        if(requestJson?.ok) {
            const text = await requestJson.text();
            if(text) {
                return {
                    json: text,
                    size: new Blob([text]).size
                };
            }
            return undefined;
        }
    } catch (err) {
        console.error(err);
        return undefined;
    }
};
/**
 * Saves JSON data to the cache, based on specified schema and store.
 * This function validates the input schema and utilizes the cache store's addItem method
 * to cache the JSON data with a specified TTL and associated URL.
 *
 * @function saveJson
 * @param {Object} schema - The schema containing JSON data, TTL, URL, and the cache store.
 * @returns {Object|undefined} The cached item object if successful, or undefined on error or if
 * validation fails.
 */
const saveJson = (schema) => {
    try {
        const {json, ttl, url, store} = schema;
        if (typeof json === "undefined"
            || typeof ttl === "undefined" || typeof url === "undefined") return undefined;
        const saveItem = store.addItem({
            json, ttl, url
        });
        if(saveItem) return saveItem;
    } catch {}
    return undefined;
};

/**
 * Prepares the caching schema based on request settings, dynamic conditions, and the size of the JSON data.
 * This function adjusts the TTL for caching based on request parameters, dynamic conditions, and
 * the size of the fetched JSON, ensuring that TTL values meet specified settings.
 *
 * @function prepareSave
 * @param {Object} data - The data containing settings, request parameters, and size of the JSON data.
 * @returns {Object} The prepared schema with adjusted TTL for caching the JSON data.
 */
const prepareSave = (data) => {
    const {settings, req, size} = data;
    const schema = {
        ttl: settings.ttl,
        url: req.url
    };

    if(parseInt(req.ttl) >= settings.min) schema.ttl = parseInt(req.ttl);
    if((req.dynamic && size)
        && (size >= settings.min) && (schema.ttl >= size)) {
        schema.ttl = parseInt(size);
    }
    return schema;
};
/**
 * Main function to cache JSON data. It checks if the requested JSON data is already cached,
 * fetches it from the URL if not, and then caches the data using the specified cache store
 * and settings. It leverages dynamic conditions to adjust caching strategies.
 *
 * @async
 * @function cacheJson
 * @param {Object} data - The data containing the cache store, settings, and request parameters.
 * @returns {Promise<Object|undefined>} A promise that resolves to the cached JSON data object
 * if successful, or undefined on error or if data cannot be cached.
 */
const cacheJson = async (data) => {
    try {
        const {store, settings, req} = data;
        if(typeof req.url === "undefined") return undefined;
        const fromCache = store.getItem({url: req.url});
        if(fromCache) return {...fromCache, cache: true};
        const fromFetch = await fetchJson(req.url);
        if(fromFetch?.json) {
            const obj = safeDestr(fromFetch.json);
            if(obj) {
                const tosave = JSON.stringify(obj);
                const schema = prepareSave({
                    settings, req,
                    size: fromFetch.size
                });
                return saveJson({
                    ...schema,
                    json: tosave,
                    store
                });
            }
        }
    } catch {}
    return undefined;
};
/**
 * Freezes the `cacheJson` function to prevent modifications, ensuring the integrity and
 * reliability of the JSON caching mechanism.
 */
Object.freeze(cacheJson);
/**
 * Exports the `cacheJson` function, making it available for caching JSON data within
 * other parts of the application. This function is essential for efficient data management
 * and performance optimization by leveraging caching strategies.
 */
exports = module.exports = { cacheJson };