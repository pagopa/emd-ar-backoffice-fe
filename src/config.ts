// Variabili d'ambiente iniettate a build-time da Vite (VITE_* in .env o tramite pipeline)

export const config = {
  appInsightsConnectionString: import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};
