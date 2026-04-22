import { theme } from '@pagopa/mui-italia';
import { createTheme } from '@mui/material/styles';

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
});