export interface MemoryInfo {
  totalRam: number;
  availableRam: number;
  usedRam: number;
  threshold: number;
  isLowMemory: boolean;
  totalRamMB: number;
  availableRamMB: number;
  usedRamMB: number;
  thresholdMB: number;
  usedPercentage: number;
  status: string;
}

export interface CapacitorRAMInfoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  getMemoryInfo(): Promise<MemoryInfo>;
}