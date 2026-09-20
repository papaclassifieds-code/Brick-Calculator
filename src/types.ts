/**
 * Types and interfaces for the Brick Calculator application.
 */

export type MortarRatio = '1:4' | '1:5' | '1:6';

export type BrickPreset = 'standard' | 'custom';

export interface WallDimensions {
  lengthFt: string;
  heightFt: string;
  thicknessIn: string;
}

export interface BrickDimensions {
  lengthMm: string;
  widthMm: string;
  heightMm: string;
}

export interface CalculationAssumptions {
  brickSizeDisplay: string;
  mortarJointMm: number;
  mortarRatio: string;
  cementBagKg: number;
  dryMortarFactor: number;
  cementDensityKgM3: number;
}

export interface CalculationResults {
  numberOfBricks: number;
  wallVolumeM3: number;
  wallVolumeCuFt: number;
  brickworkVolumeM3: number;
  brickworkVolumeCuFt: number;
  wetMortarM3: number;
  dryMortarM3: number;
  cementBags: number;
  cementWeightKg: number;
  assumptions: CalculationAssumptions;
}

export interface ValidationErrors {
  length?: string;
  height?: string;
  thickness?: string;
  brickLength?: string;
  brickWidth?: string;
  brickHeight?: string;
}
