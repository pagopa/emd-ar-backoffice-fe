import { Typography, Box } from "@mui/material";

export const SectionHeader = ({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) => (
    <Box
    >
        <Typography variant="subtitle1" fontWeight={700}>
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {subtitle}
        </Typography>
    </Box>
);
