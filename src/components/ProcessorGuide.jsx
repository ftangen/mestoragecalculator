import { useState } from "react";
import { PROCESSOR_RECIPES } from "../data/processors.js";

function Step({ step, index }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-mono">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {step.ingredients.map((ing, i) => (
            <span key={i} className="text-slate-300 font-medium">{ing}</span>
          ))}
          {step.press && (
            <>
              <span className="text-slate-600">+</span>
              <span className="text-slate-500 italic text-xs">{step.press}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-slate-600 text-xs">→</span>
          <span className="text-slate-400 text-xs">{step.out}</span>
        </div>
      </div>
    </div>
  );
}

function ProcessorCard({ proc }) {
  return (
    <div className={`rounded-xl border ${proc.twBorder} ${proc.twBg} overflow-hidden`}>
      <div className="px-4 py-3 border-b border-slate-800/60">
        <h3 className={`font-semibold text-sm ${proc.twAccent}`}>{proc.label}</h3>
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Inscriber steps */}
        <div className="space-y-2.5">
          {proc.steps.map((step, i) => (
            <Step key={i} step={step} index={i} />
          ))}
        </div>

        {/* Raw materials summary */}
        <div className="pt-2 border-t border-slate-800/60">
          <p className="text-xs text-slate-600 uppercase tracking-widest mb-1.5">Raw materials per processor</p>
          <div className="flex flex-wrap gap-2">
            {proc.rawMats.map((mat, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded border font-mono ${proc.twBadge}`}
              >
                {mat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessorGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 transition-colors text-sm text-slate-400 hover:text-slate-300"
      >
        <span className="flex items-center gap-2">
          <span className="opacity-60">⚙</span>
          Processor recipes
        </span>
        <span className={`transition-transform duration-200 text-slate-600 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESSOR_RECIPES.map(proc => (
            <ProcessorCard key={proc.key} proc={proc} />
          ))}
        </div>
      )}
    </div>
  );
}
