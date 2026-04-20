import { useState } from 'react';
import type { FormikProps } from 'formik';
import {
    Box, Grid, IconButton, InputAdornment,
    MenuItem, TextField, Typography,
} from '@mui/material';
import {
    VpnKeyOutlined as CredentialIcon,
    VisibilityOutlined as EyeOn,
    VisibilityOffOutlined as EyeOff,
} from '@mui/icons-material';
import * as Yup from 'yup';
import type { Step2Values } from '../../types/stepsOnboarding';

export const credenzialiSchema = Yup.object({
    clientId: Yup.string().required('Campo obbligatorio'),
    clientSecret: Yup.string().min(8, 'Minimo 8 caratteri').required('Campo obbligatorio'),
    grantType: Yup.string().required('Campo obbligatorio'),
});

interface Props {
    formik: FormikProps<Step2Values>;
}

export default function CredentialsForm({ formik }: Props) {
    const { values, errors, touched, handleChange, handleBlur } = formik;
    const [showSecret, setShowSecret] = useState(false);

    return (
        <Box>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <CredentialIcon />
                <Typography variant="subtitle1" fontWeight={600}>
                    Credenziali di accesso
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Credenziali necessarie per comunicare coi vostri sistemi in modo sicuro.
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="clientId"
                        name="clientId"
                        label="Client ID"
                        required
                        value={values.clientId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.clientId && Boolean(errors.clientId)}
                        helperText={touched.clientId && errors.clientId}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="clientSecret"
                        name="clientSecret"
                        label="Client Secret"
                        required
                        type={showSecret ? 'text' : 'password'}
                        value={values.clientSecret}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.clientSecret && Boolean(errors.clientSecret)}
                        helperText={touched.clientSecret && errors.clientSecret}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showSecret ? 'Nascondi secret' : 'Mostra secret'}
                                        onClick={() => setShowSecret((p) => !p)}
                                        edge="end"
                                    >
                                        {showSecret ? <EyeOff /> : <EyeOn />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        fullWidth
                        select
                        id="grantType"
                        name="grantType"
                        label="Grant type"
                        value={values.grantType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={true}
                    >
                        <MenuItem value="client_credentials">client_credentials</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    );
}