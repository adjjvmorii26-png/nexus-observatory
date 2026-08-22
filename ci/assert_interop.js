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
function run() {
  console.log("NEXUS CI — interop assertions");
  console.log(`Lineage count: ${lineage.count()}\n`);
  const results = execAll();
  let failures = [];
  let passes = 0;
  results.forEach(r => {
    const errs = assertShape(r.metrics, r.name);
    if (!r.ok) errs.push(`${r.name}: exec failed (${r.source})`);
    if (errs.length) { failures = failures.concat(errs); console.log(`  FAIL  ${r.name}`); errs.forEach(e => console.log(`        ${e}`)); }
    else { passes++; console.log(`  PASS  ${r.name}  str=${r.metrics.strength.toFixed(3)} ent=${r.metrics.entropy.toFixed(3)}`); }
  });
  const id = normalize({ strength: 0.5, entropy: 0.5 });
  if (id.strength !== 0.5) failures.push("normalize identity broken");
  if (clamp(2) !== 1 || clamp(-1) !== 0) failures.push("clamp broken");
  console.log(`\n  ${passes}/${results.length} systems passed`);
  console.log(`  ${failures.length} failure(s)`);
  if (failures.length) { console.log("\nCI FAILED"); process.exitCode = 1; }
  else console.log("\nCI PASSED");
  return { passes, total: results.length, failures };
}
module.exports = { run, assertShape };
if (require.main === module) run();
