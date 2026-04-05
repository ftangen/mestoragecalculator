import { MATERIALS } from "../data/recipes.js";

export default function HousingNote({ housing, housingLabel, qty }) {
  const parts = Object.entries(housing)
    .map(([k, v]) => `${v * qty}× ${MATERIALS[k].label}`)
    .join(", ");

  return (
    <div className="border-l-2 border-slate-600 pl-4 py-2 bg-slate-900/50 rounded-r-lg text-sm text-slate-400">
      <span className="text-slate-300 font-medium">+ {housingLabel} ×{qty}:</span>{" "}
      {parts}
    </div>
  );
}
