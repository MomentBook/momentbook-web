#!/usr/bin/env bash

set -euo pipefail

PORT="${SEO_AUDIT_SERVER_PORT:-3110}"
HOST="${SEO_AUDIT_SERVER_HOST:-127.0.0.1}"
BASE_URL="http://${HOST}:${PORT}"
READY_PATH="${SEO_AUDIT_READY_PATH:-/en}"
READY_URL="${BASE_URL}${READY_PATH}"
WAIT_SECONDS="${SEO_AUDIT_READY_TIMEOUT_SECONDS:-60}"
LOG_FILE="$(mktemp -t momentbook-seo-audit-build.XXXXXX.log)"
SERVER_PID=""

cleanup() {
  if [[ -n "${SERVER_PID}" ]] && kill -0 "${SERVER_PID}" >/dev/null 2>&1; then
    kill "${SERVER_PID}" >/dev/null 2>&1 || true
    wait "${SERVER_PID}" >/dev/null 2>&1 || true
  fi

  rm -f "${LOG_FILE}"
}

trap cleanup EXIT

echo "[seo:audit:build] Building production bundle"
yarn build

echo "[seo:audit:build] Starting production server on ${BASE_URL}"
yarn next start -p "${PORT}" >"${LOG_FILE}" 2>&1 &
SERVER_PID=$!

for (( attempt=1; attempt<=WAIT_SECONDS; attempt+=1 )); do
  if curl -sS -I --max-time 5 "${READY_URL}" >/dev/null 2>&1; then
    break
  fi

  if [[ "${attempt}" -eq "${WAIT_SECONDS}" ]]; then
    echo "[seo:audit:build] Server did not become ready in time"
    echo "[seo:audit:build] Server log:"
    cat "${LOG_FILE}"
    exit 1
  fi

  sleep 1
done

echo "[seo:audit:build] Running SEO audit against ${BASE_URL}"
SEO_AUDIT_BASE_URL="${BASE_URL}" yarn seo:audit
