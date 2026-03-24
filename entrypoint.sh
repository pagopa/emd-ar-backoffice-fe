#!/bin/sh
set -e

# Genera env-config.js leggendo tutte le variabili VITE_ dall'ambiente
# Questo file viene caricato da index.html e rende le variabili disponibili
# su window._env_ a runtime nel browser

ENV_CONFIG_FILE=/usr/share/nginx/html/env-config.js

echo "window._env_ = {" > "$ENV_CONFIG_FILE"

env | grep '^VITE_' | while IFS='=' read -r key value; do
  echo "  $key: \"$value\"," >> "$ENV_CONFIG_FILE"
done

echo "};" >> "$ENV_CONFIG_FILE"

echo "env-config.js generated:"
cat "$ENV_CONFIG_FILE"

exec nginx -g 'daemon off;'