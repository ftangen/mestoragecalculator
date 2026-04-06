import { useState } from "react";
import {
  STD_CELLS, MEGA_CELLS,
  STD_TOTALS, MEGA_TOTALS, FLUID_TOTALS,
  STD_TREE, MEGA_TREE, FLUID_TREE,
  STD_HOUSING, MEGA_HOUSING,
} from "./data/recipes.js";
import TierSelector from "./components/TierSelector.jsx";
import CellSelector from "./components/CellSelector.jsx";
import QuantitySlider from "./components/QuantitySlider.jsx";
import MaterialGrid from "./components/MaterialGrid.jsx";
import CraftingTree from "./components/CraftingTree.jsx";
import HousingNote from "./components/HousingNote.jsx";
import ProcessorGuide from "./components/ProcessorGuide.jsx";

export default function App() {
  const [tier,    setTier]    = useState("std");
  const [subtype, setSubtype] = useState("item"); // "item" | "fluid", only for std
  const [cell,    setCell]    = useState("1k");
  const [qty,     setQty]     = useState(1);

  const cells = tier === "std" ? STD_CELLS : MEGA_CELLS;

  const totals = tier === "mega"
    ? MEGA_TOTALS[cell]
    : subtype === "fluid"
      ? FLUID_TOTALS[cell]
      : STD_TOTALS[cell];

  const tree = tier === "mega"
    ? MEGA_TREE[cell]
    : subtype === "fluid"
      ? FLUID_TREE[cell]
      : STD_TREE[cell];

  const housing      = tier === "mega" ? MEGA_HOUSING : STD_HOUSING;
  const housingLabel = tier === "mega" ? "MEGA Item Cell Housing" : "ME Item Cell Housing";
  const showHousing  = !(tier === "std" && subtype === "fluid");

  function handleTierChange(t) {
    setTier(t);
    setSubtype("item");
    setCell(t === "std" ? "1k" : "1M");
    setQty(1);
  }

  function handleSubtypeChange(s) {
    setSubtype(s);
    setCell("1k");
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:py-16">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <header className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-ae2-500/20 border border-ae2-500/40 flex items-center justify-center text-ae2-400 text-sm font-bold font-mono">
              ME
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              ME Storage Calculator
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Applied Energistics 2 + MEGA Cells — ATM10 / Minecraft
          </p>
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-ae2-500/30 via-slate-700 to-transparent" />

        {/* Tier + subtype selector */}
        <TierSelector
          tier={tier}
          subtype={subtype}
          onTierChange={handleTierChange}
          onSubtypeChange={handleSubtypeChange}
        />

        {/* Cell size */}
        <CellSelector cells={cells} cell={cell} tier={tier} onSelect={setCell} />

        {/* Quantity */}
        <div className="card px-5 py-4">
          <QuantitySlider qty={qty} onChange={setQty} />
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800" />

        {/* Materials */}
        <MaterialGrid totals={totals} qty={qty} />

        {/* Crafting tree */}
        <CraftingTree tree={tree} />

        {/* Housing note — not shown for fluid cells (recipe is self-contained) */}
        {showHousing && (
          <HousingNote housing={housing} housingLabel={housingLabel} qty={qty} />
        )}

        {/* Processor guide */}
        <ProcessorGuide />

        {/* Footer */}
        <footer className="pt-4 text-center text-xs text-slate-600">
          mestoragecalculator.com — data for ATM10 / AE2 + MEGA Cells
        </footer>
      </div>
    </div>
  );
}
