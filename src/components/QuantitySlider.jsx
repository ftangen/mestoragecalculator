export default function QuantitySlider({ qty, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm text-slate-400 whitespace-nowrap min-w-[90px]">
        Number of disks
      </label>
      <input
        type="range"
        min={1}
        max={20}
        step={1}
        value={qty}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="font-mono font-bold text-xl text-ae2-300 min-w-[2rem] text-right tabular-nums">
        {qty}
      </span>
    </div>
  );
}
