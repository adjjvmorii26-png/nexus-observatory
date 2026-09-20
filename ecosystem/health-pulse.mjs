#!/usr/bin/env node
/**
 * Evidence-first local health pulse.
 * Usage: node ecosystem/health-pulse.mjs snapshot.json
 */
import fs from "node:fs/promises";

const file = process.argv[2] ?? "ecosystem/snapshot.example.json";
const snapshot = JSON.parse(await fs.readFile(file, "utf8"));

const checks = snapshot.repositories.map((repo) => ({
  name: repo.name,
  signals: {
    registry: "verified",
    branch: repo.branch ? "verified" : "unknown",
    role: repo.role ? "verified" : "unknown",
    maturity: repo.maturity ? "verified" : "unknown"
  }
}));

const counts = { verified: 0, inferred: 0, unknown: 0, attention: 0 };
for (const item of checks) {
  for (const status of Object.values(item.signals)) counts[status]++;
}

const pulse = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  source: file,
  counts,
  repositories: checks
};

process.stdout.write(JSON.stringify(pulse, null, 2) + "\n");
