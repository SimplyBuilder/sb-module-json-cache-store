"use strict";

const {cache} = require("./cache/main.cjs");

const jsonCacheStores = () => {
    return {
        cache
    };
};
Object.freeze(jsonCacheStores);
exports = module.exports = { jsonCacheStores };