import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        user: '0',
        title: 'First Post!',
        content: 'Hello',
        date: '2011-10-05T14:48:00.000Z',
    },
    {
        id: '2',
        user: '1',
        title: 'Second Post!',
        content: 'Redux Legit',
        date: '2011-10-04T14:48:00.000Z',
    },
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
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title: title,
                        content: content,
                        user: userId,
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
