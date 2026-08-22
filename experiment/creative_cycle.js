const dream = require("./dream_buffer/dream_buffer.js");
const symbiosis = require("./symbiosis/symbiosis.js");
const archaeology = require("./echo_archaeology/archaeology.js");
const myth = require("./myth_weaver/myth.js");
const mirror = require("./mirror_twin/mirror.js");
const chord = require("./resonance_chord/chord.js");
const oracle = require("./oracle_die/oracle.js");
const garden = require("./entropy_garden/garden.js");
const tide = require("./tide_clock/tide.js");
const compost = require("./collapse_compost/compost.js");
const liminal = require("./liminal_gate/gate.js");
const dissonance = require("./choir_dissonance/dissonance.js");
const palimpsest = require("./palimpsest/palimpsest.js");
const { recent } = require("../resonance_bus/bus.js");
function run(ticks = 3) {
  console.log("CREATIVE EXPERIMENTS (expanded)\n");
  const sections = [
    ["Dream Buffer", dream], ["Symbiosis", symbiosis], ["Echo Archaeology", archaeology],
    ["Oracle Die", oracle], ["Entropy Garden", garden], ["Tide Clock", tide],
    ["Collapse Compost", compost], ["Liminal Gate", liminal], ["Choir Dissonance", dissonance],
    ["Palimpsest", palimpsest], ["Mirror Twin", mirror], ["Resonance Chord", chord]
  ];
  liminal.reset && liminal.reset();
  for (const [label, mod] of sections) {
    console.log(`▸ ${label}`);
    for (let t = 0; t < ticks; t++) mod.cycle(t);
    console.log();
  }
  console.log("▸ Myth Weaver"); myth.cycle(0); console.log();
  console.log("▸ Bus (creative)");
  recent(12).forEach(e => {
    if (/DREAM|SYMBIOSIS|EXCAVATE|MYTH|MIRROR|CHORD|ORACLE|GARDEN|TIDE|COMPOST|LIMINAL|DISSENT|PALIMPSEST/.test(e.event))
      console.log(`  ${e.event}`, JSON.stringify(e.payload).slice(0, 55));
  });
  console.log("\nCreative cycle complete.\n");
}
module.exports = { run };
if (require.main === module) run(3);
