export default function TierSelector({ tier, onChange }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onChange("std")}
        className={`btn-tier ${tier === "std" ? "btn-tier-active-std" : "btn-tier-inactive"}`}
      >
        <span className="mr-1.5 opacity-70">▣</span>
        Standard AE2
      </button>
      <button
        onClick={() => onChange("mega")}
        className={`btn-tier ${tier === "mega" ? "btn-tier-active-mega" : "btn-tier-inactive"}`}
      >
        <span className="mr-1.5 opacity-70">◈</span>
        MEGA Cells
      </button>
    </div>
  );
}
