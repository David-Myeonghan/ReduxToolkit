import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello' },
    { id: '2', title: 'Second Post!', content: 'Redux Legit' },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            // prepare callback: decide what values go into the action obj.
            // shold return an obj with the payload field inside.
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        content: content,
                    },
                };
            },
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.find((post) => post.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
});

export const { postAdded, postUpdated } = postsSlice.actions; //exporting 'action creator function'

export default postsSlice.reducer;
