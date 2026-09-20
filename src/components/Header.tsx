/**
 * App Header Component
 * Displays app title and construction subtitle.
 */

export function Header() {
  return (
    <header
      id="app-header"
      className="bg-white border-b border-slate-200 px-4 py-3 sm:px-6 shadow-xs"
    >
      <div className="flex items-center gap-3">
        <div
          id="header-brick-icon"
          className="w-10 h-10 rounded-xl bg-orange-700 flex items-center justify-center text-white shrink-0 shadow-xs"
          aria-hidden="true"
        >
          {/* Robust SVG Brick Glyph */}
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="12" y1="4" x2="12" y2="12" />
            <line x1="7.5" y1="12" x2="7.5" y2="20" />
            <line x1="16.5" y1="12" x2="16.5" y2="20" />
          </svg>
        </div>

        <div>
          <h1
            id="app-title"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight"
          >
            Brick Calculator
          </h1>
          <p
            id="app-subtitle"
            className="text-xs sm:text-sm font-medium text-orange-800"
          >
            Calculate Bricks, Brickwork, Mortar & Cement
          </p>
          <p
            id="app-caption"
            className="text-[11px] sm:text-xs text-slate-700"
          >
            Simple brickwork material calculator
          </p>
        </div>
      </div>
    </header>
  );
}
