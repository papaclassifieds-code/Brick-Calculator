/**
 * Results Display Component
 * Shows:
 * 1. Number of Bricks
 * 2. Wall Volume
 * 3. Brickwork Volume
 * 4. Mortar Quantity
 * 5. Cement Requirement
 * Followed by:
 * - Calculation Assumptions
 * - Engineering Disclaimer
 * - Reset button
 */

import { CalculationResults } from '../types';

interface ResultsSectionProps {
  results: CalculationResults;
  onReset: () => void;
}

export function ResultsSection({ results, onReset }: ResultsSectionProps) {
  // Format numbers cleanly
  const formattedBricks = results.numberOfBricks.toLocaleString('en-US');
  const formattedWallVolM3 = results.wallVolumeM3.toFixed(2);
  const formattedWallVolCuFt = results.wallVolumeCuFt.toFixed(2);
  const formattedBrickworkVolM3 = results.brickworkVolumeM3.toFixed(2);
  const formattedBrickworkVolCuFt = results.brickworkVolumeCuFt.toFixed(2);
  const formattedWetMortar = results.wetMortarM3.toFixed(2);
  const formattedDryMortar = results.dryMortarM3.toFixed(2);

  return (
    <div id="results-container" className="space-y-4 pt-2">
      {/* Primary Results Box */}
      <section
        id="section-results"
        className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h2
            id="results-title"
            className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
          >
            RESULTS
          </h2>
          <span
            id="badge-approx-req"
            className="text-xs font-semibold px-2.5 py-1 bg-orange-100 text-orange-900 rounded-full border border-orange-200"
          >
            Approximate requirement
          </span>
        </div>

        {/* 1. Number of Bricks - Hero Result */}
        <div
          id="result-card-bricks"
          className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-4 mb-3.5"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-orange-900 mb-1">
            Number of Bricks
          </div>
          <div className="flex items-baseline gap-2">
            <span
              id="value-number-of-bricks"
              className="text-3xl sm:text-4xl font-black text-orange-950 tracking-tight"
            >
              {formattedBricks}
            </span>
            <span className="text-lg font-bold text-orange-800">
              Bricks
            </span>
          </div>
          <p className="text-xs text-orange-800/80 mt-1">
            Calculated with 10 mm mortar joints included
          </p>
        </div>

        {/* 2 & 3. Wall Volume & Brickwork Volume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
          {/* Wall Volume */}
          <div
            id="result-card-wall-volume"
            className="bg-slate-50 border border-slate-200 rounded-xl p-3.5"
          >
            <div className="text-xs font-semibold text-slate-600 mb-1">
              Wall Volume
            </div>
            <div
              id="value-wall-volume-m3"
              className="text-xl sm:text-2xl font-bold text-slate-900"
            >
              {formattedWallVolM3} m³
            </div>
            <div
              id="value-wall-volume-cuft"
              className="text-xs text-slate-500 font-medium mt-0.5"
            >
              {formattedWallVolCuFt} ft³
            </div>
          </div>

          {/* Brickwork Volume */}
          <div
            id="result-card-brickwork-volume"
            className="bg-slate-50 border border-slate-200 rounded-xl p-3.5"
          >
            <div className="text-xs font-semibold text-slate-600 mb-1">
              Brickwork Volume
            </div>
            <div
              id="value-brickwork-volume-m3"
              className="text-xl sm:text-2xl font-bold text-slate-900"
            >
              {formattedBrickworkVolM3} m³
            </div>
            <div
              id="value-brickwork-volume-cuft"
              className="text-xs text-slate-500 font-medium mt-0.5"
            >
              {formattedBrickworkVolCuFt} ft³
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mb-3.5 italic">
          * Brickwork volume represents total masonry volume (bricks + mortar joints).
        </p>

        {/* 4. Mortar Quantity */}
        <div
          id="result-card-mortar"
          className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-3.5"
        >
          <div className="text-xs font-semibold text-slate-600 mb-1">
            Mortar Quantity
          </div>
          <div className="flex items-baseline gap-2">
            <span
              id="value-mortar-quantity"
              className="text-xl sm:text-2xl font-bold text-slate-900"
            >
              {formattedWetMortar} m³
            </span>
            <span className="text-xs text-slate-600 font-medium">
              (Wet) / {formattedDryMortar} m³ (Dry)
            </span>
          </div>
          <p
            id="note-mortar-estimate"
            className="text-[11px] text-slate-500 mt-1.5 leading-normal"
          >
            Mortar quantity is an approximate estimate and may vary with brick size, joint thickness and workmanship.
          </p>
        </div>

        {/* 5. Cement Requirement */}
        <div
          id="result-card-cement"
          className="bg-slate-900 text-white rounded-xl p-4 mb-2"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Cement Requirement
          </div>
          <div className="flex items-baseline gap-2">
            <span
              id="value-cement-bags"
              className="text-3xl sm:text-4xl font-black text-orange-400 tracking-tight"
            >
              Approx. {results.cementBags}
            </span>
            <span className="text-lg font-bold text-slate-200">
              Bags
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-300 mt-1.5">
            <span id="label-cement-bag-spec" className="font-medium">
              50 kg/bag
            </span>
            <span className="text-slate-400">•</span>
            <span id="value-cement-weight-kg" className="font-medium text-slate-300">
              Total approx. {Math.round(results.cementWeightKg)} kg
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 font-medium">
              Mix Ratio {results.assumptions.mortarRatio}
            </span>
          </div>
        </div>
      </section>

      {/* Important Calculation Assumptions */}
      <section
        id="section-assumptions"
        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs"
      >
        <h3
          id="assumptions-heading"
          className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-700" />
          Calculation Assumptions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-700">
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Brick size:</span>
            <span id="assumption-brick-size" className="font-semibold text-slate-900">
              {results.assumptions.brickSizeDisplay}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Mortar joint:</span>
            <span id="assumption-mortar-joint" className="font-semibold text-slate-900">
              {results.assumptions.mortarJointMm} mm
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Mortar ratio:</span>
            <span id="assumption-mortar-ratio" className="font-semibold text-slate-900">
              {results.assumptions.mortarRatio} (Cement : Sand)
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Cement bag:</span>
            <span id="assumption-cement-bag" className="font-semibold text-slate-900">
              {results.assumptions.cementBagKg} kg
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100 sm:col-span-2">
            <span className="text-slate-500">Dry mortar conversion factor:</span>
            <span id="assumption-dry-mortar-factor" className="font-semibold text-slate-900">
              {results.assumptions.dryMortarFactor} (+33% for voids, shrinkage & waste)
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100 sm:col-span-2">
            <span className="text-slate-500">Standard cement density:</span>
            <span id="assumption-cement-density" className="font-semibold text-slate-900">
              {results.assumptions.cementDensityKgM3} kg/m³
            </span>
          </div>
        </div>
      </section>

      {/* Engineering Disclaimer */}
      <section
        id="section-disclaimer"
        className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80 text-amber-950"
      >
        <p id="disclaimer-text-1" className="text-xs leading-relaxed mb-1.5">
          These results are approximate estimates for brickwork material planning. Actual quantities may vary depending on brick dimensions, mortar joint thickness, workmanship and site conditions. Verify quantities with project specifications before procurement.
        </p>
        <p id="disclaimer-text-2" className="text-xs font-semibold text-amber-900">
          This calculator is not a substitute for professional engineering design.
        </p>
      </section>

      {/* Reset Button */}
      <div className="pt-1 pb-4">
        <button
          id="btn-reset"
          type="button"
          onClick={onReset}
          className="w-full py-3.5 px-4 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-sm tracking-wide uppercase hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          RESET
        </button>
      </div>
    </div>
  );
}
