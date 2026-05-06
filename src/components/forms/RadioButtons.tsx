import { Box, Radio } from "@mui/material";
import {
    Check
} from '@mui/icons-material';

// Custom Radio icon: blue circle with white checkmark when checked
export const RadioCheckedIcon = () => (
    <Box
        sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#1976d2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Check sx={{ fontSize: 14, color: '#fff', strokeWidth: 2 }} />
    </Box>
);

// Unchecked icon: plain circle outline (matches MUI default look)
export const RadioUncheckedIcon = () => (
    <Box
        sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.38)',
            backgroundColor: 'transparent',
        }}
    />
);

export const CustomRadio = (props: React.ComponentProps<typeof Radio>) => (
    <Radio
        {...props}
        icon={<RadioUncheckedIcon />}
        checkedIcon={<RadioCheckedIcon />}
        sx={{
            '&:hover':
            {
                backgroundColor: 'rgba(25, 118, 210, 0.04)'

            },
            paddingY: 0,
            ...props.sx
        }}
    />
);