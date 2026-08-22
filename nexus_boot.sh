#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "══════════════════════════════════════════"
echo "  NEXUS OBSERVATORY — Wave 4"
echo "══════════════════════════════════════════"
node orchestrator/run_cycle.js
