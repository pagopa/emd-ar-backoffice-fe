import { configureStore } from '@reduxjs/toolkit';
import { appStateReducer } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';

export const store = configureStore({
    reducer: {
        appState: appStateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;