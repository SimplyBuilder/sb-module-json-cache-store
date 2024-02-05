"use strict";

const {cacheJson} = require("./cacheJson/main.cjs");
const {cacheAutoClean} = require("./cacheAutoClean/main.cjs");

const jsonCacheComponents = () => {
    return {
        cacheAutoClean, cacheJson
    };
};
Object.freeze(jsonCacheComponents);
exports = module.exports = { jsonCacheComponents };