/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { Box, Button, Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { getTppProfile, saveEndpointTpp } from '../../../api/tpp';
import ROUTES from '../../../routes';
import type { Step1Values } from '../../../types/stepsOnboarding';
import { endpointSchema } from '../../../utils/validations';
import type { EndpointLinkPageDto } from '../../../types/tpp';
import { UnsavedChangesDialog } from '../../../components/UnsavedChangesDialog';
import { useUnsavedChangesBlocker } from '../../../hook/useUnsavedChangesBlocker';
import EndpointForm from '../../../components/forms/EndpointForm';
import { buildAgentLinks, parseAgentLinks } from '../../../utils/deepLink';
import EndpointFormSkeleton from '../components/EndpointFormSkeleton';
import ErrorContent from '../../../components/ErrorContent';


const EndpointModify = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    const initialValues: Step1Values = {
        webhookUrl: '',
        authUrl: '',
        authType: '',
        deepLinkType: 'universale',
        deepLinkUniversale: {
            fallBackLink: "",
            versions: []
        },
        deepLinkDevices: []
    };

    const formik = useFormik<Step1Values>({
        initialValues,
        validationSchema: endpointSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await updateTPP(values);
            } finally {
                setSubmitting(false);
            }
        },
    });


    const { showDialog, handleConfirmExit, handleCancelExit } = useUnsavedChangesBlocker(formik.dirty);


    useEffect(() => {
        void getTppProfile()
            .then((data) => {
                if (data === null) {
                    void navigate(ROUTES.HOME);
                } else {
                    const deepLinkValues = parseAgentLinks(data.agentLinks ?? {});

                    formik.resetForm({
                        values: {
                            webhookUrl: data.messageUrl,
                            authUrl: data.authenticationUrl,
                            authType: data.authenticationType,
                            ...deepLinkValues,
                        },
                    });
                }
            })
            .catch(() => setFetchError(true))
            .finally(() => setIsLoading(false));
    }, []);

    if (fetchError) return <ErrorContent />;

    // Call for saving the update of data of the form
    const updateTPP = async (values: Step1Values) => {
        const payload: EndpointLinkPageDto = {
            messageUrl: values.webhookUrl,
            authenticationUrl: values.authUrl,
            authenticationType: "OAUTH2",
            agentLinks: buildAgentLinks(values),
        };
        await saveEndpointTpp(payload);
        handleConfirmExit(ROUTES.HOME)
    };

    return (
        <>
            <UnsavedChangesDialog
                open={showDialog}
                onConfirm={() => handleConfirmExit(ROUTES.HOME)}
                onCancel={handleCancelExit}
            />
            <Box component="main" flex={1} display="flex" justifyContent="center" px={2} py={4}>
                <Box width="100%" maxWidth={760}>

                    <Typography variant="h4" fontWeight={700} mb={1.5}>
                        Modifica endpoint e deep link
                    </Typography>
                    <Typography variant="caption" color="error" display="block" mb={3}>
                        * Campo obbligatorio
                    </Typography>

                    {/* Card of modify of Credentials */}
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, p: { xs: 2 } }}>
                            <Typography variant="h6" fontWeight={700} mb={3}>
                                Endpoint e deep link
                            </Typography>

                            {isLoading ?
                                <EndpointFormSkeleton />
                                :
                                <EndpointForm formik={formik} />
                            }

                        </Paper>

                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Button variant="outlined" onClick={() => void navigate(ROUTES.HOME)}>
                                Annulla
                            </Button>
                            <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
                                Salva
                            </Button>
                        </Box>
                    </form >

                </Box >
            </Box >
        </>
    );
};

export default EndpointModify;