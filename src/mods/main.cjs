"use strict";

const {jsonCacheStores} = require("./stores/main.cjs");
const {jsonCacheComponents} = require("./components/main.cjs");

const jsonCacheModules = {
    components: jsonCacheComponents,
    stores: jsonCacheStores
};
Object.freeze(jsonCacheModules);
exports = module.exports = { jsonCacheModules };