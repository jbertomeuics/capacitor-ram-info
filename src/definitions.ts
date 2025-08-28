export interface CapacitorRAMInfoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
