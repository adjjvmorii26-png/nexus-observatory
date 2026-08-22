#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "══════════════════════════════════════════"
echo "  NEXUS OBSERVATORY — refined lineage"
echo "══════════════════════════════════════════"
node orchestrator/run_cycle.js
