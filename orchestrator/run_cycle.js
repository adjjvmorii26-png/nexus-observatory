const crystals = require("../memory_crystals/crystal_store.js");
const { applyTuned } = require("../decay_curves/history/tune.js");
const { inject } = require("../psalm_engine/inject/inject.js");
const { cycle: execCycle, available } = require("../bridge/exec_adapters/exec.js");
const { cycle: qAttn } = require("../experiment/quantum_attention/quantum_attention.js");
const { cycle: recursive } = require("../experiment/recursive_self/recursive_self.js");
const { cycle: paradox } = require("../experiment/temporal_paradox/paradox_resolver.js");
const { cycle: mesh } = require("../experiment/consensus_mesh/consensus_mesh.js");
const { cycle: vizCycle } = require("../visualizer/feed.js");
const { recent } = require("../resonance_bus/bus.js");
const lineage = require("../lineage_map/map.js");
const oracle = require("../experiment/oracle_die/oracle.js");
const dream = require("../experiment/dream_buffer/dream_buffer.js");
const tide = require("../experiment/tide_clock/tide.js");
const liminal = require("../experiment/liminal_gate/gate.js");
const myth = require("../experiment/myth_weaver/myth.js");
const dissonance = require("../experiment/choir_dissonance/dissonance.js");
function run(ticks = 2) {
  console.log("NEXUS ORCHESTRATOR — refined + creative");
  console.log(`Lineage: ${lineage.count()}  |  Exec available: ${available().length}\n`);
  const subset = available().slice(0, 8);
  console.log("▸ Exec Adapters");
  const exec = execCycle(0, subset);
  console.log("\n▸ Quantum Attention");
  let lastQ; for (let t = 0; t < ticks; t++) lastQ = qAttn(t);
  console.log("\n▸ Recursive Self");
  let lastR; for (let t = 0; t < ticks; t++) lastR = recursive(t);
  console.log("\n▸ Temporal Paradox");
  let lastP; for (let t = 0; t < ticks; t++) lastP = paradox(t);
  console.log("\n▸ Oracle Die");
  const face = oracle.cast();
  console.log(`  ${face.name}: "${face.omen}"`);
  console.log("\n▸ Tide Clock");
  const tideState = tide.cycle(0);
  console.log("\n▸ Dream contamination");
  dream.dream("nexus", { strength: exec.avgStrength, entropy: exec.avgEntropy }, 0.3);
  const contaminated = dream.contaminate({ strength: exec.avgStrength, entropy: exec.avgEntropy, coherence: exec.avgStrength * 0.9, consensus: 0.6 }, 0.2);
  console.log(`  contaminated str=${contaminated.strength.toFixed(3)}`);
  console.log("\n▸ Liminal Gate");
  liminal.reset(); liminal.check({ strength: contaminated.strength });
  const lim = liminal.check({ strength: contaminated.strength * tideState.tide });
  console.log(`  side=${lim.side}${lim.event ? " ★ " + lim.event : ""}`);
  console.log("\n▸ Choir Dissonance");
  const nodes = (exec.results || []).slice(0, 4).map(r => ({ id: r.name.split("-")[0], strength: r.metrics.strength, entropy: r.metrics.entropy }));
  if (nodes.length >= 2) {
    const d = dissonance.dissent(nodes);
    console.log(`  dissenter=${d.dissenter}  decision=${d.decision}  consensus=${d.consensus}`);
  }
  console.log("\n▸ Consensus Mesh");
  let lastM; for (let t = 0; t < ticks; t++) lastM = mesh(t);
  if (lastM && face.bias?.consensus) {
    lastM = { ...lastM, consensus: Math.max(0, Math.min(1, lastM.consensus + face.bias.consensus)) };
    console.log(`  (oracle-adjusted consensus=${lastM.consensus.toFixed(3)})`);
  }
  console.log("\n▸ History-Tuned Decay + Tide");
  const decayed = [];
  (exec.results || []).forEach(r => {
    let m = applyTuned(r.metrics, r.theme || "default", 1);
    m = tide.apply(m, 0);
    decayed.push({ name: r.name, theme: r.theme, ...m });
    console.log(`  ${r.name.padEnd(26)} str=${(+m.strength).toFixed(3)}`);
  });
  console.log("\n▸ Memory Crystals");
  crystals.seal("nexus_last_cycle", { strength: lastR?.avg ?? contaminated.strength, entropy: lastQ?.entropy ?? contaminated.entropy, coherence: contaminated.coherence, consensus: lastM?.consensus ?? 0.5 }, { decision: lastM?.decision, oracle: face.name, wave: "4+creative" });
  decayed.forEach(d => crystals.seal(`sys_${d.name}`, { strength: d.strength, entropy: d.entropy, coherence: d.coherence, consensus: d.consensus }, { theme: d.theme }));
  const sum = crystals.summary();
  console.log(`  sealed total=${sum.count}  avg_str=${sum.avgStrength}`);
  console.log("\n▸ Psalm Inject");
  inject({ strength: lastR?.avg ?? 0.7, entropy: lastQ?.entropy ?? 0.3, consensus: lastM?.consensus ?? 0.5 }, lastM?.decision);
  console.log("\n▸ Myth Weaver"); myth.cycle(0);
  console.log("\n▸ Visualizer Feed"); vizCycle(0);
  console.log("\n▸ Resonance Bus (last 6)");
  recent(6).forEach(e => console.log(`  ${e.event}`, JSON.stringify(e.payload).slice(0, 65)));
  console.log("\nOrchestrator complete.\n");
  return { exec, mesh: lastM, crystals: sum, oracle: face };
}
module.exports = { run };
if (require.main === module) run(2);
