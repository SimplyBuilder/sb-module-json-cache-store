"use strict";

const {randomUUID, subtle} = require("uncrypto");
const {sha256base64} = require("ohash");
const getUUID = () => {
    try {
        const key = randomUUID();
        if(key) return "instanceId-"+key;
    } catch (err) {
        console.error(err);
    }
    return undefined;
};
const getKey = (data) => {
    try {
        if(typeof data === "string" || typeof data === "number") {
            const id = data.toString().trim();
            if(id && id.length >= 1) {
                const key = sha256base64(id);
                if(key) return "itemId-"+ key;
            }
        }
    } catch (err){
        console.error(err);
    }
    return undefined;
};
const methods = {
    getKey, getUUID
};
Object.freeze(methods);
exports = module.exports = methods;