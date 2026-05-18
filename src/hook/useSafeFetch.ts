import { useState, useEffect } from 'react';
import { store } from '../redux/store';
import { selectSessionError } from '../redux/slices/sessionSlice';

export const useSafeFetch = <T>(fetcher: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        fetcher()
            .then((result) => setData(result))
            .catch(() => {
                if (!selectSessionError(store.getState())) setFetchError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, fetchError };
};