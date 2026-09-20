const fs = await import("node:fs/promises");

const file = process.argv[2] ?? "ecosystem/snapshot.example.json";
const snapshot = JSON.parse(await fs.readFile(file, "utf8"));

const byRole = new Map();
for (const repo of snapshot.repositories) {
  const list = byRole.get(repo.role) ?? [];
  list.push(repo.name);
  byRole.set(repo.role, list);
}

console.log("# Ecosystem Lineage");
console.log("");
console.log("Generated: " + snapshot.generated_at);
console.log("");
for (const [role, names] of byRole) {
  console.log("## " + role);
  for (const name of names) console.log("- " + name);
  console.log("");
}
