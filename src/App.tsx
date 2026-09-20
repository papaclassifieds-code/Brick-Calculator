/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { WallDimensionsInput } from './components/WallDimensionsInput';
import { BrickSizeSelector } from './components/BrickSizeSelector';
import { MortarRatioSelector } from './components/MortarRatioSelector';
import { ResultsSection } from './components/ResultsSection';
import { calculateAllMaterials } from './calculator';
import { validateInputs } from './validation';
import {
  BrickDimensions,
  BrickPreset,
  CalculationResults,
  MortarRatio,
  ValidationErrors,
  WallDimensions,
} from './types';

const INITIAL_WALL: WallDimensions = {
  lengthFt: '',
  heightFt: '',
  thicknessIn: '',
};

const INITIAL_CUSTOM_BRICK: BrickDimensions = {
  lengthMm: '190',
  widthMm: '90',
  heightMm: '90',
};

const STANDARD_BRICK: BrickDimensions = {
  lengthMm: '190',
  widthMm: '90',
  heightMm: '90',
};

export default function App() {
  const [wall, setWall] = useState<WallDimensions>(INITIAL_WALL);
  const [brickPreset, setBrickPreset] = useState<BrickPreset>('standard');
  const [customBrick, setCustomBrick] =
    useState<BrickDimensions>(INITIAL_CUSTOM_BRICK);
  const [mortarRatio, setMortarRatio] = useState<MortarRatio>('1:6');
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleWallChange = (field: keyof WallDimensions, value: string) => {
    setWall((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof ValidationErrors];
        return next;
      });
    }
  };

  const handleCustomBrickChange = (
    field: keyof BrickDimensions,
    value: string
  ) => {
    setCustomBrick((prev) => ({ ...prev, [field]: value }));
    const errorKey =
      field === 'lengthMm'
        ? 'brickLength'
        : field === 'widthMm'
        ? 'brickWidth'
        : 'brickHeight';
    if (errors[errorKey]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const activeBrick = brickPreset === 'standard' ? STANDARD_BRICK : customBrick;
    const validation = validateInputs(wall, brickPreset, activeBrick);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const calculated = calculateAllMaterials(wall, activeBrick, mortarRatio);
    setResults(calculated);

    // Smooth scroll down to results
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleReset = () => {
    setWall(INITIAL_WALL);
    setBrickPreset('standard');
    setCustomBrick(INITIAL_CUSTOM_BRICK);
    setMortarRatio('1:6');
    setResults(null);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="app-root-container"
      className="min-h-screen bg-slate-100 flex flex-col justify-start text-slate-900 selection:bg-orange-200"
    >
      {/* Mobile-first centered Android container */}
      <main
        id="calculator-main-wrapper"
        className="w-full max-w-md mx-auto bg-white min-h-screen shadow-md flex flex-col"
      >
        <Header />

        <div className="flex-1 p-4 sm:p-5 space-y-4 bg-slate-50/50">
          <form id="calculator-form" onSubmit={handleCalculate} noValidate>
            <div className="space-y-4">
              {/* 1. Wall Dimensions */}
              <WallDimensionsInput
                dimensions={wall}
                onChange={handleWallChange}
                errors={errors}
              />

              {/* 2. Brick Size */}
              <BrickSizeSelector
                preset={brickPreset}
                onPresetChange={setBrickPreset}
                customDimensions={customBrick}
                onCustomChange={handleCustomBrickChange}
                errors={errors}
              />

              {/* 3. Mortar Ratio */}
              <MortarRatioSelector
                ratio={mortarRatio}
                onChange={setMortarRatio}
              />

              {/* 4. Large Prominent Calculate Button */}
              <div id="wrapper-calculate-btn" className="pt-2">
                <button
                  id="btn-calculate"
                  type="submit"
                  className="w-full h-14 rounded-xl bg-orange-700 hover:bg-orange-800 active:bg-orange-900 text-white font-bold text-base tracking-wider uppercase transition-colors shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="16" y1="14" x2="16" y2="18" />
                    <path d="M16 10h.01" />
                    <path d="M12 10h.01" />
                    <path d="M8 10h.01" />
                    <path d="M12 14h.01" />
                    <path d="M8 14h.01" />
                    <path d="M12 18h.01" />
                    <path d="M8 18h.01" />
                  </svg>
                  CALCULATE
                </button>
              </div>
            </div>
          </form>

          {/* Results Section */}
          {results && (
            <div ref={resultsRef} id="results-anchor">
              <ResultsSection results={results} onReset={handleReset} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
