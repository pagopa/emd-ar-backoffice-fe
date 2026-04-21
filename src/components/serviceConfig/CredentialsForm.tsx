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
import type { Step2Values } from '../../types/stepsOnboarding';

interface Props {
    formik: FormikProps<Step2Values>;
}

export default function CredentialsForm({ formik }: Props) {
    const { values, errors, touched, handleChange, handleBlur } = formik;
    const [isSecretVisible, setIsSecretVisible] = useState(false);

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
                        type={isSecretVisible ? 'text' : 'password'}
                        value={values.clientSecret}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.clientSecret && Boolean(errors.clientSecret)}
                        helperText={touched.clientSecret && errors.clientSecret}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={isSecretVisible ? 'Nascondi secret' : 'Mostra secret'}
                                        onClick={() => setIsSecretVisible((prev) => !prev)}
                                        edge="end"
                                    >
                                        {isSecretVisible ? <EyeOff /> : <EyeOn />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        select
                        id="grantType"
                        name="grantType"
                        label="Grant type"
                        value={values.grantType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    >
                        <MenuItem value="client_credentials">client_credentials</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    );
}