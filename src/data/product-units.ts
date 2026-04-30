import type { UnitOption } from "./products";

export const SEED_UNITS: UnitOption[] = [
  { label: "1 kg", multiplier: 1 },
  { label: "500 g", multiplier: 0.55 },
  { label: "250 g", multiplier: 0.3 },
  { label: "100 g", multiplier: 0.15 },
];

export const LIQUID_UNITS: UnitOption[] = [
  { label: "1 L", multiplier: 1 },
  { label: "500 ml", multiplier: 0.55 },
  { label: "250 ml", multiplier: 0.3 },
];

export const EQUIP_UNITS: UnitOption[] = [
  { label: "1 pc", multiplier: 1 },
];

export const NUTRITION_UNITS: UnitOption[] = [
  { label: "25 kg", multiplier: 1 },
  { label: "10 kg", multiplier: 0.45 },
  { label: "5 kg", multiplier: 0.25 },
];

export const GRANULE_UNITS: UnitOption[] = [
  { label: "250 g", multiplier: 1 },
  { label: "100 g", multiplier: 0.45 },
  { label: "50 g", multiplier: 0.25 },
];
