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
    },
    typography: {
        label: {
            fontFamily: 'Titillium Web',
            fontWeight: 600,
            fontSize: 16,
        },
    },
});