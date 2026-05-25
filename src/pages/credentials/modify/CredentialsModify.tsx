import { useEffect } from 'react';

import { useFormik } from 'formik';

import { getTppCredentials, saveCredentialsTpp } from '../../../api/tpp';
import CredentialsForm from '../../../components/forms/CredentialsForm';
import ROUTES from '../../../routes';
import type { Step2Values } from '../../../types/stepsOnboarding';
import { credentialsSchema } from '../../../utils/validations';
import type { TokenSection } from '../../../types/tpp';
import { paramsToRecord, recordToParams } from '../../../utils/params';
import { useUnsavedChangesBlocker } from '../../../hook/useUnsavedChangesBlocker';
import CredentialsFormSkeleton from '../components/CredentialsFormSkeleton';
import { useApiErrorHandler } from '../../../hook/useApiErrorHandler';
import ErrorContent from '../../../components/ErrorContent';
import { useSafeFetch } from '../../../hook/useSafeFetch';
import { useAppSelector } from '../../../redux/hook';
import { selectSessionError } from '../../../redux/slices/sessionSlice';
import ModifyPageLayout from '../../../components/ModifyPageLayout';

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
    const handleApiError = useApiErrorHandler();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ModifyPageLayout
            formik={formik}
            titleKey="credentialsModify.title"
            cardTitleKey="credentialsModify.cardTitle"
            cancelRoute={ROUTES.CREDENTIALS}
            showDialog={showDialog}
            onConfirmExit={() => handleConfirmExit(ROUTES.CREDENTIALS)}
            onCancelExit={handleCancelExit}
            loading={loading}
            skeleton={<CredentialsFormSkeleton />}
        >
            <CredentialsForm formik={formik} />
        </ModifyPageLayout>
    );
};

export default CredentialsModify;