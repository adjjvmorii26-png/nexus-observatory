const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "out");
function ensure() { try { fs.mkdirSync(OUT, { recursive: true }); } catch (e) {} }
function writeReport(data = {}) {
  ensure();
  const id = `cycle_${Date.now().toString(36)}`;
  const payload = {
    id, sealed_at: new Date().toISOString(), lineage: data.lineage ?? null,
    exec: data.exec ? { ok: data.exec.ok, total: data.exec.total, avgStrength: data.exec.avgStrength, avgEntropy: data.exec.avgEntropy, systems: (data.exec.results || []).map(r => ({ name: r.name, ok: r.ok, theme: r.theme, strength: r.metrics?.strength, entropy: r.metrics?.entropy })) } : null,
    mesh: data.mesh ?? null,
    oracle: data.oracle ? { name: data.oracle.name, omen: data.oracle.omen } : null,
    crystals: data.crystals ?? null, psalm: data.psalm ?? null, creative: data.creative ?? null
  };
  try { fs.writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify(payload, null, 2)); } catch (e) {}
  const md = [`# Nexus Cycle Report \`${id}\``, ``, `Sealed: ${payload.sealed_at}`, ``, `## Exec`, payload.exec ? `- ${payload.exec.ok}/${payload.exec.total} OK · avg str=${payload.exec.avgStrength} ent=${payload.exec.avgEntropy}` : `- (none)`, ``, `## Mesh`, payload.mesh ? `- decision=${payload.mesh.decision} consensus=${payload.mesh.consensus}` : `- (none)`, ``, `## Oracle`, payload.oracle ? `- ${payload.oracle.name}: "${payload.oracle.omen}"` : `- (none)`, ``, `## Crystals`, payload.crystals ? `- count=${payload.crystals.count} avg_str=${payload.crystals.avgStrength} avg_ent=${payload.crystals.avgEntropy}` : `- (none)`, ``, `## Psalm`, payload.psalm ? `- ${payload.psalm.agent}: "${payload.psalm.line}"` : `- (none)`, ``].join("\n");
  try { fs.writeFileSync(path.join(OUT, `${id}.md`), md); } catch (e) {}
  console.log(`[report] wrote ${id}.json / ${id}.md`);
  return { id, payload };
}
function latest() {
  ensure();
  try {
    const files = fs.readdirSync(OUT).filter(f => f.endsWith(".json")).sort();
    if (!files.length) return null;
    return JSON.parse(fs.readFileSync(path.join(OUT, files[files.length - 1]), "utf8"));
  } catch (e) { return null; }
}
module.exports = { writeReport, latest, OUT };
