/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { Box, Button, Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { getTppCredentials, saveCredentialsTpp } from '../../../api/tpp';
import CredentialsForm from '../../../components/forms/CredentialsForm';
import ROUTES from '../../../routes';
import type { Step2Values } from '../../../types/stepsOnboarding';
import { credentialsSchema } from '../../../utils/validations';
import type { TokenSection } from '../../../types/tpp';
import { paramsToRecord, recordToParams } from '../../../utils/params';
import { UnsavedChangesDialog } from '../../../components/UnsavedChangesDialog';
import { useUnsavedChangesBlocker } from '../../../hook/useUnsavedChangesBlocker';
import CredentialsFormSkeleton from '../components/CredentialsFormSkeleton';
import { useApiErrorHandler } from '../../../hook/useApiErrorHandler';

const buildTokenPayload = (values: Step2Values): TokenSection => ({
    contentType: 'application/x-www-form-urlencoded',
    bodyAdditionalProperties: {
        client_id: values.clientId,
        client_secret: values.clientSecret,
        grant_type: values.grantType,
        ...paramsToRecord(values.bodyParams),
    },
    pathAdditionalProperties: paramsToRecord(values.urlParams),
});

const parseTokenSection = (data: TokenSection): Step2Values => {
    const { bodyAdditionalProperties = {}, pathAdditionalProperties = {} } = data;
    const { client_id, client_secret, grant_type, ...extraBody } = bodyAdditionalProperties;
    return {
        clientId: client_id ?? '',
        clientSecret: client_secret ?? '',
        grantType: grant_type ?? 'client_credentials',
        bodyParams: recordToParams(extraBody),
        urlParams: recordToParams(pathAdditionalProperties),
    };
};

const CredentialsModify = () => {
    const navigate = useNavigate();
    const handleApiError = useApiErrorHandler();
    const [isLoading, setIsLoading] = useState(true);

    const initialValues: Step2Values = {
        clientId: '',
        clientSecret: '',
        grantType: 'client_credentials',
        bodyParams: [],
        urlParams: [],
    };

    const formik = useFormik<Step2Values>({
        initialValues,
        validationSchema: credentialsSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting }) => {
            await updateTPP(values);
            setSubmitting(false);
        },
    });


    const { showDialog, handleConfirmExit, handleCancelExit } = useUnsavedChangesBlocker(formik.dirty);

    useEffect(() => {
        void getTppCredentials().then((data) => {
            formik.resetForm({ values: parseTokenSection(data) });
            setIsLoading(false);
        });
    }, []);


    const updateTPP = async (values: Step2Values) => {
        try {
            await saveCredentialsTpp(buildTokenPayload(values));
            handleConfirmExit(ROUTES.CREDENTIALS);
        } catch (err) {
            handleApiError(err);
        }
    };

    return (
        <>
            <UnsavedChangesDialog
                open={showDialog}
                onConfirm={() => handleConfirmExit(ROUTES.CREDENTIALS)}
                onCancel={handleCancelExit}
            />
            <Box component="main" flex={1} display="flex" justifyContent="center" px={2} py={4}>
                <Box width="100%" maxWidth={760}>

                    <Typography variant="h4" fontWeight={700} mb={1.5}>
                        Modifica credenziali
                    </Typography>
                    <Typography variant="caption" color="error" display="block" mb={3}>
                        * Campo obbligatorio
                    </Typography>

                    {/* Card of modify of Credentials */}
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, p: { xs: 2 } }}>
                            <Typography variant="h6" fontWeight={700} mb={3}>
                                Credenziali
                            </Typography>

                            {isLoading ?
                                <CredentialsFormSkeleton />
                                :
                                <CredentialsForm formik={formik} />
                            }

                        </Paper>

                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Button variant="outlined" onClick={() => void navigate(ROUTES.CREDENTIALS)}>
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

export default CredentialsModify;