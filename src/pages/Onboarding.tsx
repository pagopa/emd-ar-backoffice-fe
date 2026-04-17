/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useFormik } from 'formik';

import EndpointDeepLinkForm, { endpointDeepLinkSchema } from '../components/serviceConfig/EndpointDeepLinkForm';
import CredenzialiForm, { credenzialiSchema } from '../components/serviceConfig/CredenzialiForm';
import type { Step1Values, Step2Values } from '../types/stepsOnboarding';
import Layout from '../components/layoutPages/Layout';


const Onboarding = () => {

    type AllValues = Step1Values & Step2Values;
    const validationSchemas = [endpointDeepLinkSchema, credenzialiSchema]; // ← stessi indici degli step
    const STEPS = ['Endpoint e deep link', 'Credenziali'];

    // aggiorna initialValues
const initialValues: AllValues = {
    // Step 1 - Endpoint
    webhookUrl: '',
    authUrl: '',
    authType: 'OAuth2',
    deepLinkEnabled: false,
    deepLinkType: 'universale',
    deepLinkVersions: [{ so: 'ANDROID', urlRedirect: '', version: '' }],
    // Step 2 - Credenziali
    clientId: '',
    clientSecret: '',
    grantType: 'client_credentials',
};


    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === STEPS.length - 1;

    const formik = useFormik<AllValues>({
        initialValues,
        validationSchema: validationSchemas[activeStep],
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, { setSubmitting }) => {
            if (isLastStep) {
                console.log('Form submitted:', values);
                alert('Configurazione completata con successo!');
            } else {
                setActiveStep((prev) => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setSubmitting(false);
        },
    });

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        formik.setErrors({});
        void formik.setTouched({});
    };

    // aggiorna renderStep
    const renderStep = () => {
        switch (activeStep) {
            case 0: return <EndpointDeepLinkForm formik={formik as any} />;
            case 1: return <CredenzialiForm formik={formik as any} />;
            default: return null;
        }
    };

    return (
        <Layout>

            <Box component="main" flex={1} display="flex" justifyContent="center" px={2} py={4}>
                <Box width="100%" maxWidth={760}>

                    {/* Back link — ButtonNaked da @pagopa/mui-italia */}
                    <ButtonNaked
                        color="primary"
                        onClick={() => window.history.back()}
                        sx={{ mb: 2 }}
                        size="small"
                    >
                        ← Esci
                    </ButtonNaked>

                    <Typography variant="h4" fontWeight={700} mb={0.5}>
                        Configurazione del servizio
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        Inserisci i dati del tuo ente e i parametri tecnici per abilitare
                        l&apos;integrazione con PagoPA.
                    </Typography>
                    <Typography variant="caption" color="error" display="block" mb={3}>
                        * Campo obbligatorio
                    </Typography>

                    {/* Stepper MUI standard — stilizzato dal tema @pagopa/mui-italia */}
                    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                        {STEPS.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {/* Card */}
                    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, p: { xs: 2, sm: 4 } }}>
                        <Typography variant="h6" fontWeight={700} mb={3}>
                            {STEPS[activeStep]}
                        </Typography>

                        <form onSubmit={formik.handleSubmit} noValidate>
                            {renderStep()}

                            {/* Navigazione */}
                            <Box display="flex" justifyContent="space-between" mt={4}>
                                <Button
                                    variant="outlined"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                >
                                    Indietro
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={formik.isSubmitting}
                                >
                                    {isLastStep ? 'Completa configurazione' : 'Continua'}
                                </Button>
                            </Box>
                        </form>
                    </Paper>

                </Box>
            </Box>

        </Layout>
    );
};

export default Onboarding;