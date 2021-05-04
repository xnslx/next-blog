import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {Fragment} from 'react';

import AllPosts from '../../components/posts/all-posts';
import {getAllPosts} from '../../lib/posts-util';


function AllPostsPage(props) {
    // const [isLoading, setIsLoading] = useState(true);
    // const router = useRouter()

    // useEffect(() => {
    //     getSession().then(session => {
    //         console.log('allpostspage', session)
    //         if(session) {
    //             router.replace('/')
    //         } else {
    //             setIsLoading(false);
    //         }
    //     })
    // }, [])
    

    // if(isLoading) {
    //     return(
    //         <p>Loading...</p>
    //     )
    // }
    return(
        <Fragment>
            <Head>
                <title>All Posts</title>
                <meta name='description' content='A list of all programming-related tutorials and posts.'/>
            </Head>
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