const fs = require("fs");
const path = require("path");
const { load: loadConfig } = require("../bridge/config.js");
const LOG = path.join(__dirname, "journal.jsonl");
const MD = path.join(__dirname, "JOURNAL.md");
function append(entry = {}) {
  const cfg = loadConfig();
  if (cfg.journal && cfg.journal.enabled === false) return null;
  const row = { t: new Date().toISOString(), id: entry.id || `j_${Date.now().toString(36)}`, decision: entry.decision || null, consensus: entry.consensus ?? null, oracle: entry.oracle || null, psalm: entry.psalm || null, exec_ok: entry.exec_ok ?? null, crystals: entry.crystals ?? null, note: entry.note || null };
  try { fs.appendFileSync(LOG, JSON.stringify(row) + "\n"); } catch (e) {}
  try {
    const lines = fs.existsSync(LOG) ? fs.readFileSync(LOG, "utf8").trim().split("\n") : [];
    const tail = lines.slice(-(cfg.journal?.max_entries || 100));
    const md = ["# Nexus Journal", "", ...tail.map(l => { try { const e = JSON.parse(l); return `- **${e.t}** · ${e.decision || "?"} @ ${e.consensus ?? "?"} · oracle=${e.oracle || "—"} · ${e.psalm ? `"${e.psalm}"` : ""}`; } catch (err) { return `- ${l.slice(0, 80)}`; } }), ""].join("\n");
    fs.writeFileSync(MD, md);
  } catch (e) {}
  return row;
}
function recent(n = 10) {
  try { return fs.readFileSync(LOG, "utf8").trim().split("\n").filter(Boolean).slice(-n).map(l => { try { return JSON.parse(l); } catch (e) { return { raw: l }; } }); }
  catch (e) { return []; }
}
module.exports = { append, recent, LOG, MD };
if (require.main === module) { append({ decision: "STABILIZE", consensus: 0.8, oracle: "NULL_FACE", psalm: "self-test" }); console.log(recent(3)); }
