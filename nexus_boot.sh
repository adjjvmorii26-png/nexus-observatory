#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "══════════════════════════════════════════"
echo "  NEXUS OBSERVATORY — Wave 3"
echo "══════════════════════════════════════════"
node orchestrator/run_cycle.js
