import { Box, Divider, Paper, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
import {
    CodeOutlined as UrlIcon,
    EditOutlined as ModifyIcon
} from '@mui/icons-material';
import { sxCapFieldLabel, sxFieldValue } from '../../../theme/typography';


interface AdditionalParamsSectionProps {
    bodyParams?: Record<string, string>;
    pathParams?: Record<string, string>;
    onModify: () => void;
}


const AdditionalParamsSection = ({ bodyParams, pathParams, onModify }: AdditionalParamsSectionProps) => {
    const { t } = useTranslation();

    return (
        <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={0.5}>
                <Typography variant="h6">{t('credentials.additionalParams.title')}</Typography>
                <ButtonNaked onClick={() => { onModify(); }} color="primary" style={{ display: 'flex', gap: 8 }}>
                    <ModifyIcon fontSize="small" />
                    <Typography variant="label">{t('commonLabel.modify')}</Typography>
                </ButtonNaked>
            </Box>

            <Box display="flex" gap={3}>
                {/* BODY parameters */}
                <Box flex={1} display="flex" flexDirection="column" gap={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <img src="/icons/integration_instructions.svg" alt="" aria-hidden="true" style={{ width: 24, height: 24 }} />
                        <Typography sx={{ ...sxCapFieldLabel, color: 'text.secondary' }}>
                            {t('credentials.additionalParams.bodyParams')}
                        </Typography>
                    </Box>
                    {Object.entries(bodyParams ?? {}).map(([key, val], index) => (
                        <Box key={key} display="flex" flexDirection="column" gap={0.5}>
                            {index !== 0 && <Divider sx={{ mb: 0.5 }} />}  {/* ← margine sotto il divider */}
                            <Typography sx={{ ...sxCapFieldLabel, color: 'text.secondary' }}>{key}</Typography>
                            <Typography sx={sxFieldValue}>{val}</Typography>
                        </Box>
                    ))}
                </Box>

                {/* URL parameters */}
                <Box flex={1} display="flex" flexDirection="column" gap={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <UrlIcon style={{ color: '#BBC2D6', width: 24, height: 24 }} />
                        <Typography sx={{ ...sxCapFieldLabel, color: 'text.secondary' }}>
                            {t('credentials.additionalParams.urlParams')}
                        </Typography>
                    </Box>
                    {Object.entries(pathParams ?? {}).map(([key, val], index) => (
                        <Box key={key} display="flex" flexDirection="column" gap={0.5}>
                            {index !== 0 && <Divider sx={{ mb: 0.5 }} />}
                            <Typography sx={{ ...sxCapFieldLabel, color: 'text.secondary' }}>{key}</Typography>
                            <Typography sx={sxFieldValue}>{val}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Paper>
    );
};

export default AdditionalParamsSection;