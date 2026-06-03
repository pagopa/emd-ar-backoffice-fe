import { useMemo, useRef, useState } from 'react';

import { ArrowBack as Back } from '@mui/icons-material';
import { Box, Button, CircularProgress, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { saveTpp } from '../../api/tpp';
import CredentialsForm from '../../components/forms/CredentialsForm';
import EndpointForm from '../../components/forms/EndpointForm';
import { CONFIG } from '../../config';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setTppRegistered } from '../../redux/slices/organizationSlice';
import ROUTES from '../../routes';
import { ColoredConnector } from '../../theme/stepper';
import type { Step1Values, Step2Values } from '../../types/stepsOnboarding';
import type { AuthenticationType, TppDTO } from '../../types/tpp';
import { buildAgentLinks } from '../../utils/deepLink';
import { useApiErrorHandler } from '../../hook/useApiErrorHandler';
import { useValidationSchemas, type SchemaKey } from '../../hook/useValidationSchemas';
import { useTranslation } from 'react-i18next';
import { useRevalidateOnLanguageChange } from '../../hook/useRevalidateOnLanguageChange';


const Onboarding = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const handleApiError = useApiErrorHandler();
    const { t } = useTranslation();

    const organization = useAppSelector((state) => state.organization.organization);

    type AllValues = Step1Values & Step2Values;

    const { getDynamicSchema } = useValidationSchemas();

    const STEPS = t('onboarding.page.steps', { returnObjects: true }) as string[];

    const initialValues: AllValues = {
        webhookUrl: '',
        authUrl: '',
        authType: 'OAUTH2',
        deepLinkType: 'universale',
        deepLinkUniversale: { fallBackLink: '', versions: [] },
        deepLinkDevices: [
            { so: 'ANDROID', fallBackLink: '', versions: [] },
            { so: 'IOS', fallBackLink: '', versions: [] },
            { so: 'WEB', fallBackLink: '', versions: [] },
        ],
        clientId: '',
        clientSecret: '',
        grantType: 'client_credentials',
        bodyParams: [],
        urlParams: []
    };

    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === STEPS.length - 1;

    const schemaKeyRef = useRef<SchemaKey>('endpointSchema');
    schemaKeyRef.current = activeStep === 0 ? 'endpointSchema' : 'credentialsSchema';

    const dynamicSchema = useMemo(
        () => getDynamicSchema(schemaKeyRef),
        [getDynamicSchema]
    );


    const formik = useFormik<AllValues>({
        initialValues,
        validationSchema: dynamicSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (isLastStep) {
                    await saveTPP(values)
                } else {
                    setActiveStep((prev) => prev + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } catch (err) {
                handleApiError(err);
            } finally {
                setSubmitting(false);
            }
        },
    });

    useRevalidateOnLanguageChange(formik);

    const saveTPP = async (values: AllValues) => {
        const bodyExtra = Object.fromEntries(values.bodyParams.map(p => [p.name, p.value]));
        const urlExtra = Object.fromEntries(values.urlParams.map(p => [p.name, p.value]));

        const payload: TppDTO = {
            entityId: organization?.fiscalCode ?? '',
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
                ...(Object.keys(urlExtra).length > 0 && {
                    pathAdditionalProperties: urlExtra,
                }),
            },
            pspDenomination: organization?.name ?? '',
            authenticationType: values.authType as AuthenticationType,
            agentLinks: buildAgentLinks(values),
        };

        if (CONFIG.ENV === "DEV") {
            console.log('[Onboarding] Form values:', JSON.parse(JSON.stringify(values)));
        }

        const { tppId } = await saveTpp(payload);


        if (tppId) {
            localStorage.setItem('tpp_registered', 'true');
            dispatch(setTppRegistered(true));
            void navigate(ROUTES.HOME);
        }
    }

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        formik.setErrors({});
        void formik.setTouched({});
    };

    // update renderStep
    const renderStep = () => {
        switch (activeStep) {
            case 0: return <EndpointForm formik={formik as any} />;
            case 1: return <CredentialsForm formik={formik as any} />;
            default: return null;
        }
    };

    return (
        <Box component="main" flex={1} display="flex" justifyContent="center" px={2} py={4}>
            <Box width="100%" maxWidth={760}>

                <Typography variant="h4" fontWeight={700} mb={1.5}>
                    {t('onboarding.page.title')}
                </Typography>
                <Typography variant="caption" color="error" display="block" mb={3}>
                    {t('commonLabel.requiredField')}
                </Typography>

                {/* Stepper MUI standard */}
                <Stepper
                    activeStep={activeStep}
                    connector={<ColoredConnector />}
                    sx={{ mb: 3, width: '100%', alignItems: 'center' }}
                >
                    {STEPS.map((label, index) => (
                        <Step key={label} sx={{ p: 0, flex: 0, paddingInline: 1 }}>
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
                                    {t('commonLabel.back')}
                                </Button>
                                :
                                <Box />
                        }
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={formik.isSubmitting}
                            endIcon={formik.isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
                        >
                            {isLastStep ? t('onboarding.page.complete') : t('onboarding.page.continue')}
                        </Button>
                    </Box>
                </form>

            </Box>
        </Box>
    );
};

export default Onboarding;