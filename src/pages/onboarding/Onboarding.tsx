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
import { setTppId } from '../../redux/slices/organizationSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { ColoredConnector } from '../../theme/stepper';


const Onboarding = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const organization = useAppSelector((state) => state.organization.organization);

    type AllValues = Step1Values & Step2Values;
    const validationSchemas = [endpointDeepLinkSchema, credentialsSchema];
    const STEPS = ['Endpoint e deep link', 'Credenziali'];

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
        bodyParams: [],
        urlParams: []
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
                await saveTPP(values)
            } else {
                setActiveStep((prev) => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setSubmitting(false);
        },
    });


    const saveTPP = async (values: AllValues) => {
        const bodyExtra = Object.fromEntries(values.bodyParams.map(p => [p.name, p.value]));
        const urlExtra = Object.fromEntries(values.urlParams.map(p => [p.name, p.value]));

        const payload: TppDTO = {
            entityId: organization?.fiscal_code ?? '',
            businessName: organization?.name ?? '',
            messageUrl: values.webhookUrl,
            authenticationUrl: values.authUrl,
            tokenSection: {
                contentType: 'application/x-www-form-urlencoded',
                bodyAdditionalProperties: {
                    client_id: values.clientId,
                    client_secret: values.clientSecret,
                    grant_type: values.grantType,
                    ...bodyExtra,
                },
                pathAdditionalProperties: urlExtra,
            },
            authenticationType: values.authType as AuthenticationType,
            agentLinks: buildAgentLinks(values),
        };

        const { tppId } = await saveTpp(payload);
        dispatch(setTppId(tppId));

        if (CONFIG.ENV === "DEV") {
            console.log('[Onboarding] Form values:', JSON.parse(JSON.stringify(values)));
            console.log('[Onboarding] Payload BE:', JSON.parse(JSON.stringify(payload)));
        }

        void navigate(ROUTES.HOME);
    }

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        formik.setErrors({});
        void formik.setTouched({});
    };

    // update renderStep
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

                    <Typography variant="h4" fontWeight={700} mb={1.5}>
                        Configurazione del servizio
                    </Typography>
                    <Typography variant="caption" color="error" display="block" mb={3}>
                        * Campo obbligatorio
                    </Typography>

                    {/* Stepper MUI standard */}
                    <Stepper
                        activeStep={activeStep}
                        connector={<ColoredConnector />}
                        sx={{ mb: 3, width: '100%', alignItems: 'center' }}
                    >
                        {STEPS.map((label, index) => (
                            <Step key={label} sx={{ p: 0, flex: 0, paddingInline:1 }}>
                                <StepLabel
                                    sx={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        '& .MuiStepLabel-label': {
                                            textAlign: index === 0 ? 'left' : 'right',
                                            mt: 0,
                                            whiteSpace: 'nowrap',  // ← aggiunto
                                        },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <form onSubmit={formik.handleSubmit} noValidate>
                        {/* Card */}
                        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, p: { xs: 2 } }}>
                            <Typography variant="h6" fontWeight={700} mb={3}>
                                {STEPS[activeStep]}
                            </Typography>

                            {renderStep()}
                        </Paper>

                        {/* Navigazione */}
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            {
                                activeStep === 1 ?
                                    <Button
                                        variant="outlined"
                                        onClick={handleBack}
                                        sx={{ gap: '8px' }}
                                    >
                                        <Back style={{ width: 24, height: 24 }} />
                                        Indietro
                                    </Button>
                                    :
                                    <Box />
                            }
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                            >
                                {isLastStep ? 'Completa configurazione' : 'Continua'}
                            </Button>
                        </Box>
                    </form>

                </Box>
            </Box>

        </Layout>
    );
};

export default Onboarding;