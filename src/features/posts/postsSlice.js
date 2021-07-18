import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
    {
        id: '1',
        user: '0',
        title: 'First Post!',
        content: 'Hello',
        date: sub(new Date(), { minute: 10 }).toISOString(),
    },
    {
        id: '2',
        user: '1',
        title: 'Second Post!',
        content: 'Redux Legit',
        date: sub(new Date(), { minute: 5 }).toISOString(),
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
