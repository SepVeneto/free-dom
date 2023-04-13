export * from './EventBus';
export * from './tokens';

export function clamp (value: number, min: number, max = Infinity): number {
  return Math.max(Math.min(value, max), min);
}
