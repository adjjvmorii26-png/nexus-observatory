const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "out");
const INDEX = path.join(__dirname, "INDEX.md");
function build() {
  let files = [];
  try { files = fs.readdirSync(OUT).filter(f => f.endsWith(".json")).sort(); } catch (e) {}
  const rows = files.map(f => {
    try {
      const j = JSON.parse(fs.readFileSync(path.join(OUT, f), "utf8"));
      return { id: j.id, sealed: j.sealed_at, decision: j.mesh?.decision, consensus: j.mesh?.consensus, oracle: j.oracle?.name, exec: j.exec ? `${j.exec.ok}/${j.exec.total}` : "—", crystals: j.crystals?.count };
    } catch (e) { return { id: f, sealed: "?", decision: "?", consensus: "?", oracle: "?", exec: "?", crystals: "?" }; }
  });
  const md = ["# Nexus Report Index", "", "| id | sealed | decision | consensus | oracle | exec | crystals |", "|----|--------|----------|-----------|--------|------|----------|", ...rows.map(r => `| ${r.id} | ${r.sealed} | ${r.decision} | ${r.consensus} | ${r.oracle} | ${r.exec} | ${r.crystals} |`), "", `_Generated ${new Date().toISOString()}_`, ""].join("\n");
  try { fs.writeFileSync(INDEX, md); } catch (e) {}
  console.log(`[index] ${rows.length} reports → reports/INDEX.md`);
  rows.slice(-5).forEach(r => console.log(`  ${r.id}  ${r.decision} @ ${r.consensus}  ${r.oracle}`));
  return rows;
}
module.exports = { build, INDEX };
if (require.main === module) build();
