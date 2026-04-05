// mestoragecalculator.com
// AE2 + MEGA Cells storage calculator
// ATM10 / Applied Energistics 2

// ── Material definitions ─────────────────────────────────────────────────────
const MATERIALS = {
  redstone:  { label: "Redstone",               color: "#FCEBEB", text: "#791F1F" },
  certus:    { label: "Certus Quartz Crystal",   color: "#EEEDFE", text: "#3C3489" },
  logic:     { label: "Logic Processor",         color: "#E6F1FB", text: "#0C447C" },
  calc:      { label: "Calculation Processor",   color: "#FAEEDA", text: "#633806" },
  qglass:    { label: "Quartz Glass",            color: "#F1EFE8", text: "#444441" },
  vqglass:   { label: "Vibrant Quartz Glass",    color: "#EAF3DE", text: "#27500A" },
  glow:      { label: "Glowstone Dust",          color: "#FAF0DA", text: "#854F0B" },
  skystone:  { label: "Sky Stone Dust",          color: "#D3D1C7", text: "#2C2C2A" },
  skystoneI: { label: "Sky Stone Ingot",         color: "#B4B2A9", text: "#2C2C2A" },
  accum:     { label: "Accumulation Processor",  color: "#9FE1CB", text: "#04342C" },
  ender:     { label: "Ender Dust",              color: "#E1F5EE", text: "#04342C" },
  matter:    { label: "Matter Ball",             color: "#CECBF6", text: "#26215C" },
  iron:      { label: "Iron Ingot",              color: "#F1EFE8", text: "#5F5E5A" },
  copper:    { label: "Copper Ingot",            color: "#FAECE7", text: "#993C1D" },
};

// ── Housing recipes ──────────────────────────────────────────────────────────
// ME Item Cell Housing:   2 Quartz Glass, 3 Redstone, 2 Iron Ingot, 1 Copper Ingot
// MEGA Item Cell Housing: 3 Sky Stone Dust, 2 Vibrant Quartz Glass, 3 Sky Stone Ingot
const STD_HOUSING  = { qglass: 2, redstone: 3, iron: 2, copper: 1 };
const MEGA_HOUSING = { skystone: 3, vqglass: 2, skystoneI: 3 };

// ── Standard AE2 flat material totals (per storage component) ────────────────
// 1k:   4 Redstone, 4 Certus Quartz Crystal, 1 Logic Processor
// 4k:   3×1k + 1 Calculation Processor + 1 Quartz Glass + 4 Redstone
// 16k:  3×4k + 1 Calculation Processor + 1 Quartz Glass + 4 Glowstone Dust
// 64k:  3×16k + 1 Calculation Processor + 1 Quartz Glass + 4 Glowstone Dust
// 256k: 3×64k + 1 Calculation Processor + 1 Quartz Glass + 4 Sky Stone Dust
const STD_TOTALS = {
  "1k":   { redstone: 4,   certus: 4,   logic: 1 },
  "4k":   { redstone: 16,  certus: 12,  logic: 3,  calc: 1,  qglass: 1 },
  "16k":  { redstone: 48,  certus: 36,  logic: 9,  calc: 4,  qglass: 4,  glow: 4 },
  "64k":  { redstone: 144, certus: 108, logic: 27, calc: 13, qglass: 13, glow: 16 },
  "256k": { redstone: 432, certus: 324, logic: 81, calc: 40, qglass: 40, glow: 48, skystone: 4 },
};

// ── MEGA Cells flat material totals (per storage component) ──────────────────
// 1M:   3×256k + 1 Accumulation Processor + 1 Quartz Glass + 4 Sky Stone Dust
// 4M:   3×1M   + 1 Accumulation Processor + 1 Quartz Glass + 4 Ender Dust
// 16M:  3×4M   + 1 Accumulation Processor + 1 Vibrant Quartz Glass + 4 Ender Dust
// 64M:  3×16M  + 1 Accumulation Processor + 1 Vibrant Quartz Glass + 4 Matter Ball
// 256M: 3×64M  + 1 Accumulation Processor + 1 Vibrant Quartz Glass + 4 Matter Ball
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

const MEGA_TOTALS = { "1M": T1M, "4M": T4M, "16M": T16M, "64M": T64M, "256M": T256M };

