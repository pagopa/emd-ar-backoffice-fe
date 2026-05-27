import axios from 'axios';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../redux/hook';
import { appStateActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';

export const useApiErrorHandler = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const BUSINESS_ERROR_KEYS: Record<number, string> = {
        409: 'error.api.conflict',
        404: 'error.api.notFound',
        422: 'error.api.unprocessable',
        400: 'error.api.badRequest',
    };

    return useCallback((err: unknown) => {
        if (!axios.isAxiosError(err)) return;

        const status = err.response?.status;
        if (!status || status >= 500) return;

        const key = status ? BUSINESS_ERROR_KEYS[status] : undefined;

        dispatch(appStateActions.addError({
            id: `API_ERROR_${status}`,
            error: err,
            techDescription: key ?? 'error.api.unexpected',
            blocking: false,
            toNotify: true,
            component: 'Toast',
            displayableDescription: key ? t(key) : t('error.api.unexpected'),
        }));
    }, [dispatch, t]);
};