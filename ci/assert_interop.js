const { execAll } = require("../bridge/exec_adapters/exec.js");
const { normalize, clamp } = require("../bridge/adapters/normalize.js");
const lineage = require("../lineage_map/map.js");
const REQUIRED_KEYS = ["strength", "entropy", "coherence", "consensus"];
function assertShape(metrics, name) {
  const errors = [];
  REQUIRED_KEYS.forEach(k => {
    if (typeof metrics[k] !== "number" || Number.isNaN(metrics[k])) errors.push(`${name}: missing/NaN ${k}`);
    else if (metrics[k] < 0 || metrics[k] > 1) errors.push(`${name}: ${k}=${metrics[k]} out of [0,1]`);
  });
  return errors;
}
function smokeCreative() {
  const errors = [];
  const mods = [
    ["dream", () => require("../experiment/dream_buffer/dream_buffer.js").cycle(0)],
    ["oracle", () => require("../experiment/oracle_die/oracle.js").cycle(0)],
    ["tide", () => require("../experiment/tide_clock/tide.js").cycle(0)],
    ["garden", () => require("../experiment/entropy_garden/garden.js").cycle(0)],
    ["chord", () => require("../experiment/resonance_chord/chord.js").cycle(0)],
    ["liminal", () => { const g = require("../experiment/liminal_gate/gate.js"); g.reset(); return g.cycle(0); }],
    ["dissent", () => require("../experiment/choir_dissonance/dissonance.js").cycle(0)],
    ["compost", () => require("../experiment/collapse_compost/compost.js").cycle(0)],
    ["palimpsest", () => require("../experiment/palimpsest/palimpsest.js").cycle(0)],
    ["myth", () => require("../experiment/myth_weaver/myth.js").cycle(0)]
  ];
  mods.forEach(([name, fn]) => {
    try { fn(); console.log(`  PASS  creative/${name}`); }
    catch (e) { errors.push(`creative/${name}: ${e.message}`); console.log(`  FAIL  creative/${name} — ${e.message}`); }
  });
  return errors;
}
function run() {
  console.log("NEXUS CI — interop + creative smoke");
  console.log(`Lineage count: ${lineage.count()}\n`);
  const results = execAll(["attention-labyrinth", "quietus-array", "metamorph-forge", "chronovore-archive", "neuroglyph-forge", "semiotic-engine"]);
  let failures = []; let passes = 0;
  console.log("▸ Exec shape");
  results.forEach(r => {
    const errs = assertShape(r.metrics, r.name);
    if (!r.ok) errs.push(`${r.name}: exec failed (${r.source})`);
    if (errs.length) { failures = failures.concat(errs); console.log(`  FAIL  ${r.name}`); }
    else { passes++; console.log(`  PASS  ${r.name}  str=${r.metrics.strength.toFixed(3)}`); }
  });
  if (normalize({ strength: 0.5 }).strength !== 0.5) failures.push("normalize identity");
  if (clamp(2) !== 1 || clamp(-1) !== 0) failures.push("clamp broken");
  console.log("\n▸ Creative smoke");
  failures = failures.concat(smokeCreative());
  console.log(`\n  exec ${passes}/${results.length}  failures=${failures.length}`);
  if (failures.length) { console.log("\nCI FAILED"); process.exitCode = 1; }
  else console.log("\nCI PASSED");
  return { passes, total: results.length, failures };
}
module.exports = { run, assertShape, smokeCreative };
if (require.main === module) run();
