const { run } = require("../orchestrator/run_cycle.js");
if (require.main === module) run(3);
module.exports = { run };
