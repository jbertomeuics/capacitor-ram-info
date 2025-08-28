import { registerPlugin } from '@capacitor/core';
const CapacitorRAMInfo = registerPlugin('CapacitorRAMInfo', {
    web: () => import('./web').then((m) => new m.CapacitorRAMInfoWeb()),
});
export * from './definitions';
export { CapacitorRAMInfo };
//# sourceMappingURL=index.js.map