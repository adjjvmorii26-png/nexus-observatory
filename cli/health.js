const fs = require("fs");
const path = require("path");
const crystals = require("../memory_crystals/crystal_store.js");
const { latest } = require("../reports/report.js");
const { listReports } = require("../reports/compare.js");
const { load: loadExport } = require("../metrics_export/export.js");
const { load: loadConfig } = require("../bridge/config.js");
const { available } = require("../bridge/exec_adapters/exec.js");
const lineage = require("../lineage_map/map.js");
function check() {
  const issues = [], ok = [];
  const cfg = loadConfig();
  ok.push(`config v${cfg.version} thresholds stabilize=${cfg.interop.threshold.stabilize}`);
  const lin = lineage.count();
  if (lin < 1) issues.push("lineage empty"); else ok.push(`lineage ${lin} systems`);
  const avail = available().length;
  if (avail < 1) issues.push("no exec targets"); else ok.push(`exec available ${avail}`);
  const sum = crystals.summary();
  if (sum.count === 0) issues.push("no memory crystals (run npm run seed)"); else ok.push(`crystals ${sum.count} avg_str=${sum.avgStrength}`);
  const rep = latest();
  if (!rep) issues.push("no cycle reports yet"); else ok.push(`latest report ${rep.id}`);
  ok.push(`report archive ${listReports().length}`);
  const frame = loadExport();
  if (!frame?.systems?.length) issues.push("no metrics export"); else ok.push(`export ${frame.systems.length} systems`);
  const journalPath = path.join(__dirname, "../journal/journal.jsonl");
  if (fs.existsSync(journalPath)) ok.push(`journal entries ${fs.readFileSync(journalPath, "utf8").trim().split("\n").filter(Boolean).length}`);
  else ok.push("journal empty");
  console.log("NEXUS HEALTH\n");
  ok.forEach(l => console.log("  ✓", l));
  issues.forEach(l => console.log("  ✗", l));
  console.log();
  if (issues.length) { console.log(`HEALTH: ${issues.length} issue(s)`); process.exitCode = 1; }
  else console.log("HEALTH: OK");
  return { ok, issues };
}
module.exports = { check };
if (require.main === module) check();
