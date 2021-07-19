import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { sub } from 'date-fns';

// const initialState = [
//     {
//         id: '1',
//         user: '0',
//         title: 'First Post!',
//         content: 'Hello',
//         date: sub(new Date(), { minute: 10 }).toISOString(),
//         reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0, },
//     },
//     {
//         id: '2',
//         user: '1',
//         title: 'Second Post!',
//         content: 'Redux Legit',
//         date: sub(new Date(), { minute: 5 }).toISOString(),
//         reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0, },
//     },
// ];

//async logic
// {
//     status: 'idle' | 'loading' | 'succeeded' | 'failed',
//     error: string | null
// }
const initialState = {
    posts: [], // could be 'data' or 'items' => 'state.posts.data' in this case// type array
    status: 'idle',
    error: null,
};

//args:
// string used as the prefix for the generated action types
// 'payload createor' callback function // using async/await in try/catch
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts'); // as response will {posts: []}
    return response.posts;
});

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // receives {title, content, user} obj.
    async (initialPost) => {
        // send the initial data to the server
        const response = await client.post('/fakeApi/posts', {
            post: initialPost,
        });
        return response.post;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
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
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        },
                    },
                };
            },
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.posts.find((post) => post.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);

            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    // for a reducer needs to respond to other actions that weren't defined as part of this slice's reducers field
    extraReducers: {
        // loading reducers
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload);
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        //
        [addNewPost.fulfilled]: (state, action) => {
            // directly add the new post obj to our posts array
            state.posts.push(action.payload);
        },
    },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions; //exporting 'action creator function'

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === postId);
