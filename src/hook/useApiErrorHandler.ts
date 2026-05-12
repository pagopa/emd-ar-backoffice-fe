import axios from 'axios';
import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hook';
import { appStateActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';

const BUSINESS_ERRORS: Record<string | number, { message: string }> = {
    409: { message: 'Il TPP esiste già nel sistema.' },
    404: { message: 'Risorsa non trovata.' },
    422: { message: 'Dati non validi. Controlla i campi e riprova.' },
    400: { message: 'Dati non validi. Controlla i campi e riprova.' },
};

const FALLBACK_MESSAGE = 'Si è verificato un errore imprevisto. Riprova più tardi.';

export const useApiErrorHandler = () => {
    const dispatch = useAppDispatch();

    return useCallback((err: unknown) => {
        if (!axios.isAxiosError(err)) return;

        const status = err.response?.status;

        if (!status || status >= 500) return;

        const found = BUSINESS_ERRORS[status];
        const message = found?.message ?? FALLBACK_MESSAGE;

        dispatch(appStateActions.addError({
            id: `API_ERROR_${status}`,
            error: err,
            techDescription: `HTTP ${status}`,
            blocking: false,
            toNotify: true,
            component: 'Toast',
            displayableDescription: message,
        }));
    }, [dispatch]);
};