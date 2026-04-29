import { type StoredOrganization } from '../../types/organization';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type OrganizationState = {
    organization: StoredOrganization | null;
    tppId: string | null
};

const initialState: OrganizationState = {
    organization: null,
    tppId: null,
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
            localStorage.setItem('acs_tpp_id', action.payload);
        },
        clearOrganization(state) {
            state.organization = null;
        },
    },
});

export const { setOrganization, setTppId, clearOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;