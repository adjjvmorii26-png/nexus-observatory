#!/usr/bin/env node
/**
 * Validate and normalize a Codexskills Repository Pulse.
 * Usage: node ecosystem/repository-pulse.mjs pulse.json
 *
 * This is an evidence adapter only. It never grants merge, deploy,
 * credential, access, or production authority.
 */
import fs from "node:fs/promises";

const file = process.argv[2] ?? "ecosystem/repository-pulse.example.json";
const pulse = JSON.parse(await fs.readFile(file, "utf8"));

const required = [
  "repository",
  "commit",
  "capabilities",
  "changed_surfaces",
  "validation",
  "deployment_requirements",
  "open_experiments",
  "uncertainties"
];

const errors = [];
for (const key of required) {
  if (!(key in pulse)) errors.push(`missing required field: ${key}`);
}
for (const key of required) {
  if (key in pulse && !Array.isArray(pulse[key]) && key !== "repository" && key !== "commit") {
    errors.push(`expected array: ${key}`);
  }
}
if (typeof pulse.repository !== "string" || !pulse.repository) errors.push("repository must be a non-empty string");
if (typeof pulse.commit !== "string" || !pulse.commit) errors.push("commit must be a non-empty string");

if (errors.length) {
  console.error("repository pulse: FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  const normalized = {
    kind: "repository-pulse-observation",
    repository: pulse.repository,
    commit: pulse.commit,
    capabilities: pulse.capabilities,
    changed_surfaces: pulse.changed_surfaces,
    validation: pulse.validation,
    deployment_requirements: pulse.deployment_requirements,
    open_experiments: pulse.open_experiments,
    uncertainties: pulse.uncertainties,
    human_gates: pulse.human_gates ?? [],
    authority: "descriptive-only"
  };
  process.stdout.write(JSON.stringify(normalized, null, 2) + "\n");
}
