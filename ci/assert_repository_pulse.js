const fs = require("node:fs");

const file = process.argv[2] || "ecosystem/repository-pulse.example.json";
const pulse = JSON.parse(fs.readFileSync(file, "utf8"));

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

const errors = required
  .filter((key) => !(key in pulse))
  .map((key) => `missing required field: ${key}`);

for (const key of required) {
  if (["repository", "commit"].includes(key)) continue;
  if (key in pulse && !Array.isArray(pulse[key])) errors.push(`expected array: ${key}`);
}

if (typeof pulse.repository !== "string" || !pulse.repository) errors.push("repository must be a non-empty string");
if (typeof pulse.commit !== "string" || !pulse.commit) errors.push("commit must be a non-empty string");

if (errors.length) {
  console.error("Repository Pulse CI FAILED");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Repository Pulse CI PASSED");
