export {};

declare module '@mui/material/styles' {
    interface TypographyVariants {
        label: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        label?: React.CSSProperties;
    }
}
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        label: true;
    }
}