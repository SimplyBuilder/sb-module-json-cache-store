"use strict";
/**
 * Freezes specified properties on a given object instance to prevent them from being modified.
 * This function iterates over a list of property names provided in the `items` array and applies
 * `Object.freeze` to each corresponding property on the `instance` object. This ensures the immutability
 * of these properties, enhancing the stability and predictability of the application by preventing
 * unintended modifications.
 *
 * @function freezePropertries
 * @param {Object} data - An object containing the instance to modify and the properties to freeze.
 * @param {Object} data.instance - The object instance on which to freeze the specified properties.
 * @param {Array.<string>} data.items - An array of property names to be frozen on the `instance`.
 */
const freezePropertries = (data) => {
    const {instance, items} = data;
    if(instance && items && items.length >= 1) {
        for (let i = (items.length - 1); i >= 0; i--) {
            const property = items[i];
            if (property) Object.freeze(instance[property]);
        }
    }
};
/**
 * Freezes the `freezePropertries` function itself to prevent any modifications, ensuring
 * that its functionality remains unchanged throughout the application lifecycle. This action
 * reinforces the immutability principle applied by the function to object properties.
 */
Object.freeze(freezePropertries);
/**
 * Exports the `freezePropertries` function, making it available for use within other parts of the application.
 * By providing this function as part of the module's public interface, other components can leverage it
 * to ensure the immutability of specific properties on their object instances, contributing to a more
 * robust and secure application architecture.
 */
exports = module.exports = {freezePropertries};