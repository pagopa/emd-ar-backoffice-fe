import { type StoredOrganization } from '../../types/organization';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type OrganizationState = {
    organization: StoredOrganization | null;
    tppRegistered: boolean | null;
    tppIdChecked: boolean;
    checkFailed: boolean;
};

const initialState: OrganizationState = {
    organization: null,
    tppRegistered: null,
    tppIdChecked: false,
    checkFailed: false,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganization(state, action: PayloadAction<StoredOrganization>) {
            state.organization = action.payload;
        },
        preloadTppRegistered(state, action: PayloadAction<boolean>) {
            state.tppRegistered = action.payload;
        },
        setTppRegistered(state, action: PayloadAction<boolean>) {
            state.tppRegistered = action.payload;
            state.tppIdChecked = true;
            state.checkFailed = false;
        },
        setTppIdCheckFailed: (state) => {
            state.tppIdChecked = true;
            state.tppRegistered = null;
            state.checkFailed = true;
        },
        clearOrganization(state) {
            state.organization = null;
        },
    },
});

export const {
    setOrganization,
    preloadTppRegistered,
    setTppRegistered,
    setTppIdCheckFailed,
    clearOrganization,
} = organizationSlice.actions;

export default organizationSlice.reducer;