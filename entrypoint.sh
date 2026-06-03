#!/bin/bash

JEKYLL_PID=""

cleanup() {
  [ -n "$JEKYLL_PID" ] && kill "$JEKYLL_PID" 2>/dev/null
  exit 0
}
trap cleanup SIGTERM SIGINT

start_jekyll() {
  jekyll serve -H 0.0.0.0 -w &
  JEKYLL_PID=$!
  echo "Jekyll started (PID $JEKYLL_PID)"
}

CONFIG_HASH=$(md5sum _config.yml | awk '{print $1}')
start_jekyll

echo "Watching _config.yml for changes..."
while true; do
  sleep 2
  NEW_HASH=$(md5sum _config.yml | awk '{print $1}')
  if [ "$NEW_HASH" != "$CONFIG_HASH" ]; then
    CONFIG_HASH=$NEW_HASH
    echo ""
    echo ">>> _config.yml changed — restarting Jekyll..."
    echo ""
    kill "$JEKYLL_PID" 2>/dev/null
    wait "$JEKYLL_PID" 2>/dev/null
    start_jekyll
  fi
done
