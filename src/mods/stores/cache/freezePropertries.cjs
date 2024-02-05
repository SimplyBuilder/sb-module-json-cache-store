"use strict";
const freezePropertries = (data) => {
    const {instance, items} = data;
    if(instance && items && items.length >= 1) {
        for (let i = (items.length - 1); i >= 0; i--) {
            const property = items[i];
            if (property) Object.freeze(instance[property]);
        }
    }
};
Object.freeze(freezePropertries);
exports = module.exports = {freezePropertries};