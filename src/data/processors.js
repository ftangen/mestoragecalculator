// ── Processor recipes (all crafted in Inscriber) ─────────────────────────────
// Presses are reusable tools — not listed as raw materials.

export const PROCESSOR_RECIPES = [
  {
    key: "logic",
    label: "Logic Processor",
    twAccent: "text-sky-300",
    twBorder: "border-sky-800/50",
    twBg: "bg-sky-950/30",
    twBadge: "bg-sky-900/60 text-sky-300 border-sky-700/50",
    steps: [
      {
        out: "Printed Logic Circuit",
        ingredients: ["Gold Ingot"],
        press: "Inscriber Logic Press",
      },
      {
        out: "Printed Silicone",
        ingredients: ["Silicone"],
        press: "Inscriber Silicone Press",
      },
      {
        out: "Logic Processor",
        ingredients: ["Printed Logic Circuit", "Redstone", "Printed Silicone"],
        press: null,
      },
    ],
    rawMats: ["1× Gold Ingot", "1× Redstone", "1× Silicone"],
  },
  {
    key: "calc",
    label: "Calculation Processor",
    twAccent: "text-orange-300",
    twBorder: "border-orange-800/50",
    twBg: "bg-orange-950/30",
    twBadge: "bg-orange-900/60 text-orange-300 border-orange-700/50",
    steps: [
      {
        out: "Printed Calculation Circuit",
        ingredients: ["Certus Quartz Crystal"],
        press: "Inscriber Calculation Press",
      },
      {
        out: "Printed Silicone",
        ingredients: ["Silicone"],
        press: "Inscriber Silicone Press",
      },
      {
        out: "Calculation Processor",
        ingredients: ["Printed Calculation Circuit", "Redstone", "Printed Silicone"],
        press: null,
      },
    ],
    rawMats: ["1× Certus Quartz Crystal", "1× Redstone", "1× Silicone"],
  },
  {
    key: "accum",
    label: "Accumulation Processor",
    twAccent: "text-teal-300",
    twBorder: "border-teal-800/50",
    twBg: "bg-teal-950/30",
    twBadge: "bg-teal-900/60 text-teal-300 border-teal-700/50",
    steps: [
      {
        out: "Printed Accumulation Circuit",
        ingredients: ["Sky Steel Ingot"],
        press: "Inscriber Accumulation Press",
      },
      {
        out: "Printed Silicone",
        ingredients: ["Silicone"],
        press: "Inscriber Silicone Press",
      },
      {
        out: "Accumulation Processor",
        ingredients: ["Printed Accumulation Circuit", "Fluix Dust", "Printed Silicone"],
        press: null,
      },
    ],
    rawMats: ["1× Sky Steel Ingot", "1× Fluix Dust", "1× Silicone"],
  },
];
