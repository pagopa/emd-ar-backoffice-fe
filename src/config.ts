// Legge le variabili d'ambiente sia da window.__ENV__ (runtime, iniettate da entrypoint.sh)
// che da import.meta.env (build-time, definite in .env)

const env = (window as Window & { __ENV__?: Record<string, string> }).__ENV__ ?? {};

export const config = {
  appInsightsConnectionString:
    env.APPINSIGHTS_CONNECTION_STRING || import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING,
  apiBaseUrl: env.API_BASE_URL || import.meta.env.VITE_API_BASE_URL,
};

