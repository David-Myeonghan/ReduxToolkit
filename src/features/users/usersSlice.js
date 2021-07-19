import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = [
    // { id: '0', name: 'David Ryu' },
    // { id: '1', name: 'Alice Widow' },
    // { id: '2', name: 'Bob John' },
];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users');
    return response.users;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            return action.payload;
        },
    },
});

export default usersSlice.reducer;
