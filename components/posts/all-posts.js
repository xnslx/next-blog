import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';
import PostsGrid from "./posts-grid";
import classes from './all-posts.module.css';

function AllPosts(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [session, loading] = useSession();
    console.log('allposts', session)
    useEffect(() => {
        getSession().then(session => {
            console.log('session', session)
            if(!session) {
                window.location.href = '/signup'
            } else {
                setIsLoading(false);
            }
        })
    }, [])
    

    if(isLoading) {
        return(
            <p>Loading...</p>
        )
    }

    return(
        <section className={classes.posts}>
            <h1>All Posts</h1>
            {/* The user will see PostsGrid component once the user successfully log in. */}
            <PostsGrid posts={props.posts}/>
        </section>
    )
};

async function getServerSideProps(context) {
    console.log('context', context)
    return {
      props: {
        session: await getSession(context)
      }
    }
}



export default AllPosts;