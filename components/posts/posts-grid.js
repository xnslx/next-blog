import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';
import PostItem from './post-item';
import classes from './posts-grid.module.css'

function PostsGrid(props) {
    const {posts} = props;

    console.log('posts', posts);

    return(
        <ul className={classes.grid}>
            {posts.map(post => <PostItem key={post.slug} post={post} />)}
        </ul>
    )
};

export default PostsGrid;