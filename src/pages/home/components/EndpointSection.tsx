import { EditOutlined as ModifyIcon } from '@mui/icons-material';
import { Box, Chip, Divider, Paper, Typography } from '@mui/material';
import { sxFieldLabel, sxFieldValue, sxSectionTitle } from '../../../theme/typography';
import { ButtonNaked } from '@pagopa/mui-italia';

interface EndpointSectionProps {
    messageUrl: string;
    authenticationUrl: string;
    authenticationType: string;
    onModify?: () => void;
}

export const EndpointSection = ({ messageUrl, authenticationUrl, authenticationType, onModify }: EndpointSectionProps) => (
    <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={sxSectionTitle}>Configurazione endpoint</Typography>
            <ButtonNaked onClick={onModify} color="primary" style={{ display: "flex", gap: 8 }}>
                <ModifyIcon fontSize="small" />
                <Typography variant="label">Modifica</Typography>
            </ButtonNaked>
        </Box>

        <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                URL per ricezione messaggi di cortesia
            </Typography>
            <Typography sx={sxFieldValue}>{messageUrl}</Typography>
            <Divider sx={{ marginTop: 0.5 }} />
        </Box>


        <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                URL di autenticazione
            </Typography>
            <Typography sx={sxFieldValue}>{authenticationUrl}</Typography>
            <Divider sx={{ marginTop: 0.5 }} />
        </Box>


        <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                Tipo di autenticazione
            </Typography>
            <Box>
                <Chip label={authenticationType} size="small" />
            </Box>
        </Box>
    </Paper>
);