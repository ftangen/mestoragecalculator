export default function CraftingTree({ tree }) {
  return (
    <div>
      <p className="section-label">Crafting tree (per disk)</p>
      <div className="card overflow-hidden">
        {tree.map(([indent, label, qStr], i) => (
          <div
            key={i}
            className={[
              "flex justify-between items-center px-4 py-2.5 text-sm",
              i < tree.length - 1 ? "border-b border-slate-800" : "",
              indent === 0 ? "bg-slate-800/50" : "",
            ].join(" ")}
          >
            <span className="text-slate-300">
              {indent > 0 && (
                <span className="text-slate-600 font-mono text-xs">
                  {"\u00a0".repeat(indent * 3)}{"↳ "}
                </span>
              )}
              <span className={indent === 0 ? "font-semibold text-slate-100" : ""}>
                {label}
              </span>
            </span>
            <span className="font-mono font-semibold text-ae2-400 ml-4 tabular-nums shrink-0">
              {qStr}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
