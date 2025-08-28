import { registerPlugin } from '@capacitor/core';

import type { CapacitorRAMInfoPlugin } from './definitions';

const CapacitorRAMInfo = registerPlugin<CapacitorRAMInfoPlugin>('CapacitorRAMInfo', {
  web: () => import('./web').then((m) => new m.CapacitorRAMInfoWeb()),
});

export * from './definitions';
export { CapacitorRAMInfo };
