/**
 * Validation logic for input dimensions.
 */

import { BrickDimensions, BrickPreset, ValidationErrors, WallDimensions } from './types';

export function validateInputs(
  wall: WallDimensions,
  brickPreset: BrickPreset,
  brick: BrickDimensions
): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Wall Length validation
  if (!wall.lengthFt || wall.lengthFt.trim() === '') {
    errors.length = 'Please enter a valid wall length.';
  } else {
    const val = Number(wall.lengthFt);
    if (isNaN(val) || val <= 0) {
      errors.length = 'Please enter a valid wall length greater than 0.';
    }
  }

  // Wall Height validation
  if (!wall.heightFt || wall.heightFt.trim() === '') {
    errors.height = 'Please enter a valid wall height.';
  } else {
    const val = Number(wall.heightFt);
    if (isNaN(val) || val <= 0) {
      errors.height = 'Please enter a valid wall height greater than 0.';
    }
  }

  // Wall Thickness validation
  if (!wall.thicknessIn || wall.thicknessIn.trim() === '') {
    errors.thickness = 'Please enter a valid wall thickness.';
  } else {
    const val = Number(wall.thicknessIn);
    if (isNaN(val) || val <= 0) {
      errors.thickness = 'Please enter a valid wall thickness greater than 0.';
    }
  }

  // Custom brick validation if custom selected
  if (brickPreset === 'custom') {
    if (!brick.lengthMm || brick.lengthMm.trim() === '') {
      errors.brickLength = 'Please enter brick length.';
    } else {
      const val = Number(brick.lengthMm);
      if (isNaN(val) || val <= 0) {
        errors.brickLength = 'Enter a valid brick length (> 0 mm).';
      }
    }

    if (!brick.widthMm || brick.widthMm.trim() === '') {
      errors.brickWidth = 'Please enter brick width.';
    } else {
      const val = Number(brick.widthMm);
      if (isNaN(val) || val <= 0) {
        errors.brickWidth = 'Enter a valid brick width (> 0 mm).';
      }
    }

    if (!brick.heightMm || brick.heightMm.trim() === '') {
      errors.brickHeight = 'Please enter brick height.';
    } else {
      const val = Number(brick.heightMm);
      if (isNaN(val) || val <= 0) {
        errors.brickHeight = 'Enter a valid brick height (> 0 mm).';
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
