import { EditOutlined as ModifyIcon } from '@mui/icons-material';
import { Box, Paper, Typography } from "@mui/material";

import { ReadonlyField } from './ReadOnlyField';

import { ButtonNaked } from "@pagopa/mui-italia";

interface CredentialsSectionProps {
    title: string;
    clientId: string;
    clientSecret: string;
    grantType: string;
    modify?: boolean;
    onModify?: () => void;
}

export const CredentialsSection = ({ title, clientId, clientSecret, grantType, modify, onModify }: CredentialsSectionProps) => (
    <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {modify ?
            <Box
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                gap={0.5}
                sx={{ color: 'primary.main' }}
            >
                <Typography variant="h6">{title} </Typography>
                <ButtonNaked onClick={onModify} color="primary" style={{ display: "flex", gap: 8 }}>
                    <ModifyIcon fontSize="small" />
                    <Typography variant="label">Modifica</Typography>
                </ButtonNaked>
            </Box>
            :
            <Typography variant="h6">{title}</Typography>
        }
        <ReadonlyField label="CLIENT ID" value={clientId} />
        <ReadonlyField label="CLIENT SECRET" value={clientSecret} secret />
        <ReadonlyField label="GRANT TYPE" value={grantType} />
    </Paper>
);
