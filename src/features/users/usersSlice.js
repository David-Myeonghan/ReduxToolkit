import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: '0', name: 'David Ryu' },
    { id: '1', name: 'Alice Widow' },
    { id: '2', name: 'Bob John' },
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
});

export default usersSlice.reducer;
