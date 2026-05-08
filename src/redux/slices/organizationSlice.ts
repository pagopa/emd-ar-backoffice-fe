import { type StoredOrganization } from '../../types/organization';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type OrganizationState = {
    organization: StoredOrganization | null;
    tppId: string | null;
    tppIdChecked: boolean;
};

const initialState: OrganizationState = {
    organization: null,
    tppId: null,
    tppIdChecked: false,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganization(state, action: PayloadAction<StoredOrganization>) {
            state.organization = action.payload;
        },
        setTppId(state, action: PayloadAction<string>) {
            state.tppId = action.payload;
            state.tppIdChecked = true;
            localStorage.setItem('acs_tpp_id', action.payload);
        },
        setTppIdNotFound(state) {
            state.tppId = null;
            state.tppIdChecked = true;
        },
        clearOrganization(state) {
            state.organization = null;
        },
    },
});

export const { setOrganization, setTppId, setTppIdNotFound, clearOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;