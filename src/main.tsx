import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import './appInsights';

import { router } from './App.tsx';
import { store } from './redux/store';
import { appTheme } from './theme';
import { CONFIG } from './config';
import { printMockHelp } from './mocks/scenarios';

// In mock mode, prints ready-to-use commands to the console for simulating error scenarios.
if (CONFIG.MOCK_ACTIVE) {
    printMockHelp();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);