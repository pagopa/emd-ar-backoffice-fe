/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
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
import ErrorContent from '../../../components/ErrorContent';
import { useSafeFetch } from '../../../hook/useSafeFetch';
import { useAppSelector } from '../../../redux/hook';
import { selectSessionError } from '../../../redux/slices/sessionSlice';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

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

    const { data, loading, fetchError } = useSafeFetch(() => getTppCredentials());
    const sessionError = useAppSelector(selectSessionError);

    useEffect(() => {
        if (data) formik.resetForm({ values: parseTokenSection(data) });
    }, [data]);

    if (sessionError) return null;
    if (fetchError) return <ErrorContent />;

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
                        {t('credentialsModify.title')}
                    </Typography>
                    <Typography variant="caption" color="error" display="block" mb={3}>
                        {t('commonLabel.requiredField')}
                    </Typography>

                    {/* Card of modify of Credentials */}
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, p: { xs: 2 } }}>
                            <Typography variant="h6" fontWeight={700} mb={3}>
                                {t('credentialsModify.cardTitle')}
                            </Typography>

                            {loading ?
                                <CredentialsFormSkeleton />
                                :
                                <CredentialsForm formik={formik} />
                            }

                        </Paper>

                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Button variant="outlined" onClick={() => void navigate(ROUTES.CREDENTIALS)}>
                                {t('commonLabel.cancel')}
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                                endIcon={formik.isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
                            >
                                {t('commonLabel.save')}
                            </Button>
                        </Box>
                    </form >

                </Box >
            </Box >
        </>
    );
};

export default CredentialsModify;