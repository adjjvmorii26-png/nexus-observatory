const dream = require("./dream_buffer/dream_buffer.js");
const symbiosis = require("./symbiosis/symbiosis.js");
const archaeology = require("./echo_archaeology/archaeology.js");
const myth = require("./myth_weaver/myth.js");
const mirror = require("./mirror_twin/mirror.js");
const chord = require("./resonance_chord/chord.js");
const oracle = require("./oracle_die/oracle.js");
const garden = require("./entropy_garden/garden.js");
const { recent } = require("../resonance_bus/bus.js");
function run(ticks = 3) {
  console.log("CREATIVE EXPERIMENTS\n");
  console.log("▸ Dream Buffer");
  for (let t = 0; t < ticks; t++) dream.cycle(t);
  console.log("\n▸ Symbiosis");
  for (let t = 0; t < ticks; t++) symbiosis.cycle(t);
  console.log("\n▸ Echo Archaeology");
  for (let t = 0; t < ticks; t++) archaeology.cycle(t);
  console.log("\n▸ Oracle Die");
  for (let t = 0; t < ticks; t++) oracle.cycle(t);
  console.log("\n▸ Entropy Garden");
  for (let t = 0; t < ticks; t++) garden.cycle(t);
  console.log("\n▸ Mirror Twin");
  for (let t = 0; t < ticks; t++) mirror.cycle(t);
  console.log("\n▸ Resonance Chord");
  for (let t = 0; t < ticks; t++) chord.cycle(t);
  console.log("\n▸ Myth Weaver");
  myth.cycle(0);
  console.log("\n▸ Bus (creative events)");
  recent(8).forEach(e => {
    if (/DREAM|SYMBIOSIS|EXCAVATE|MYTH|MIRROR|CHORD|ORACLE|GARDEN/.test(e.event))
      console.log(`  ${e.event}`, JSON.stringify(e.payload).slice(0, 60));
  });
  console.log("\nCreative cycle complete.\n");
}
module.exports = { run };
if (require.main === module) run(3);
