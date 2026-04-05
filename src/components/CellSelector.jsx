import { CAPACITY } from "../data/recipes.js";

export default function CellSelector({ cells, cell, tier, onSelect }) {
  const isMega = tier === "mega";

  return (
    <div>
      <p className="section-label">Disk size</p>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {cells.map(name => {
          const isSelected = name === cell;
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              className={[
                "rounded-lg p-3 text-left border transition-all duration-150 cursor-pointer",
                isSelected
                  ? isMega
                    ? "bg-amber-500/10 border-amber-500/60 shadow-glow-amber"
                    : "bg-emerald-500/10 border-emerald-500/60 shadow-glow-emerald"
                  : "bg-slate-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800",
              ].join(" ")}
            >
              <div className={`font-bold text-sm font-mono ${isSelected ? (isMega ? "text-amber-300" : "text-emerald-300") : "text-slate-200"}`}>
                {name}
              </div>
              <div className={`text-xs mt-0.5 ${isSelected ? (isMega ? "text-amber-400/70" : "text-emerald-400/70") : "text-slate-500"}`}>
                {CAPACITY[name]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
