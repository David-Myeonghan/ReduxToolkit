import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import {client} from '../../api/client'
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
    posts:[], // could be 'data' or 'items' // array
    status: 'idle',
    error: null,
}

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
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0, },
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
            const {postId, reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id === postId)

            if(existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions; //exporting 'action creator function'

export default postsSlice.reducer;

export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

//args:
// string used as the prefix for the generated action types
// 'payload createor' callback function // using async/await in try/catch
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fageApi/posts') // response will {posts: []}
    return response.posts
})