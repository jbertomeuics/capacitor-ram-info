'use strict';

var core = require('@capacitor/core');

const CapacitorRAMInfo = core.registerPlugin('CapacitorRAMInfo', {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.CapacitorRAMInfoWeb()),
});

class CapacitorRAMInfoWeb extends core.WebPlugin {
    async echo(options) {
        console.log('ECHO on web:', options);
        return options;
    }
    async getMemoryInfo() {
        // Sur le web, on peut utiliser performance.memory s'il est disponible
        if ('memory' in performance) {
            const memory = performance.memory;
            return {
                totalRam: memory.jsHeapSizeLimit || 0,
                availableRam: memory.jsHeapSizeLimit - memory.usedJSHeapSize || 0,
                usedRam: memory.usedJSHeapSize || 0,
                threshold: memory.jsHeapSizeLimit * 0.8 || 0,
                isLowMemory: memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8,
                totalRamMB: Math.round((memory.jsHeapSizeLimit || 0) / 1024 / 1024),
                availableRamMB: Math.round(((memory.jsHeapSizeLimit - memory.usedJSHeapSize) || 0) / 1024 / 1024),
                usedRamMB: Math.round((memory.usedJSHeapSize || 0) / 1024 / 1024),
                thresholdMB: Math.round(((memory.jsHeapSizeLimit * 0.8) || 0) / 1024 / 1024),
                usedPercentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100) || 0,
                status: (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) ? "LOW" : "OK"
            };
        }
        // Fallback si performance.memory n'est pas disponible
        throw this.unimplemented('RAM info not available on web platform');
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CapacitorRAMInfoWeb: CapacitorRAMInfoWeb
});

exports.CapacitorRAMInfo = CapacitorRAMInfo;
//# sourceMappingURL=plugin.cjs.js.map
