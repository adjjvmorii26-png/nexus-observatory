#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "══════════════════════════════════════════"
echo "  NEXUS OBSERVATORY — Wave 7"
echo "══════════════════════════════════════════"
node memory_crystals/seed_history.js 2>/dev/null || true
node orchestrator/run_cycle.js
