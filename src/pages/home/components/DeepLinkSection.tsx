import {
    ContentCopy as ContentCopyIcon,
    EditOutlined as ModifyIcon
} from '@mui/icons-material';
import {
    Box, Divider, IconButton,
    Paper, Tooltip, Typography
} from '@mui/material';
import type { AgentLink } from '../../../types/tpp';
import { sxFieldLabel, sxFieldValue, sxOsHeader, sxSectionTitle } from '../../../theme/typography';
import { ButtonNaked } from '@pagopa/mui-italia';
import { Fragment } from 'react/jsx-runtime';

interface DeepLinkSectionProps {
    agentLinks: Record<string, AgentLink>;
    onModify?: () => void;
}

const CopyableRow = ({ label, value, copyPayload }: { label: string; value: string; copyPayload: object }) => {
    const handleCopy = () => void navigator.clipboard.writeText(JSON.stringify(copyPayload, null, 2));

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ px: 1.5, py: 1 }}>
            <Box display="flex" flexDirection="column" gap={0.25} minWidth={0}>
                {label && (
                    <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                        {label}
                    </Typography>
                )}
                <Typography sx={{ ...sxFieldValue, wordBreak: 'break-all' }}>
                    {value}
                </Typography>
            </Box>
            <Tooltip title="Copia payload" placement="top" arrow>
                <IconButton size="small" onClick={handleCopy} sx={{ ml: 1, flexShrink: 0 }}>
                    <ContentCopyIcon sx={{ fontSize: 16 }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

const AgentCard = ({ agentName, agentData }: { agentName: string; agentData: AgentLink }) => (
    <Paper elevation={0} className='cardsData'>

        {/* OS Header */}
        <Typography sx={{ ...sxOsHeader, color: 'text.secondary' }}>
            {agentName}
        </Typography>

        {/* Fallback link */}
        <Box display="flex" flexDirection="column" gap={0.75}>
            <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                Fallback link
            </Typography>
            <CopyableRow
                label=""
                value={agentData.fallBackLink}
                copyPayload={{
                    agent: agentName,
                    originId: '<origin_id>',
                }}
            />
        </Box>

        <Divider />

        {/* Versions */}
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                Versioni disponibili
            </Typography>
            {Object.entries(agentData.versions).map(([version, details], index) => (
                <Fragment key={version}>
                    {index !== 0 && <Divider />}
                    <CopyableRow
                        label={version}
                        value={details.link}
                        copyPayload={{
                            agent: agentName,
                            originId: '<origin_id>',
                            linkVersion: version,
                        }}
                    />
                </Fragment>
            ))}
        </Box>
    </Paper>
);

export const DeepLinkSection = ({ agentLinks, onModify }: DeepLinkSectionProps) => (
    <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={sxSectionTitle}>Configurazione deep link</Typography>
            <ButtonNaked onClick={onModify} color="primary" style={{ display: "flex", gap: 8 }}>
                <ModifyIcon fontSize="small" />
                <Typography variant="label">Modifica</Typography>
            </ButtonNaked>
        </Box>

        {Object.entries(agentLinks).map(([agentName, agentData]) => (
            <AgentCard key={agentName} agentName={agentName} agentData={agentData} />
        ))}

    </Paper>
);