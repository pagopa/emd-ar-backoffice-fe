import { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/hook';
import { selectSessionError } from '../redux/slices/sessionSlice';

export const useSafeFetch = <T>(fetcher: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    const sessionError = useAppSelector(selectSessionError);

    useEffect(() => {
        let cancelled = false;

        fetcher()
            .then((result) => {
                if (!cancelled) setData(result);
            })
            .catch(() => {
                if (!cancelled) setFetchError(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, []);

    if (sessionError) {
        return { data: null, loading: false, fetchError: false };
    }

    return { data, loading, fetchError };
};