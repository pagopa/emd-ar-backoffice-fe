import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type SessionError = 'UNAUTHORIZED' | 'FORBIDDEN' | 'SERVER_ERROR' | null;

type SessionState = {
    error: SessionError;
};

const initialState: SessionState = { error: null };

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionError: (state, action: PayloadAction<SessionError>) => {
            state.error = action.payload;
        },
        clearSessionError: (state) => {
            state.error = null;
        },
    },
});

export const selectSessionError = (state: RootState) => state.session.error;

export const { setSessionError, clearSessionError } = sessionSlice.actions;
export default sessionSlice.reducer;