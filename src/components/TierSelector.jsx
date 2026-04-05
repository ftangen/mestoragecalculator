export default function TierSelector({ tier, subtype, onTierChange, onSubtypeChange }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <button
          onClick={() => onTierChange("std")}
          className={`btn-tier ${tier === "std" ? "btn-tier-active-std" : "btn-tier-inactive"}`}
        >
          <span className="mr-1.5 opacity-70">▣</span>
          Standard AE2
        </button>
        <button
          onClick={() => onTierChange("mega")}
          className={`btn-tier ${tier === "mega" ? "btn-tier-active-mega" : "btn-tier-inactive"}`}
        >
          <span className="mr-1.5 opacity-70">◈</span>
          MEGA Cells
        </button>
      </div>

      {tier === "std" && (
        <div className="flex gap-2 ml-1">
          {[
            { id: "item",  label: "Item",  icon: "▤" },
            { id: "fluid", label: "Fluid", icon: "◉" },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => onSubtypeChange(id)}
              className={[
                "text-xs px-3 py-1 rounded-full border transition-all duration-150 cursor-pointer",
                subtype === id
                  ? "border-ae2-500/60 bg-ae2-500/10 text-ae2-400"
                  : "border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300",
              ].join(" ")}
            >
              <span className="mr-1 opacity-60">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
