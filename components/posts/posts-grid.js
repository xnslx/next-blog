import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';
import PostItem from './post-item';
import classes from './posts-grid.module.css'

function PostsGrid(props) {
    const {posts} = props;

    console.log('posts', posts);

    return(
        <ul className=" w-full grid grid-cols-1 gap-10 mt-12 md:w-11/12 md:ml-auto md:mr-auto md:grid md:grid-cols-3 md:gap-10 md:mt-12">
            {posts.map(post => <PostItem key={post.slug} post={post} />)}
        </ul>
    )
};



export default PostsGrid;