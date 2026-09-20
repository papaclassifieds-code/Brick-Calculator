/**
 * Mortar Mix Ratio Selector Component
 * Dropdown for Cement : Sand ratios (1:4, 1:5, 1:6).
 */

import { MortarRatio } from '../types';

interface MortarRatioSelectorProps {
  ratio: MortarRatio;
  onChange: (ratio: MortarRatio) => void;
}

export function MortarRatioSelector({
  ratio,
  onChange,
}: MortarRatioSelectorProps) {
  return (
    <section
      id="section-mortar-ratio"
      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs"
    >
      <div className="flex items-center justify-between mb-3">
        <label
          htmlFor="select-mortar-ratio"
          id="label-mortar-ratio"
          className="text-base sm:text-lg font-bold text-slate-900"
        >
          MORTAR RATIO
        </label>
        <span className="text-xs font-semibold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
          Cement : Sand
        </span>
      </div>

      <div>
        <select
          id="select-mortar-ratio"
          value={ratio}
          onChange={(e) => onChange(e.target.value as MortarRatio)}
          className="w-full px-3.5 py-3 rounded-xl text-base font-medium text-slate-900 bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-colors"
        >
          <option value="1:4">1:4 (1 Cement : 4 Sand)</option>
          <option value="1:5">1:5 (1 Cement : 5 Sand)</option>
          <option value="1:6">1:6 (1 Cement : 6 Sand — Default)</option>
        </select>
      </div>
    </section>
  );
}
