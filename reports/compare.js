const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "out");
function listReports() {
  try { return fs.readdirSync(OUT).filter(f => f.endsWith(".json")).sort(); }
  catch (e) { return []; }
}
function load(idOrFile) {
  let file = idOrFile.endsWith(".json") ? idOrFile : `${idOrFile}.json`;
  return JSON.parse(fs.readFileSync(path.join(OUT, file), "utf8"));
}
function delta(a, b, label) {
  if (a == null || b == null) return `${label}: ${a ?? "—"} → ${b ?? "—"}`;
  if (typeof a === "number" && typeof b === "number") {
    const d = b - a;
    return `${label}: ${a} → ${b} (${d > 0 ? "+" : ""}${(+d).toFixed(3)})`;
  }
  return `${label}: ${a} → ${b}`;
}
function compare(aId, bId) {
  const files = listReports();
  if (files.length < 2 && (!aId || !bId)) { console.log("Need at least 2 reports."); return null; }
  const a = load(aId || files[files.length - 2]);
  const b = load(bId || files[files.length - 1]);
  console.log("REPORT COMPARE");
  console.log(`  A: ${a.id}  (${a.sealed_at})`);
  console.log(`  B: ${b.id}  (${b.sealed_at})\n`);
  console.log("▸ Mesh");
  console.log(" ", delta(a.mesh?.decision, b.mesh?.decision, "decision"));
  console.log(" ", delta(a.mesh?.consensus, b.mesh?.consensus, "consensus"));
  console.log("\n▸ Oracle");
  console.log(" ", delta(a.oracle?.name, b.oracle?.name, "face"));
  console.log("\n▸ Exec");
  console.log(" ", delta(a.exec?.avgStrength, b.exec?.avgStrength, "avgStrength"));
  console.log(" ", delta(a.exec?.ok, b.exec?.ok, "ok"));
  console.log("\n▸ Crystals");
  console.log(" ", delta(a.crystals?.count, b.crystals?.count, "count"));
  console.log(" ", delta(a.crystals?.avgStrength, b.crystals?.avgStrength, "avgStrength"));
  console.log("\n▸ Psalm");
  console.log(`  A: ${a.psalm?.agent || "—"} — "${a.psalm?.line || ""}"`);
  console.log(`  B: ${b.psalm?.agent || "—"} — "${b.psalm?.line || ""}"\n`);
  return { a, b };
}
module.exports = { compare, listReports, load };
if (require.main === module) compare(process.argv[2], process.argv[3]);
