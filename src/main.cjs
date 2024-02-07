"use strict";

let cacheInstance;

const {jsonCacheModules} = require("./mods/main.cjs");
const {jsonCacheComponents} = require("./mods/components/main.cjs");

const settingsSymbol = Symbol("settings");
const storeSymbol = Symbol("store");

class JsonCacheInterface {
    constructor(settings) {
        this[storeSymbol] = {};
        this[settingsSymbol](settings);
        Object.defineProperty(this, storeSymbol, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        Object.defineProperty(this, settingsSymbol, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        Object.defineProperty(this, 'clear', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: () => {
                const instance = this;
                return instance[storeSymbol].clear();
            }
        });
        Object.defineProperty(this, 'settings', {
            enumerable: true,
            get () {
                const instance = this;
                const {settings} = instance[storeSymbol].store();
                if(settings) return settings;
                return {};
            }
        });
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
    [settingsSymbol](settings) {
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
const jsonCache = (config) => {
    try {
        if(typeof cacheInstance === "undefined") cacheInstance = new JsonCacheInterface(config);
    } catch (err) {
        console.error(err);
    }
    return cacheInstance;
};
Object.freeze(jsonCache);
exports = module.exports = { jsonCache };