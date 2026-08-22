const lineage = require("../lineage_map/map.js");
const { cycle: qAttn } = require("../experiment/quantum_attention/quantum_attention.js");
const { cycle: recursive } = require("../experiment/recursive_self/recursive_self.js");
const { cycle: paradox } = require("../experiment/temporal_paradox/paradox_resolver.js");
const { cycle: mesh } = require("../experiment/consensus_mesh/consensus_mesh.js");
const { recent } = require("../resonance_bus/bus.js");
async function run(ticks = 4) {
  console.log("NEXUS OBSERVATORY");
  console.log(`Lineage systems: ${lineage.count()}`);
  console.log(`Themes: ${lineage.themes().join(", ")}\n`);
  console.log("--- Quantum Attention ---");
  for (let t = 0; t < ticks; t++) qAttn(t);
  console.log("\n--- Recursive Self ---");
  for (let t = 0; t < ticks; t++) recursive(t);
  console.log("\n--- Temporal Paradox ---");
  for (let t = 0; t < ticks; t++) paradox(t);
  console.log("\n--- Consensus Mesh ---");
  for (let t = 0; t < ticks; t++) mesh(t);
  console.log("\n--- Resonance Bus (recent) ---");
  recent(8).forEach(e => console.log(`  ${e.event}`, JSON.stringify(e.payload).slice(0, 80)));
  console.log("\nNexus cycle complete.");
}
if (require.main === module) run(4);
module.exports = { run };
