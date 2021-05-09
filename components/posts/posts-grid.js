import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';
import PostItem from './post-item';
import classes from './posts-grid.module.css'

function PostsGrid(props) {
    const {posts} = props;

    console.log('posts', posts);

    return(
        <ul className="w-11/12 ml-auto mr-auto grid grid-cols-3 gap-10 mt-12">
            {posts.map(post => <PostItem key={post.slug} post={post} />)}
        </ul>
    )
};



export default PostsGrid;