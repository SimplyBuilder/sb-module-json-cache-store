"use strict";

const {getItem} = require("./getItem.cjs");
const {addItem} = require("./addItem.cjs");
const {remItem} = require("./remItem.cjs");
const {hasItem} = require("./hasItem.cjs");

const descriptor = {
    enumerable: true,
    configurable: false,
    writable: false
};

const classPropertries = [
    {
        name: 'hasItem',
        descriptor,
        func: hasItem
    },{
        name: 'getItem',
        descriptor,
        func: getItem
    },
    {
        name: 'addItem',
        descriptor,
        func: addItem
    },
    {
        name: 'remItem',
        descriptor,
        func: remItem
    }
];

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
Object.freeze(definePropertries);
exports = module.exports = {definePropertries};