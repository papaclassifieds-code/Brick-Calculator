/**
 * Brick Calculator Engine
 *
 * Implements SI-based civil engineering brickwork estimation formulas:
 * 1. Wall Volume = L * H * T (m³)
 * 2. Brickwork Volume = Wall Volume (m³)
 * 3. Modular Brick Volume = (L + joint) * (W + joint) * (H + joint)
 * 4. Number of Bricks = Brickwork Volume / Modular Brick Volume
 * 5. Mortar Volume = Brickwork Volume - Solid Bricks Volume
 * 6. Dry Mortar Volume = Wet Mortar Volume * 1.33
 * 7. Cement Weight = Dry Mortar Volume * (1 / (1 + ratioPart)) * 1440 kg/m³
 * 8. Cement Bags = Cement Weight / 50 kg
 */

import {
  BrickDimensions,
  CalculationResults,
  MortarRatio,
  WallDimensions,
} from './types';

// Engineering constants
export const MORTAR_JOINT_MM = 10;
export const CEMENT_BAG_KG = 50;
export const CEMENT_DENSITY_KG_M3 = 1440; // Standard density of OPC
export const DRY_MORTAR_CONVERSION_FACTOR = 1.33; // 33% addition for voids, compaction & wastage
export const CU_METERS_TO_CU_FEET = 35.3147;

// Unit conversions to meters
export function feetToMeters(feet: number): number {
  return feet * 0.3048;
}

export function inchesToMeters(inches: number): number {
  return inches * 0.0254;
}

export function millimetersToMeters(mm: number): number {
  return mm / 1000;
}

export function cubicMetersToCubicFeet(m3: number): number {
  return m3 * CU_METERS_TO_CU_FEET;
}

/**
 * Calculates total wall volume in cubic meters.
 */
export function calculateWallVolume(
  lengthFt: number,
  heightFt: number,
  thicknessIn: number
): number {
  const lengthM = feetToMeters(lengthFt);
  const heightM = feetToMeters(heightFt);
  const thicknessM = inchesToMeters(thicknessIn);
  return lengthM * heightM * thicknessM;
}

/**
 * Calculates individual solid brick volume in cubic meters.
 */
export function calculateBrickVolume(
  lengthMm: number,
  widthMm: number,
  heightMm: number
): number {
  const lM = millimetersToMeters(lengthMm);
  const wM = millimetersToMeters(widthMm);
  const hM = millimetersToMeters(heightMm);
  return lM * wM * hM;
}

/**
 * Calculates total brickwork volume in cubic meters.
 * In standard masonry estimation, Brickwork Volume equals Wall Volume.
 */
export function calculateBrickworkVolume(wallVolumeM3: number): number {
  return wallVolumeM3;
}

/**
 * Calculates the estimated number of bricks required, accounting for mortar joint.
 * Modular brick volume = (L + joint) * (W + joint) * (H + joint)
 */
export function calculateBrickQuantity(
  wallVolumeM3: number,
  brickLengthMm: number,
  brickWidthMm: number,
  brickHeightMm: number,
  jointMm: number = MORTAR_JOINT_MM
): number {
  const modularLengthM = millimetersToMeters(brickLengthMm + jointMm);
  const modularWidthM = millimetersToMeters(brickWidthMm + jointMm);
  const modularHeightM = millimetersToMeters(brickHeightMm + jointMm);

  const modularBrickVolumeM3 =
    modularLengthM * modularWidthM * modularHeightM;

  if (modularBrickVolumeM3 <= 0) return 0;
  const count = wallVolumeM3 / modularBrickVolumeM3;
  return Math.ceil(count);
}

/**
 * Calculates the wet and dry mortar quantity.
 * Mortar Volume = Brickwork Volume - (Number of Bricks * Solid Brick Volume)
 */
