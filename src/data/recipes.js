// ── Material definitions ─────────────────────────────────────────────────────
export const MATERIALS = {
  redstone:  { label: "Redstone",               twBg: "bg-red-950/60",    twText: "text-red-300",    twBorder: "border-red-800/60" },
  certus:    { label: "Certus Quartz Crystal",   twBg: "bg-violet-950/60", twText: "text-violet-300", twBorder: "border-violet-800/60" },
  logic:     { label: "Logic Processor",         twBg: "bg-sky-950/60",    twText: "text-sky-300",    twBorder: "border-sky-800/60" },
  calc:      { label: "Calculation Processor",   twBg: "bg-orange-950/60", twText: "text-orange-300", twBorder: "border-orange-800/60" },
  qglass:    { label: "Quartz Glass",            twBg: "bg-slate-800/60",  twText: "text-slate-300",  twBorder: "border-slate-600/60" },
  vqglass:   { label: "Vibrant Quartz Glass",    twBg: "bg-lime-950/60",   twText: "text-lime-300",   twBorder: "border-lime-800/60" },
  glow:      { label: "Glowstone Dust",          twBg: "bg-yellow-950/60", twText: "text-yellow-300", twBorder: "border-yellow-800/60" },
  skystone:  { label: "Sky Stone Dust",          twBg: "bg-zinc-800/60",   twText: "text-zinc-300",   twBorder: "border-zinc-600/60" },
  skystoneI: { label: "Sky Stone Ingot",         twBg: "bg-zinc-700/60",   twText: "text-zinc-200",   twBorder: "border-zinc-500/60" },
  accum:     { label: "Accumulation Processor",  twBg: "bg-teal-950/60",   twText: "text-teal-300",   twBorder: "border-teal-800/60" },
  ender:     { label: "Ender Dust",              twBg: "bg-emerald-950/60",twText: "text-emerald-300",twBorder: "border-emerald-800/60" },
  matter:    { label: "Matter Ball",             twBg: "bg-indigo-950/60", twText: "text-indigo-300", twBorder: "border-indigo-800/60" },
  iron:      { label: "Iron Ingot",              twBg: "bg-slate-700/60",  twText: "text-slate-200",  twBorder: "border-slate-500/60" },
  copper:    { label: "Copper Ingot",            twBg: "bg-orange-900/60", twText: "text-orange-200", twBorder: "border-orange-700/60" },
};

// ── Housing recipes ──────────────────────────────────────────────────────────
export const STD_HOUSING  = { qglass: 2, redstone: 3, iron: 2, copper: 1 };
export const MEGA_HOUSING = { skystone: 3, vqglass: 2, skystoneI: 3 };

// ── Standard AE2 flat material totals (per storage component) ────────────────
export const STD_TOTALS = {
  "1k":   { redstone: 4,   certus: 4,   logic: 1 },
  "4k":   { redstone: 16,  certus: 12,  logic: 3,  calc: 1,  qglass: 1 },
  "16k":  { redstone: 48,  certus: 36,  logic: 9,  calc: 4,  qglass: 4,  glow: 4 },
  "64k":  { redstone: 144, certus: 108, logic: 27, calc: 13, qglass: 13, glow: 16 },
  "256k": { redstone: 432, certus: 324, logic: 81, calc: 40, qglass: 40, glow: 48, skystone: 4 },
};

// ── MEGA Cells flat material totals ──────────────────────────────────────────
function scaleMats(base, multiplier) {
  return Object.fromEntries(Object.entries(base).map(([k, v]) => [k, v * multiplier]));
}
function addMats(...objs) {
  const result = {};
  for (const obj of objs)
    for (const [k, v] of Object.entries(obj))
      result[k] = (result[k] || 0) + v;
  return result;
}

const T256k = STD_TOTALS["256k"];
const T1M   = addMats(scaleMats(T256k, 3), { qglass: 1,  skystone: 4, accum: 1 });
const T4M   = addMats(scaleMats(T1M,   3), { qglass: 1,  ender: 4,    accum: 1 });
const T16M  = addMats(scaleMats(T4M,   3), { vqglass: 1, ender: 4,    accum: 1 });
const T64M  = addMats(scaleMats(T16M,  3), { vqglass: 1, matter: 4,   accum: 1 });
const T256M = addMats(scaleMats(T64M,  3), { vqglass: 1, matter: 4,   accum: 1 });

export const MEGA_TOTALS = { "1M": T1M, "4M": T4M, "16M": T16M, "64M": T64M, "256M": T256M };

