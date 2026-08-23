const mods = [
  ["Dream Buffer", "./dream_buffer/dream_buffer.js"],
  ["Symbiosis", "./symbiosis/symbiosis.js"],
  ["Echo Archaeology", "./echo_archaeology/archaeology.js"],
  ["Oracle Die", "./oracle_die/oracle.js"],
  ["Entropy Garden", "./entropy_garden/garden.js"],
  ["Tide Clock", "./tide_clock/tide.js"],
  ["Collapse Compost", "./collapse_compost/compost.js"],
  ["Liminal Gate", "./liminal_gate/gate.js"],
  ["Choir Dissonance", "./choir_dissonance/dissonance.js"],
  ["Palimpsest", "./palimpsest/palimpsest.js"],
  ["Mirror Twin", "./mirror_twin/mirror.js"],
  ["Resonance Chord", "./resonance_chord/chord.js"],
  ["Gravity Well", "./gravity_well/gravity.js"],
  ["Cascade Fail", "./cascade_fail/cascade.js"],
  ["Chrono Bookmark", "./chrono_bookmark/bookmark.js"],
  ["Faction Swarm", "./faction_swarm/swarm.js"]
];
function run(ticks = 2) {
  console.log("CREATIVE EXPERIMENTS (Wave 9)\n");
  for (const [label, rel] of mods) {
    console.log(`▸ ${label}`);
    try {
      const mod = require(rel);
      if (label === "Liminal Gate" && mod.reset) mod.reset();
      for (let t = 0; t < ticks; t++) mod.cycle(t);
    } catch (e) { console.log(`  FAIL: ${e.message}`); }
    console.log();
  }
  try { console.log("▸ Myth Weaver"); require("./myth_weaver/myth.js").cycle(0); console.log(); } catch (e) {}
  try { console.log("▸ Signal Reliquary"); require("../resonance_bus/reliquary.js").cycle(); console.log(); } catch (e) {}
  console.log("Creative cycle complete.\n");
}
module.exports = { run };
if (require.main === module) run(2);
