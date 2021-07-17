import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello' },
    { id: '2', title: 'Second Post!', content: 'Redux Legit' },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {
        postAdded(state, action) {
            state.push(action.payload);
        },
    },
});

export const { postAdded } = postsSlice.actions; //exporting 'action creator function'

export default postsSlice.reducer;
