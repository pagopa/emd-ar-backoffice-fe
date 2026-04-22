import { configureStore } from '@reduxjs/toolkit';
import { appStateReducer } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';
import organizationReducer from './slices/organizationSlice';
import { userReducer } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';

export const store = configureStore({
    reducer: {
        appState: appStateReducer,
        organization: organizationReducer,
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;