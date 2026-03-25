import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { config } from './config';

export const appInsights = new ApplicationInsights({
  config: {
    connectionString: config.appInsightsConnectionString,
    enableAutoRouteTracking: true,
  },
});

if (config.appInsightsConnectionString) {
  appInsights.loadAppInsights();
}

