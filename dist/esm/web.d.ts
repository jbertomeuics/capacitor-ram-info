import { WebPlugin } from '@capacitor/core';
import type { CapacitorRAMInfoPlugin, MemoryInfo } from './definitions';
export declare class CapacitorRAMInfoWeb extends WebPlugin implements CapacitorRAMInfoPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    getMemoryInfo(): Promise<MemoryInfo>;
}
