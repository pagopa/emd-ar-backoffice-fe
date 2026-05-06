import type React from 'react';

export { };

declare module '@mui/material/styles' {
    interface TypographyVariants {
        label: React.CSSProperties;
        labelDevice: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        label?: React.CSSProperties;
        labelDevice?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        label: true;
        labelDevice: true;
    }
}