// ── Crafting trees (direct ingredients per disk, for display) ────────────────
// Format: [indentLevel, label, quantityString]
const STD_TREE = {
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

const MEGA_TREE = {
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
const CAPACITY = {
  "1k": "~8k items",   "4k": "~32k items",  "16k": "~130k items",
  "64k": "~520k items","256k": "~2M items",
  "1M": "~8M items",   "4M": "~32M items",  "16M": "~130M items",
  "64M": "~520M items","256M": "~2B items",
};

const STD_CELLS  = ["1k", "4k", "16k", "64k", "256k"];
const MEGA_CELLS = ["1M", "4M", "16M", "64M", "256M"];

// ── React component ───────────────────────────────────────────────────────────
import { useState } from "react";

export default function App() {
  const [tier, setTier]   = useState("std");
  const [cell, setCell]   = useState("1k");
  const [qty,  setQty]    = useState(1);

  const cells   = tier === "std" ? STD_CELLS : MEGA_CELLS;
  const totals  = tier === "std" ? STD_TOTALS[cell] : MEGA_TOTALS[cell];
  const tree    = tier === "std" ? STD_TREE[cell]   : MEGA_TREE[cell];
  const housing = tier === "mega" ? MEGA_HOUSING : STD_HOUSING;
  const housingLabel = tier === "mega" ? "MEGA Item Cell Housing" : "ME Item Cell Housing";

  function handleTierChange(t) {
    setTier(t);
    setCell(t === "std" ? "1k" : "1M");
    setQty(1);
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 4 }}>ME Storage Calculator</h1>
      <p style={{ color: "#666", marginBottom: 24, fontSize: 15 }}>
        Applied Energistics 2 + MEGA Cells — ATM10
      </p>

      {/* Tier selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["std", "mega"].map(t => (
          <button
            key={t}
            onClick={() => handleTierChange(t)}
            style={{
              padding: "6px 18px", borderRadius: 20, border: "1px solid",
              borderColor: tier === t ? "#1D9E75" : "#ccc",
              background: tier === t ? "#E1F5EE" : "transparent",
              color: tier === t ? "#085041" : "#555",
              cursor: "pointer", fontWeight: tier === t ? 600 : 400, fontSize: 14,
            }}
          >
            {t === "std" ? "Standard AE2" : "MEGA Cells"}
          </button>
        ))}
      </div>

      {/* Cell size selector */}
      <p style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
        Disk-størrelse
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8, marginBottom: 20 }}>
        {cells.map(name => {
          const isSelected = name === cell;
          const isMega = tier === "mega";
          return (
            <div
              key={name}
              onClick={() => setCell(name)}
              style={{
                background: isSelected ? (isMega ? "#FAEEDA" : "#E1F5EE") : "#f5f5f5",
                border: `${isSelected ? "1.5px" : "1px"} solid ${isSelected ? (isMega ? "#BA7517" : "#1D9E75") : "#e0e0e0"}`,
                borderRadius: 8, padding: "10px 12px", cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15, color: isSelected ? (isMega ? "#633806" : "#085041") : "#222" }}>
                {name}
              </div>
              <div style={{ fontSize: 11, color: isSelected ? (isMega ? "#854F0B" : "#0F6E56") : "#888", marginTop: 2 }}>
                {CAPACITY[name]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quantity slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <label style={{ fontSize: 14, color: "#555", whiteSpace: "nowrap" }}>Antall disker</label>
        <input
          type="range" min={1} max={20} step={1} value={qty}
          onChange={e => setQty(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span style={{ fontWeight: 600, fontSize: 18, minWidth: 28, textAlign: "right" }}>{qty}</span>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 20px" }} />

      {/* Material totals */}
      <p style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
        Råmaterialer totalt
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8, marginBottom: 24 }}>
        {Object.entries(totals).map(([key, perDisk]) => {
          const mat = MATERIALS[key];
          if (!mat) return null;
          const total = perDisk * qty;
          return (
            <div key={key} style={{ background: mat.color, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, color: mat.text, marginBottom: 3 }}>{mat.label}</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: mat.text }}>{total.toLocaleString()}</div>
              {qty > 1 && (
                <div style={{ fontSize: 11, color: mat.text, opacity: 0.6, marginTop: 2 }}>
                  {perDisk.toLocaleString()} per disk
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Crafting tree */}
      <p style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
        Crafting-tre (per disk)
      </p>
      <div style={{ background: "#f8f8f8", border: "1px solid #eee", borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
        {tree.map(([indent, label, qStr], i) => (
          <div
            key={i}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "4px 0", borderBottom: i < tree.length - 1 ? "1px solid #eee" : "none",
              fontSize: 13,
            }}
          >
            <span style={{ color: "#222" }}>
              <span style={{ color: "#bbb", fontSize: 11 }}>
                {indent > 0 ? "\u00a0".repeat(indent * 3) + "↳ " : ""}
              </span>
              {label}
            </span>
            <span style={{ fontWeight: 600, color: "#555", marginLeft: 12 }}>{qStr}</span>
          </div>
        ))}
      </div>

      {/* Housing note */}
      <div style={{ fontSize: 13, color: "#555", padding: "10px 14px", background: "#f5f5f5", borderLeft: "3px solid #ccc", borderRadius: "0 8px 8px 0" }}>
        <strong>+ {housingLabel} ×{qty}:</strong>{" "}
        {Object.entries(housing).map(([k, v]) => `${v * qty}× ${MATERIALS[k].label}`).join(", ")}
      </div>
    </div>
  );
}
