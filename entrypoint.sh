#!/bin/sh
set -e

# Genera il file di configurazione a runtime con le variabili d'ambiente
# In questo modo non è necessario rebuilddare l'immagine per cambiare la configurazione

ENV_FILE=/usr/share/nginx/html/env-config.js

cat > "$ENV_FILE" <<EOF
window.__ENV__ = {
  APPINSIGHTS_CONNECTION_STRING: "${APPINSIGHTS_CONNECTION_STRING:-}",
  API_BASE_URL: "${API_BASE_URL:-}"
};
EOF

exec "$@"

