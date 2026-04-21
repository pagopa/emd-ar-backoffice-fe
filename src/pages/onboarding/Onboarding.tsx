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
import {
    ArrowBack as Back
} from '@mui/icons-material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useFormik } from 'formik';

import EndpointDeepLinkForm from '../../components/serviceConfig/EndpointDeepLinkForm';
import CredentialsForm from '../../components/serviceConfig/CredentialsForm';
import type { Step1Values, Step2Values } from '../../types/stepsOnboarding';
import Layout from '../../components/layoutPages/Layout';
import { saveTpp } from '../../api/tpp';
import { buildAgentLinks } from '../../utils/deepLink';
import type { AuthenticationType, TppDTO } from '../../types/tpp';
import ROUTES from '../../routes';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../../config';
import { credentialsSchema, endpointDeepLinkSchema } from '../../utils/validations';


const Onboarding = () => {
    const navigate = useNavigate()

    type AllValues = Step1Values & Step2Values;
    const validationSchemas = [endpointDeepLinkSchema, credentialsSchema];
    const STEPS = ['Endpoint e deep link', 'Credenziali'];

    // aggiorna initialValues
    const initialValues: AllValues = {
        webhookUrl: '',
        authUrl: '',
        authType: 'OAuth2',
        deepLinkType: 'universale',
        deepLinkUniversale: { fallBackLink: '', versions: [] },
        deepLinkDevices: [
            { so: 'iOS', fallBackLink: '', versions: [] },
            { so: 'Android', fallBackLink: '', versions: [] },
            { so: 'Web', fallBackLink: '', versions: [] },
        ],
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
        onSubmit: async (values, { setSubmitting }) => {
            if (isLastStep) {
                const payload: TppDTO = {
                    messageUrl: values.webhookUrl,
                    authenticationUrl: values.authUrl,
                    tokenSection: {
                        contentType: 'application/x-www-form-urlencoded',
                        bodyAdditionalProperties: {
                            client_id: values.clientId,
                            client_secret: values.clientSecret,
                            grant_type: values.grantType,
                        },
                        //TODO pathAdditionalProperties come inserirlo
                    },
                    authenticationType: values.authType as AuthenticationType,
                    agentLinks: buildAgentLinks(values),
                };
                await saveTpp(payload);

                if (CONFIG.ENV === "DEV") {
                    console.log('[Onboarding] Form values:', JSON.parse(JSON.stringify(values)));
                    console.log('[Onboarding] Payload BE:', JSON.parse(JSON.stringify(payload)));
                }

                void navigate(ROUTES.HOME);
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
            case 1: return <CredentialsForm formik={formik as any} />;
            default: return null;
        }
    };

    return (
        <Layout>

            <Box component="main" flex={1} display="flex" justifyContent="center" px={2} py={4}>
                <Box width="100%" maxWidth={760}>

                    <ButtonNaked
                        onClick={() => window.history.back()}
                        sx={{ mb: 2, gap: '4px' }}
                        size="small"
                    >
                        <Back style={{ width: 24, height: 24 }} />

                        <Typography variant="body2" fontWeight={500} >
                            Esci
                        </Typography>
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

                    {/* Stepper MUI standard */}
                    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                        {STEPS.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {/* Card */}
                    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, p: { xs: 2, sm: 3 } }}>
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
                                    sx={{ gap: '8px' }}
                                >
                                    <Back style={{ width: 24, height: 24 }} />
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