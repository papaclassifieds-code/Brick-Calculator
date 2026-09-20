/**
 * Brick Size Selector Component
 * Allows selection between Standard Brick (190 x 90 x 90 mm) and Custom dimensions in mm.
 */

import { BrickDimensions, BrickPreset, ValidationErrors } from '../types';

interface BrickSizeSelectorProps {
  preset: BrickPreset;
  onPresetChange: (preset: BrickPreset) => void;
  customDimensions: BrickDimensions;
  onCustomChange: (field: keyof BrickDimensions, value: string) => void;
  errors: ValidationErrors;
}

export function BrickSizeSelector({
  preset,
  onPresetChange,
  customDimensions,
  onCustomChange,
  errors,
}: BrickSizeSelectorProps) {
  return (
    <section
      id="section-brick-size"
      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs"
    >
      <div className="flex items-center justify-between mb-3">
        <label
          htmlFor="select-brick-size"
          id="label-brick-size"
          className="text-base sm:text-lg font-bold text-slate-900"
        >
          BRICK SIZE
        </label>
        <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
          Unit: mm
        </span>
      </div>

      <div>
        <select
          id="select-brick-size"
          value={preset}
          onChange={(e) => onPresetChange(e.target.value as BrickPreset)}
          className="w-full px-3.5 py-3 rounded-xl text-base font-medium text-slate-900 bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-colors"
        >
          <option value="standard">Standard Brick (190 × 90 × 90 mm)</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {/* Custom Brick Dimensions Fields (Conditional) */}
      {preset === 'custom' && (
        <div id="container-custom-brick-inputs" className="mt-3.5 pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Enter Custom Brick Dimensions (mm):
          </p>
          <div className="grid grid-cols-3 gap-2">
            {/* Length */}
            <div>
              <label
                htmlFor="input-custom-brick-length"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Length
              </label>
              <div className="relative">
                <input
                  id="input-custom-brick-length"
                  type="number"
                  step="any"
                  min="1"
                  inputMode="decimal"
                  placeholder="190"
                  value={customDimensions.lengthMm}
                  onChange={(e) => onCustomChange('lengthMm', e.target.value)}
                  className={`w-full px-2.5 py-2 pr-6 rounded-lg text-sm text-slate-900 bg-slate-50 border ${
                    errors.brickLength
                      ? 'border-red-500'
                      : 'border-slate-300 focus:border-orange-600'
                  } focus:bg-white focus:outline-none`}
                />
                <span className="absolute inset-y-0 right-0 pr-1.5 flex items-center pointer-events-none text-[10px] text-slate-700">
                  mm
                </span>
              </div>
              {errors.brickLength && (
                <p id="error-custom-brick-length" className="text-[10px] text-red-600 mt-0.5">
                  {errors.brickLength}
                </p>
              )}
            </div>

            {/* Width */}
            <div>
              <label
                htmlFor="input-custom-brick-width"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Width
              </label>
              <div className="relative">
                <input
                  id="input-custom-brick-width"
                  type="number"
                  step="any"
                  min="1"
                  inputMode="decimal"
                  placeholder="90"
                  value={customDimensions.widthMm}
                  onChange={(e) => onCustomChange('widthMm', e.target.value)}
                  className={`w-full px-2.5 py-2 pr-6 rounded-lg text-sm text-slate-900 bg-slate-50 border ${
                    errors.brickWidth
                      ? 'border-red-500'
                      : 'border-slate-300 focus:border-orange-600'
                  } focus:bg-white focus:outline-none`}
                />
                <span className="absolute inset-y-0 right-0 pr-1.5 flex items-center pointer-events-none text-[10px] text-slate-700">
                  mm
                </span>
              </div>
              {errors.brickWidth && (
                <p id="error-custom-brick-width" className="text-[10px] text-red-600 mt-0.5">
                  {errors.brickWidth}
                </p>
              )}
            </div>

            {/* Height */}
            <div>
              <label
                htmlFor="input-custom-brick-height"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Height
              </label>
              <div className="relative">
                <input
                  id="input-custom-brick-height"
                  type="number"
                  step="any"
                  min="1"
                  inputMode="decimal"
                  placeholder="90"
                  value={customDimensions.heightMm}
                  onChange={(e) => onCustomChange('heightMm', e.target.value)}
                  className={`w-full px-2.5 py-2 pr-6 rounded-lg text-sm text-slate-900 bg-slate-50 border ${
                    errors.brickHeight
                      ? 'border-red-500'
                      : 'border-slate-300 focus:border-orange-600'
                  } focus:bg-white focus:outline-none`}
                />
                <span className="absolute inset-y-0 right-0 pr-1.5 flex items-center pointer-events-none text-[10px] text-slate-700">
                  mm
                </span>
              </div>
              {errors.brickHeight && (
                <p id="error-custom-brick-height" className="text-[10px] text-red-600 mt-0.5">
                  {errors.brickHeight}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