export function calculateMortarQuantity(
  brickworkVolumeM3: number,
  numberOfBricks: number,
  solidBrickVolumeM3: number,
  dryFactor: number = DRY_MORTAR_CONVERSION_FACTOR
): { wetMortarM3: number; dryMortarM3: number } {
  const solidBricksTotalM3 = numberOfBricks * solidBrickVolumeM3;
  const wetMortarM3 = Math.max(0, brickworkVolumeM3 - solidBricksTotalM3);
  const dryMortarM3 = wetMortarM3 * dryFactor;
  return { wetMortarM3, dryMortarM3 };
}

/**
 * Calculates cement requirement based on mortar mix ratio (Cement : Sand).
 * Ratios: 1:4 (5 parts), 1:5 (6 parts), 1:6 (7 parts)
 */
export function calculateCementRequirement(
  dryMortarM3: number,
  ratio: MortarRatio,
  bagWeightKg: number = CEMENT_BAG_KG,
  cementDensity: number = CEMENT_DENSITY_KG_M3
): { bags: number; weightKg: number } {
  let sandParts = 6;
  if (ratio === '1:4') sandParts = 4;
  else if (ratio === '1:5') sandParts = 5;
  else if (ratio === '1:6') sandParts = 6;

  const totalParts = 1 + sandParts;
  const cementVolumeM3 = dryMortarM3 * (1 / totalParts);
  const weightKg = cementVolumeM3 * cementDensity;
  const bags = bagWeightKg > 0 ? Math.ceil(weightKg / bagWeightKg) : 0;

  return { bags, weightKg };
}

/**
 * Orchestrator function to execute complete calculation workflow.
 */
export function calculateAllMaterials(
  wall: WallDimensions,
  brick: BrickDimensions,
  ratio: MortarRatio
): CalculationResults {
  const lengthFt = parseFloat(wall.lengthFt);
  const heightFt = parseFloat(wall.heightFt);
  const thicknessIn = parseFloat(wall.thicknessIn);

  const brickLengthMm = parseFloat(brick.lengthMm);
  const brickWidthMm = parseFloat(brick.widthMm);
  const brickHeightMm = parseFloat(brick.heightMm);

  const wallVolM3 = calculateWallVolume(lengthFt, heightFt, thicknessIn);
  const brickworkVolM3 = calculateBrickworkVolume(wallVolM3);
  const solidBrickVolM3 = calculateBrickVolume(
    brickLengthMm,
    brickWidthMm,
    brickHeightMm
  );

  const numBricks = calculateBrickQuantity(
    brickworkVolM3,
    brickLengthMm,
    brickWidthMm,
    brickHeightMm,
    MORTAR_JOINT_MM
  );

  const { wetMortarM3, dryMortarM3 } = calculateMortarQuantity(
    brickworkVolM3,
    numBricks,
    solidBrickVolM3,
    DRY_MORTAR_CONVERSION_FACTOR
  );

  const { bags, weightKg } = calculateCementRequirement(
    dryMortarM3,
    ratio,
    CEMENT_BAG_KG,
    CEMENT_DENSITY_KG_M3
  );

  return {
    numberOfBricks: numBricks,
    wallVolumeM3: wallVolM3,
    wallVolumeCuFt: cubicMetersToCubicFeet(wallVolM3),
    brickworkVolumeM3: brickworkVolM3,
    brickworkVolumeCuFt: cubicMetersToCubicFeet(brickworkVolM3),
    wetMortarM3,
    dryMortarM3,
    cementBags: bags,
    cementWeightKg: weightKg,
    assumptions: {
      brickSizeDisplay: `${brickLengthMm} × ${brickWidthMm} × ${brickHeightMm} mm`,
      mortarJointMm: MORTAR_JOINT_MM,
      mortarRatio: ratio,
      cementBagKg: CEMENT_BAG_KG,
      dryMortarFactor: DRY_MORTAR_CONVERSION_FACTOR,
      cementDensityKgM3: CEMENT_DENSITY_KG_M3,
    },
  };
}
