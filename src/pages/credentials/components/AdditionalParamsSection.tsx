import { Box, Divider, Paper, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import {
    CodeOutlined as UrlIcon,
    EditOutlined as ModifyIcon
} from '@mui/icons-material';


interface AdditionalParamsSectionProps {
    bodyParams?: Record<string, string>;
    pathParams?: Record<string, string>;
    onModify: () => void;
}


const AdditionalParamsSection = ({ bodyParams, pathParams, onModify }: AdditionalParamsSectionProps) => {

    return (
        <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                gap={0.5}
                sx={{ cursor: 'pointer', color: 'primary.main' }}
            >
                <Typography variant="h6">Parametri aggiuntivi </Typography>
                <ButtonNaked onClick={() => { onModify() }} color="primary" style={{ display: "flex", gap: 8 }}>
                    <ModifyIcon fontSize="small" />
                    <Typography variant="label">Modifica</Typography>
                </ButtonNaked>
            </Box>

            <Box display="flex" gap={3}>
                {/* PARAMETRI BODY */}
                <Box flex={1} display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <img src="/icons/integration_instructions.svg" alt="" aria-hidden="true" style={{ width: 24, height: 24 }} />
                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                            PARAMETRI BODY
                        </Typography>
                    </Box>
                    {/* VALORI PARAMETRI BODY */}
                    {Object.entries(bodyParams ?? {}).map(([key, val], index) => (
                        <Box key={key}>
                            {index !== 0 && <Divider orientation="horizontal" />}
                            <Typography variant="caption" color="text.secondary">{key}</Typography>
                            <Typography variant="body2" fontWeight={500}>{val}</Typography>
                        </Box>
                    ))}
                </Box>

                {/* PARAMETRI URL */}
                <Box flex={1} display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <UrlIcon style={{ color: "#BBC2D6" }} />
                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                            PARAMETRI URL
                        </Typography>
                    </Box>
                    {/* VALORI PARAMETRI URL */}
                    {Object.entries(pathParams ?? {}).map(([key, val]) => (
                        <Box key={key}>
                            <Typography variant="caption" color="text.secondary">{key}</Typography>
                            <Typography variant="body2" fontWeight={500}>{val}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Paper>
    );
}

export default AdditionalParamsSection;