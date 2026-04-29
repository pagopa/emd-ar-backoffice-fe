/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { Box, Button, Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { getTpp, saveCredentialsTpp } from '../../../api/tpp';
import CredentialsForm from '../../../components/CredentialsForm';
import Layout from '../../../components/layoutPages/Layout';
import { useAppDispatch } from '../../../redux/hook';
import { setTppId } from '../../../redux/slices/organizationSlice';
import ROUTES from '../../../routes';
import type { Step2Values } from '../../../types/stepsOnboarding';
import { credentialsSchema } from '../../../utils/validations';
import type { TokenSection } from '../../../types/tpp';
import { paramsToRecord, recordToParams } from '../../../utils/params';
import { UnsavedChangesDialog } from '../../../components/UnsavedChangesDialog';
import { useUnsavedChangesBlocker } from '../../../hook/useUnsavedChangesBlocker';
import CredentialsFormSkeleton from '../components/CredentialsFormSkeleton';


const CredentialsModify = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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

    // Load from with data that already exist
    useEffect(() => {
        void getTpp().then((data) => {
            const { bodyParams, pathParams } = data.additionalParams;
            formik.resetForm({
                values: {
                    clientId: data.tppCredentials.clientId ?? '',
                    clientSecret: data.tppCredentials.clientSecret ?? '',
                    grantType: 'client_credentials',
                    bodyParams: recordToParams(bodyParams),
                    urlParams: recordToParams(pathParams),
                }
            });
            setIsLoading(false);
        });
    }, []);


    // Call for saving the update of data of the form
    const updateTPP = async (values: Step2Values) => {
        const payload: TokenSection = {
            contentType: 'application/x-www-form-urlencoded',
            bodyAdditionalProperties: {
                client_id: values.clientId,
                client_secret: values.clientSecret,
                grant_type: values.grantType,
                ...paramsToRecord(values.bodyParams),
            },
            pathAdditionalProperties: paramsToRecord(values.urlParams),
        };
        const { tppId } = await saveCredentialsTpp(payload);
        dispatch(setTppId(tppId));
        handleConfirmExit(ROUTES.CREDENTIALS)
    };

    return (
        <Layout>
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
        </Layout >
    );
};

export default CredentialsModify;