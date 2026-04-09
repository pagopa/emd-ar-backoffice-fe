import { useState } from 'react';
import type { FormikProps } from 'formik';
import {
    Alert,
    Box,
    Button,
    Grid,
    InputAdornment,
    TextField,
} from '@mui/material';
import * as Yup from 'yup';
import type { Step3Values } from '../types/stepsOnboarding';
import { SectionHeader } from '../components/SectionHeader';


export const step3Schema = Yup.object({
    clientId: Yup.string().required('Campo obbligatorio'),
    clientSecret: Yup.string().min(8, 'Minimo 8 caratteri').required('Campo obbligatorio'),
});

interface Props {
    formik: FormikProps<Step3Values>;
}


const Step3Credenziali = ({ formik }: Props) => {
    const { values, errors, touched, handleChange, handleBlur } = formik;
    const [showSecret, setShowSecret] = useState(false);

    return (
        <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
                Le credenziali sono crittografate e conservate in modo sicuro. Non
                condividere mai questi dati con terze parti.
            </Alert>

            {/* ── OAuth ── */}
            <SectionHeader
                title="Credenziali OAuth"
                subtitle="Client ID e Secret per l'autenticazione verso i servizi PagoPA."
            />

            <Grid container spacing={2} mt={1} mb={4}>
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
                                    <Button
                                        aria-label="Mostra/nascondi client secret"
                                        onClick={() => setShowSecret((p) => !p)}
                                    >
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Step3Credenziali;