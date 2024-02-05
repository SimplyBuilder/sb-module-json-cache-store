"use strict";

let cacheInstance;

const {jsonCacheModules} = require("./mods/main.cjs");

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
                const store = instance[storeSymbol].store();
                store.cache.clear();
            }
        });
        Object.defineProperty(this, 'settings', {
            enumerable: true,
            get () {
                const instance = this;
                const settingsStore = instance[storeSymbol].store().settings;
                if(settingsStore) return settingsStore;
                return {};
            }
        });
        Object.freeze(this['clear']);
        Object.freeze(this['settings']);
        Object.freeze(this[settingsSymbol]);
        Object.preventExtensions(this);
    }
    [settingsSymbol](settings) {
        try {
            const store = jsonCacheModules.stores();
            this[storeSymbol] = store.cache(settings);
            Object.freeze(this[storeSymbol]);
            return settings;
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