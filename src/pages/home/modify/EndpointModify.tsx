import { useEffect } from 'react';

import { useFormik } from 'formik';

import { getTppProfile, saveEndpointTpp } from '../../../api/tpp';
import ROUTES from '../../../routes';
import type { Step1Values } from '../../../types/stepsOnboarding';
import { endpointSchema } from '../../../utils/validations';
import { useUnsavedChangesBlocker } from '../../../hook/useUnsavedChangesBlocker';
import EndpointForm from '../../../components/forms/EndpointForm';
import { parseAgentLinks } from '../../../utils/deepLink';
import EndpointFormSkeleton from '../components/EndpointFormSkeleton';
import ErrorContent from '../../../components/ErrorContent';
import { useSafeFetch } from '../../../hook/useSafeFetch';
import { buildPatchPayload } from '../../../utils/forms';
import { useAppSelector } from '../../../redux/hook';
import { selectSessionError } from '../../../redux/slices/sessionSlice';
import ModifyPageLayout from '../../../components/ModifyPageLayout';


const EndpointModify = () => {

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


    const { data, loading, fetchError } = useSafeFetch(() => getTppProfile());

    const sessionError = useAppSelector(selectSessionError);

    useEffect(() => {
        if (data) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (sessionError) return null;
    if (fetchError) return <ErrorContent />;

    // Call for saving the update of data of the form
    const updateTPP = async (values: Step1Values) => {
        if (!data) return;

        const patch = buildPatchPayload(data, values);

        if (Object.keys(patch).length === 0) {
            handleConfirmExit(ROUTES.HOME);
            return;
        }

        await saveEndpointTpp(patch);
        handleConfirmExit(ROUTES.HOME);
    };

    return (
        <ModifyPageLayout
            formik={formik}
            titleKey="endpointModify.title"
            cardTitleKey="endpointModify.cardTitle"
            cancelRoute={ROUTES.HOME}
            showDialog={showDialog}
            onConfirmExit={() => handleConfirmExit(ROUTES.HOME)}
            onCancelExit={handleCancelExit}
            loading={loading}
            skeleton={<EndpointFormSkeleton />}
        >
            <EndpointForm formik={formik} />
        </ModifyPageLayout>
    );
};

export default EndpointModify;