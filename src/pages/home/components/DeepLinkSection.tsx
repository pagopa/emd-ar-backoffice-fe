import {
    ContentCopy as ContentCopyIcon,
    EditOutlined as ModifyIcon,
} from '@mui/icons-material';
import {
    Box, Divider, IconButton,
    Paper, Tooltip, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react/jsx-runtime';

import type { AgentLink } from '../../../types/tpp';
import { sxFieldLabel, sxFieldValue, sxOsHeader, sxSectionTitle } from '../../../theme/typography';
import { ButtonNaked } from '@pagopa/mui-italia';

interface DeepLinkSectionProps {
    agentLinks: Record<string, AgentLink>;
    onModify?: () => void;
}

const CopyableRow = ({ label, value, copyPayload }: { label: string; value: string; copyPayload: object }) => {
    const { t } = useTranslation();
    const handleCopy = () => void navigator.clipboard.writeText(JSON.stringify(copyPayload, null, 2));

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
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
            <Tooltip title={t('home.deepLinkSection.copyPayload')} placement="top" arrow>
                <IconButton size="small" onClick={handleCopy} sx={{ ml: 1, flexShrink: 0 }}>
                    <ContentCopyIcon sx={{ fontSize: 16, transform: 'scaleY(-1)' }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

const AgentCard = ({ agentName, agentData }: { agentName: string; agentData: AgentLink }) => {
    const { t } = useTranslation();

    return (
        <Paper elevation={0} className="cardsData" sx={{ py: 2 }}>

            {/* OS Header */}
            <Typography sx={{ ...sxOsHeader, color: 'text.secondary' }}>
                {agentName}
            </Typography>

            {/* Fallback link */}
            <Box display="flex" flexDirection="column" gap={0.75}>
                <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                    {t('home.deepLinkSection.fallbackLink')}
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

            {agentData.versions && Object.keys(agentData.versions).length > 0 && (
                <>
                    <Divider />
                    {/* Versions */}
                    <Box display="flex" flexDirection="column" gap={1}>
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
                </>
            )}
        </Paper>
    );
};

export const DeepLinkSection = ({ agentLinks, onModify }: DeepLinkSectionProps) => {
    const { t } = useTranslation();

    const DEVICE_ORDER = ['ANDROID', 'IOS', 'WEB'];

    const sortedAgentLinks = Object.entries(agentLinks).sort(
        ([a], [b]) => DEVICE_ORDER.indexOf(a) - DEVICE_ORDER.indexOf(b)
    );

    return (
        <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography sx={sxSectionTitle}>{t('home.deepLinkSection.title')}</Typography>
                <ButtonNaked onClick={onModify} color="primary" style={{ display: 'flex', gap: 8 }}>
                    <ModifyIcon fontSize="small" />
                    <Typography variant="label">{t('commonLabel.modify')}</Typography>
                </ButtonNaked>
            </Box>

            {sortedAgentLinks.map(([agentName, agentData]) => (
                <AgentCard key={agentName} agentName={agentName} agentData={agentData} />
            ))}
        </Paper>
    );
};
