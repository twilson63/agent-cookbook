#!/bin/bash
# Deploy agent-cookbook to cookbook.scoutos.live
# Usage: ./deploy.sh

set -e

SUBDOMAIN="cookbook"
# Keys stored locally — never commit these files
DEPLOY_KEY="${SCOUTOS_KEY:-$(cat ~/.scoutos-deploy-key 2>/dev/null)}"
PUBLISH_CODE="${SCOUTOS_PUBLISH_CODE:-$(cat ~/.scoutos-cookbook-publish-code 2>/dev/null)}"

if [ -z "$DEPLOY_KEY" ]; then
  echo "❌ No deploy key found."
  echo "   Set SCOUTOS_KEY env var or save the key to ~/.scoutos-deploy-key"
  exit 1
fi

echo "📖 Deploying agent-cookbook to ${SUBDOMAIN}.scoutos.live..."

cd "$(dirname "$0")"

# Pull latest main first
git pull origin main

echo "📦 Creating archive..."
tar -czf /tmp/${SUBDOMAIN}.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.next' \
  .

echo "🚀 Uploading to scoutos.live..."
BUILD_URL="https://scoutos.live/api/build?subdomain=${SUBDOMAIN}"
if [ -n "$PUBLISH_CODE" ]; then
  BUILD_URL="${BUILD_URL}&code=${PUBLISH_CODE}"
fi
RESPONSE=$(curl -s -X POST \
  "$BUILD_URL" \
  -H "Authorization: Bearer ${DEPLOY_KEY}" \
  --data-binary @/tmp/${SUBDOMAIN}.tar.gz)

echo "Response: ${RESPONSE}"

BUILD_ID=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('buildId',''))" 2>/dev/null)

if [ -z "$BUILD_ID" ]; then
  echo "❌ No build ID returned — deploy may have failed"
  exit 1
fi

echo "Build queued: ${BUILD_ID}"
echo "Waiting for build to complete..."

sleep 30

for i in $(seq 1 20); do
  STATUS=$(curl -s "https://scoutos.live/api/build/${BUILD_ID}/status" \
    -H "Authorization: Bearer ${DEPLOY_KEY}")
  STATE=$(echo "$STATUS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status',''))" 2>/dev/null)
  echo "[$i] $STATE"
  if [ "$STATE" = "succeeded" ] || [ "$STATE" = "complete" ] || [ "$STATE" = "success" ] || [ "$STATE" = "deployed" ]; then
    echo ""
    echo "✅ Deployed successfully!"
    echo "🌐 https://${SUBDOMAIN}.scoutos.live"
    rm -f /tmp/${SUBDOMAIN}.tar.gz
    exit 0
  elif [ "$STATE" = "failed" ] || [ "$STATE" = "error" ]; then
    echo "❌ Build failed:"
    echo "$STATUS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('error','')[:500])" 2>/dev/null
    rm -f /tmp/${SUBDOMAIN}.tar.gz
    exit 1
  fi
  sleep 20
done

echo "⏱️ Timed out waiting for build — check status manually:"
echo "https://scoutos.live/api/build/${BUILD_ID}/status"
rm -f /tmp/${SUBDOMAIN}.tar.gz
