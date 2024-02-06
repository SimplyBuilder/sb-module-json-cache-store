"use strict";

const internalStore = {
    task: {
        enable: false,
        schedule: undefined
    }
};

const clearSchedule = () => {
    try {
        const timer = internalStore.task.schedule;
        if (timer) clearTimeout(timer);
    } catch {}
    internalStore.task.enable = false;
    internalStore.task.schedule = undefined;
    if(internalStore.test) console.log("autoclean test: clearSchedule done");
    return true;
};

const removeItems = () => {
    try {
        const {cache} = internalStore;
        const now = Date.now();
        const store = cache.store().items;
        const items = Array.from(store.values());
        items.forEach((value) => {
            const {key} = value;
            if (key && value) {
                const age = now - value.timestamp;
                if (age >= value.ttl) {
                    store.delete(key);
                    if (internalStore.test) console.log("autoclean test: item expired", key);
                }
            }
        });
        if (internalStore.test) console.log("autoclean test: removeItems done");
    } catch (err) {
        console.error(err);
    }
    return true;
};

const startAutoClean = () => {
    const {clean} = internalStore.settings;
    if (clearSchedule()) {
        if (internalStore.test) {
            internalStore.task.enable = true;
            internalStore.task.schedule = setTimeout(() => {
                if (internalStore.test.limit >= internalStore.test.next) {
                    console.log("autoclean test:", internalStore.test.next);
                    internalStore.test.next++;
                    if(internalStore.test.next >= 2) removeItems();
                    startAutoClean();
                } else console.log("autoclean test: startAutoClean done");
            }, internalStore.test.interval);
        } else if (clean && removeItems()) {
            internalStore.task.enable = true;
            internalStore.task.schedule = setTimeout(() => {
                startAutoClean();
            }, Number(clean));
        }
    }
    return true;
};

const stopAutoClean = (recheck = false) => {
    try {
        if ((internalStore.task.enable) && (clearSchedule())) return stopAutoClean(true);
        if (recheck) {
            setTimeout(() => {
                stopAutoClean();
            }, 1000);
        }
    } catch {}
    return true;
};

const testTypes = {
    "boolean": (data) => {
        console.log("autoclean test: start from main done");
        if(data) return true;
    },
    "object": (data) => {
        internalStore['test'] = data;
        if(clearSchedule()) startAutoClean();
        return true;
    }
}

const cacheAutoClean = (data) => {
    const {cache, test} = data;
    const stores = cache.store();
    internalStore['settings'] = stores.settings;
    internalStore['cache'] = cache;
    if(testTypes[typeof test]) return testTypes[typeof test](test);
    if(clearSchedule()) startAutoClean();
    return true;
};

Object.freeze(cacheAutoClean);
exports = module.exports = { cacheAutoClean };