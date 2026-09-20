#!/usr/bin/env node
import fs from "node:fs/promises";

const file = process.argv[2] ?? "ecosystem/innovation-seeds.json";
const data = JSON.parse(await fs.readFile(file, "utf8"));
const counts = {};
for (const seed of data.seeds) counts[seed.risk] = (counts[seed.risk] ?? 0) + 1;

const radar = {
  schema_version: 1,
  wave: data.wave,
  generated_at: new Date().toISOString(),
  seed_count: data.seeds.length,
  risk_counts: counts,
  frontier: data.seeds.filter(seed => seed.risk !== "high").map(seed => seed.id)
};
process.stdout.write(JSON.stringify(radar, null, 2) + "\n");