// ── Crafting trees (direct ingredients per disk) ─────────────────────────────
export const STD_TREE = {
  "1k": [
    [0, "1k Storage Component",    "×1"],
    [1, "Certus Quartz Crystal",   "×4"],
    [1, "Redstone",                "×4"],
    [1, "Logic Processor",         "×1"],
  ],
  "4k": [
    [0, "4k Storage Component",    "×1"],
    [1, "1k Storage Component",    "×3"],
    [2, "Certus Quartz Crystal",   "×12"],
    [2, "Redstone",                "×12"],
    [2, "Logic Processor",         "×3"],
    [1, "Calculation Processor",   "×1"],
    [1, "Quartz Glass",            "×1"],
    [1, "Redstone",                "×4"],
  ],
  "16k": [
    [0, "16k Storage Component",   "×1"],
    [1, "4k Storage Component",    "×3"],
    [2, "1k Storage Component",    "×9"],
    [3, "Certus Quartz Crystal",   "×36"],
    [3, "Redstone",                "×36"],
    [3, "Logic Processor",         "×9"],
    [2, "Calculation Processor",   "×3"],
    [2, "Quartz Glass",            "×3"],
    [2, "Redstone",                "×12"],
    [1, "Calculation Processor",   "×1"],
    [1, "Quartz Glass",            "×1"],
    [1, "Glowstone Dust",          "×4"],
  ],
  "64k": [
    [0, "64k Storage Component",   "×1"],
    [1, "16k Storage Component",   "×3"],
    [2, "4k Storage Component",    "×9"],
    [3, "1k Storage Component",    "×27"],
    [4, "Certus Quartz Crystal",   "×108"],
    [4, "Redstone",                "×108"],
    [4, "Logic Processor",         "×27"],
    [3, "Calculation Processor",   "×9"],
    [3, "Quartz Glass",            "×9"],
    [3, "Redstone",                "×36"],
    [2, "Calculation Processor",   "×3"],
    [2, "Quartz Glass",            "×3"],
    [2, "Glowstone Dust",          "×12"],
    [1, "Calculation Processor",   "×1"],
    [1, "Quartz Glass",            "×1"],
    [1, "Glowstone Dust",          "×4"],
  ],
  "256k": [
    [0, "256k Storage Component",  "×1"],
    [1, "64k Storage Component",   "×3"],
    [2, "16k Storage Component",   "×9"],
    [3, "4k Storage Component",    "×27"],
    [4, "1k Storage Component",    "×81"],
    [5, "Certus Quartz Crystal",   "×324"],
    [5, "Redstone",                "×324"],
    [5, "Logic Processor",         "×81"],
    [4, "Calculation Processor",   "×27"],
    [4, "Quartz Glass",            "×27"],
    [4, "Redstone",                "×108"],
    [3, "Calculation Processor",   "×9"],
    [3, "Quartz Glass",            "×9"],
    [3, "Glowstone Dust",          "×36"],
    [2, "Calculation Processor",   "×3"],
    [2, "Quartz Glass",            "×3"],
    [2, "Glowstone Dust",          "×12"],
    [1, "Calculation Processor",   "×1"],
    [1, "Quartz Glass",            "×1"],
    [1, "Sky Stone Dust",          "×4"],
  ],
};

export const MEGA_TREE = {
  "1M": [
    [0, "1M MEGA Storage Component",   "×1"],
    [1, "256k Storage Component",       "×3"],
    [1, "Accumulation Processor",       "×1"],
    [1, "Quartz Glass",                 "×1"],
    [1, "Sky Stone Dust",               "×4"],
  ],
  "4M": [
    [0, "4M MEGA Storage Component",   "×1"],
    [1, "1M MEGA Storage Component",    "×3"],
    [1, "Accumulation Processor",       "×1"],
    [1, "Quartz Glass",                 "×1"],
    [1, "Ender Dust",                   "×4"],
  ],
  "16M": [
    [0, "16M MEGA Storage Component",  "×1"],
    [1, "4M MEGA Storage Component",    "×3"],
    [1, "Accumulation Processor",       "×1"],
    [1, "Vibrant Quartz Glass",         "×1"],
    [1, "Ender Dust",                   "×4"],
  ],
  "64M": [
    [0, "64M MEGA Storage Component",  "×1"],
    [1, "16M MEGA Storage Component",   "×3"],
    [1, "Accumulation Processor",       "×1"],
    [1, "Vibrant Quartz Glass",         "×1"],
    [1, "Matter Ball",                  "×4"],
  ],
  "256M": [
    [0, "256M MEGA Storage Component", "×1"],
    [1, "64M MEGA Storage Component",   "×3"],
    [1, "Accumulation Processor",       "×1"],
    [1, "Vibrant Quartz Glass",         "×1"],
    [1, "Matter Ball",                  "×4"],
  ],
};

// ── Capacity labels ───────────────────────────────────────────────────────────
export const CAPACITY = {
  "1k":   "~8k items",   "4k":   "~32k items",  "16k":  "~130k items",
  "64k":  "~520k items", "256k": "~2M items",
  "1M":   "~8M items",   "4M":   "~32M items",  "16M":  "~130M items",
  "64M":  "~520M items", "256M": "~2B items",
};

export const STD_CELLS  = ["1k", "4k", "16k", "64k", "256k"];
export const MEGA_CELLS = ["1M", "4M", "16M", "64M", "256M"];
