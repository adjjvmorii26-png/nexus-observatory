#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "══════════════════════════════════════════"
echo "  NEXUS OBSERVATORY — Wave 13"
echo "══════════════════════════════════════════"
node memory_crystals/seed_history.js 2>/dev/null || true
node orchestrator/run_cycle.js
node reports/index.js 2>/dev/null || true
node metrics_export/status.js 2>/dev/null || true
