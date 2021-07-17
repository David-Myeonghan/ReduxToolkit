import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { postUpdated } from './postsSlice';

const EditPostForm = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector((state) =>
        state.posts.find((post) => post.id === postId)
    );

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.contnet);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleTitleChanged = (e) => setTitle(e.target.value);
    const handleContentChanged = (e) => setContent(e.target.value);

    const handleSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content }));
            history.push(`/posts/${postId}`);
        }
    };

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title: </label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="Type title"
                    value={title}
                    onChange={handleTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={handleContentChanged}
                />
                <button type="button" onClick={handleSavePostClicked}>
                    Save Post
                </button>
            </form>
        </section>
    );
};
