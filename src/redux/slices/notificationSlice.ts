import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type NotificationState = {
    message: string | null;
    severity: 'error' | 'warning' | 'info' | 'success';
};

const initialState: NotificationState = { message: null, severity: 'error' };

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<{ message: string; severity: NotificationState['severity'] }>) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        clearNotification: (state) => {
            state.message = null;
        },
    },
});

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;