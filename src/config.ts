// Variabili d'ambiente iniettate a build-time da Vite (VITE_* in .env o tramite pipeline)

export const CONFIG = {
  ENV: import.meta.env.VITE_ENV,
  APPINSIGHTS_CONNECTION_STRING: import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  MOCK_ACTIVE: import.meta.env.VITE_MOCK_ACTIVE,
  AR_BASE_URL: import.meta.env.VITE_AR_BASE_URL
};
