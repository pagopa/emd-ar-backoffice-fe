import { createTheme } from '@mui/material/styles';

import { theme } from '@pagopa/mui-italia';

export const appTheme = createTheme(theme, {
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#d32f2f',
                },
            },
        },
    },
    typography: {
        label: {
            fontFamily: 'Titillium Web',
            fontWeight: 600,
            fontSize: 16,
        },
        h6: {
            color: '#0E0F13',
            fontWeight: 700,
        },
    },
});