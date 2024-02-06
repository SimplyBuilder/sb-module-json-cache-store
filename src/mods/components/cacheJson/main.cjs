"use strict";

const { safeDestr } = require("destr");

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
            if(text) return text;
            return undefined;
        }
    } catch (err) {
        console.error(err);
        return undefined;
    }
};
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
const cacheJson = async (data) => {
    try {
        const {store, settings, req} = data;
        if(typeof req.url === "undefined") return undefined;
        const fromCache = store.getItem({url: req.url});
        if(fromCache) return {...fromCache, cache: true};
        const schema = {
            ttl: settings.ttl,
            url: req.url
        };
        if(parseInt(req.ttl) >= settings.min) schema.ttl = parseInt(req.ttl);
        const fromFetch = await fetchJson(req.url);
        if(fromFetch) {
            const obj = safeDestr(fromFetch);
            if(obj) {
                const tosave = JSON.stringify(obj);
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

Object.freeze(cacheJson);
exports = module.exports = { cacheJson };