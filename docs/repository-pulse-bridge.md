# Repository Pulse Bridge

Nexus Observatory consumes the Codexskills **Repository Pulse** as descriptive evidence.

## Boundary

The bridge accepts a pulse containing:

- repository identity and commit
- declared capabilities
- changed surfaces
- validation evidence
- deployment requirements
- open experiments
- uncertainties
- optional human gates

The bridge normalizes that evidence into an observatory observation. It does **not** infer missing facts or turn telemetry into authority.

## Usage

```bash
node ecosystem/repository-pulse.mjs ecosystem/repository-pulse.example.json
node ci/assert_repository_pulse.js
```

## Safety

A pulse cannot authorize:

- merge or squash merge
- deployment
- credential rotation
- access changes
- production promotion

If a field is missing or malformed, the adapter fails closed.

The source pulse remains authoritative for its own declared evidence; Nexus only records the observation it can validate.
