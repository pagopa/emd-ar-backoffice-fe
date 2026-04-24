// redux/slices/sessionSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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

export const { setSessionError, clearSessionError } = sessionSlice.actions;
export default sessionSlice.reducer;