/**
 * Wall Dimensions Input Component
 * Captures wall length (ft), height (ft), and thickness (in).
 */

import { ValidationErrors, WallDimensions } from '../types';

interface WallDimensionsInputProps {
  dimensions: WallDimensions;
  onChange: (field: keyof WallDimensions, value: string) => void;
  errors: ValidationErrors;
}

export function WallDimensionsInput({
  dimensions,
  onChange,
  errors,
}: WallDimensionsInputProps) {
  return (
    <section id="section-wall-dimensions" className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <h2 id="wall-dimensions-title" className="text-base sm:text-lg font-bold text-slate-900">
          WALL DIMENSIONS
        </h2>
      </div>

      <div className="space-y-3.5">
        {/* Wall Length */}
        <div id="field-group-length">
          <div className="flex justify-between items-baseline mb-1">
            <label
              htmlFor="input-wall-length"
              className="text-sm font-semibold text-slate-800"
            >
              Wall Length
            </label>
            <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              Default: feet (ft)
            </span>
          </div>
          <div className="relative rounded-xl shadow-2xs">
            <input
              id="input-wall-length"
              type="number"
              step="any"
              min="0"
              inputMode="decimal"
              placeholder="e.g. 10"
              value={dimensions.lengthFt}
              onChange={(e) => onChange('lengthFt', e.target.value)}
              className={`w-full px-3.5 py-3 pr-12 rounded-xl text-base text-slate-900 bg-slate-50 border transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.length
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-slate-300 focus:border-orange-600 focus:ring-orange-200'
              }`}
            />
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-sm font-bold text-slate-700">
              ft
            </span>
          </div>
          {errors.length && (
            <p id="error-wall-length" className="text-xs font-medium text-red-600 mt-1">
              {errors.length}
            </p>
          )}
        </div>

        {/* Wall Height */}
        <div id="field-group-height">
          <div className="flex justify-between items-baseline mb-1">
            <label
              htmlFor="input-wall-height"
              className="text-sm font-semibold text-slate-800"
            >
              Wall Height
            </label>
            <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              Default: feet (ft)
            </span>
          </div>
          <div className="relative rounded-xl shadow-2xs">
            <input
              id="input-wall-height"
              type="number"
              step="any"
              min="0"
              inputMode="decimal"
              placeholder="e.g. 10"
              value={dimensions.heightFt}
              onChange={(e) => onChange('heightFt', e.target.value)}
              className={`w-full px-3.5 py-3 pr-12 rounded-xl text-base text-slate-900 bg-slate-50 border transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.height
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-slate-300 focus:border-orange-600 focus:ring-orange-200'
              }`}
            />
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-sm font-bold text-slate-700">
              ft
            </span>
          </div>
          {errors.height && (
            <p id="error-wall-height" className="text-xs font-medium text-red-600 mt-1">
              {errors.height}
            </p>
          )}
        </div>

        {/* Wall Thickness */}
        <div id="field-group-thickness">
          <div className="flex justify-between items-baseline mb-1">
            <label
              htmlFor="input-wall-thickness"
              className="text-sm font-semibold text-slate-800"
            >
              Wall Thickness
            </label>
            <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              Default: inches (in)
            </span>
          </div>
          <div className="relative rounded-xl shadow-2xs">
            <input
              id="input-wall-thickness"
              type="number"
              step="any"
              min="0"
              inputMode="decimal"
              placeholder="e.g. 9"
              value={dimensions.thicknessIn}
              onChange={(e) => onChange('thicknessIn', e.target.value)}
              className={`w-full px-3.5 py-3 pr-12 rounded-xl text-base text-slate-900 bg-slate-50 border transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.thickness
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-slate-300 focus:border-orange-600 focus:ring-orange-200'
              }`}
            />
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-sm font-bold text-slate-700">
              in
            </span>
          </div>
          {errors.thickness && (
            <p id="error-wall-thickness" className="text-xs font-medium text-red-600 mt-1">
              {errors.thickness}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
