#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "══════════════════════════════════════════"
echo "  NEXUS OBSERVATORY — refined + creative"
echo "══════════════════════════════════════════"
node orchestrator/run_cycle.js
