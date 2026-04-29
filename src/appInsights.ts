import { CONFIG } from './config';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';

export const appInsights = new ApplicationInsights({
  config: {
    connectionString: CONFIG.APPINSIGHTS_CONNECTION_STRING,
    enableAutoRouteTracking: true,
  },
});

if (CONFIG.APPINSIGHTS_CONNECTION_STRING) {
  appInsights.loadAppInsights();
}

