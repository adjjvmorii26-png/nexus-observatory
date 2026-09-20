# Ecosystem Observatory

This layer turns the Codex registry into a small, portable observability contract.

The design starts file-first: no database, vendor SDK, or hosted service is required.

## Data flow

codexskills registry -> snapshot -> health observations -> lineage view

Each observation is timestamped and evidence-backed. Missing evidence is represented as unknown, not healthy.

## Status vocabulary

- verified: checked directly
- inferred: derived from repository metadata
- unknown: not yet checked
- attention: evidence indicates follow-up is needed

A later adapter may publish snapshots to the Nexus journal, metrics exporter, or a web dashboard without changing the contract.
