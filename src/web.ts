import { WebPlugin } from '@capacitor/core';

import type { CapacitorRAMInfoPlugin } from './definitions';

export class CapacitorRAMInfoWeb extends WebPlugin implements CapacitorRAMInfoPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
