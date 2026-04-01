import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type StoredUser } from '../../types/user';

type UserState = {
    user: StoredUser | null;
};

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<StoredUser>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;