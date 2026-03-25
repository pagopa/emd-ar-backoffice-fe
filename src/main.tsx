import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './appInsights';
import { appTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
