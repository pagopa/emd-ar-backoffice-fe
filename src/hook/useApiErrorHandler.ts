import axios from 'axios';
import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hook';
import { addNotification } from '../redux/slices/notificationSlice';

const BUSINESS_ERRORS: Record<string | number, { message: string; severity: 'error' | 'warning' | 'info' }> = {
    409: { message: 'Il TPP esiste già nel sistema.', severity: 'warning' },
    404: { message: 'Risorsa non trovata.', severity: 'error' },
    422: { message: 'Dati non validi. Controlla i campi e riprova.', severity: 'warning' },
};

const FALLBACK = { message: 'Si è verificato un errore imprevisto. Riprova più tardi.', severity: 'error' as const };

export const useApiErrorHandler = () => {
    const dispatch = useAppDispatch();

    return useCallback((err: unknown) => {
        if (!axios.isAxiosError(err)) return;

        const status = err.response?.status;
        const backendCode = err.response?.data?.code as string | undefined;

        const notification = BUSINESS_ERRORS[backendCode ?? ''] ?? (status ? BUSINESS_ERRORS[status] : undefined) ?? FALLBACK;

        dispatch(addNotification(notification));
    }, [dispatch]);
};