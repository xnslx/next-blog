import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {Fragment} from 'react';

import AllPosts from '../../components/posts/all-posts';
import {getAllPosts} from '../../lib/posts-util';


function AllPostsPage(props) {
    const [ session, loading ] = useSession();
    if(!session) {
       return <p>You need to log in to see all posts</p> 
    }
    return(
        <Fragment>
            <Head>
                <title>All Posts</title>
                <meta name='description' content='A list of all programming-related tutorials and posts.'/>
            </Head>
            {/* You will see AllPosts components once the user successfully log in. */}
            <AllPosts posts={props.posts}/>
        </Fragment>
        
    )
};

export function getStaticProps() {
    const allPosts = getAllPosts();

    return{
        props:{
            posts: allPosts
        }
    }
}



export default AllPostsPage;