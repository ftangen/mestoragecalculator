import { MATERIALS } from "../data/recipes.js";

export default function MaterialGrid({ totals, qty }) {
  return (
    <div>
      <p className="section-label">Raw materials total</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {Object.entries(totals).map(([key, perDisk]) => {
          const mat = MATERIALS[key];
          if (!mat) return null;
          const total = perDisk * qty;
          return (
            <div
              key={key}
              className={`rounded-lg p-3 border ${mat.twBg} ${mat.twBorder}`}
            >
              <div className={`text-xs font-medium mb-1.5 ${mat.twText} opacity-80`}>
                {mat.label}
              </div>
              <div className={`text-2xl font-bold font-mono tabular-nums ${mat.twText}`}>
                {total.toLocaleString()}
              </div>
              {qty > 1 && (
                <div className={`text-xs mt-1 ${mat.twText} opacity-50`}>
                  {perDisk.toLocaleString()} per disk
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
