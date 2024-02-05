"use strict";

const {getUUID, getKey} = require("./getKey.cjs");
const {definePropertries} = require("./definePropertries.cjs");
const {freezePropertries} = require("./freezePropertries.cjs");

const cacheStoreIdSymbol = Symbol("cacheStoreId");
const cacheStoreItemsSymbol = Symbol("cacheStoreItems");
const cacheStoreSettingsSymbol = Symbol("cacheStoreSettings");

let cacheInstance;
const CacheStore = {};

const settingsModel = {
    ttl: (1000 * 60 * 5),
    min: (1000 * 60),
    clean: (1000 * 15)
};

class CacheStoreInterface {
    constructor(storeInstance) {
        this[cacheStoreIdSymbol] = storeInstance;
        Object.freeze(this[cacheStoreIdSymbol]);
        Object.defineProperty(this, cacheStoreIdSymbol, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        Object.defineProperty(this, 'store', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                const instance = this;
                return {
                    items: CacheStore[instance[cacheStoreIdSymbol]][cacheStoreItemsSymbol],
                    settings: CacheStore[instance[cacheStoreIdSymbol]][cacheStoreSettingsSymbol],
                };
            }
        });
        Object.defineProperty(this, 'instanceId', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: () => {
                const instance = this;
                return instance[cacheStoreIdSymbol];
            }
        });
        Object.defineProperty(this, 'getKey', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: (data) => getKey(data)
        });
        Object.defineProperty(this, 'instanceOf', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: new.target.name
        });
        Object.defineProperty(this, 'list', {
            enumerable: true,
            configurable: false,
            get() {
                const instance = this;
                const store = CacheStore[instance[cacheStoreIdSymbol]];
                return Array.from(store[cacheStoreItemsSymbol].keys());
            }
        });
        Object.defineProperty(this, 'clear', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                const instance = this;
                const store = CacheStore[instance[cacheStoreIdSymbol]];
                store[cacheStoreItemsSymbol].clear();
                return store[cacheStoreItemsSymbol].size;
            }
        });
        definePropertries(this);
        freezePropertries({
            instance: this,
            items: [...Object.getOwnPropertyNames(this)]
        });
        Object.preventExtensions(this);
    }
    test() {
        return true;
    }
}

Object.defineProperty(CacheStoreInterface, Symbol.hasInstance, {
    get: () => {
        return (instance) => {
            return instance.constructor.name === instance.instanceOf
        }
    }
});
const settingsPopulate = (data) => {
    const schema = {...settingsModel, ...data};
    if((1000 * 60) > schema.ttl) schema.ttl = settingsModel.ttl;
    if((1000 * 60) > schema.min) schema.min = settingsModel.min;
    if((1000 * 5) > schema.clean) schema.clean = settingsModel.clean;
    return schema;
};
const prepareInstance = (data = {}) => {
    const instanceId = getUUID();
    if(CacheStore[instanceId]) return undefined;
    CacheStore[instanceId] = {
        [cacheStoreIdSymbol]: instanceId,
        [cacheStoreSettingsSymbol]: settingsPopulate(data),
        [cacheStoreItemsSymbol]: new Map()
    };
    return instanceId;
};
const cache = (data = {}) => {
    try {
        const storeInstance = prepareInstance(data);
        if (typeof cacheInstance === "undefined" && storeInstance) {
            cacheInstance = new CacheStoreInterface(storeInstance);
        }
    } catch (err) {
        console.error(err);
    }
    return cacheInstance;
};

Object.freeze(cache);
exports = module.exports = { cache };