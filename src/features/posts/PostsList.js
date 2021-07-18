import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, fetchPosts } from './postsSlice';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';

export const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    // async
    const postStatus = useSelector(state => state.posts.status) // this help to decide to fetch it once.
    const error = useSelector(state => state.posts.error);

    // async
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;

    if (postStatus === 'loading') {
        content = <div className='loader'>Loading...</div>
    } else if (postStatus === 'succeeded') {
        // Sort posts in revers by datetime string
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));

        content = orderedPosts.map(post => (
            // <PostExcerpt key={post.id} post={post} />
            <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <PostAuthor userId={post.user} />
            <br />
            <ReactionButtons post={post}/>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
        ))
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>
    }


    // const renderedPosts = orderedPosts.map((post) => (
    //     <article className="post-excerpt" key={post.id}>
    //         <h3>{post.title}</h3>
    //         <p className="post-content">{post.content.substring(0, 100)}</p>
    //         <PostAuthor userId={post.user} />
    //         <br />
    //         <ReactionButtons post={post}/>
    //         <Link to={`/posts/${post.id}`} className="button muted-button">
    //             View Post
    //         </Link>
    //     </article>
    // ));

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {/* {renderedPosts} */}
            {content}
        </section>
    );
};
