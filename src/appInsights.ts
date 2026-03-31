import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { CONFIG } from './config';

export const appInsights = new ApplicationInsights({
  config: {
    connectionString: CONFIG.APPINSIGHTS_CONNECTION_STRING,
    enableAutoRouteTracking: true,
  },
});

if (CONFIG.APPINSIGHTS_CONNECTION_STRING) {
  appInsights.loadAppInsights();
}

