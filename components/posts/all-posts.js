import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';
import PostsGrid from "./posts-grid";
import classes from './all-posts.module.css';

function AllPosts(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [session, loading] = useSession();

    useEffect(() => {
        getSession().then(session => {
            console.log('session', session)
            if(!session) {
                window.location.href = '/signin'
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
        <section className="w-10/12 ml-auto mr-auto">
            {/* The user will see PostsGrid component once the user successfully log in. */}
            <PostsGrid posts={props.posts} />
        </section>
    )
};

export async function getServerSideProps(context) {
    return {
      props: {
        session: await getSession(context)
      }
    }
}



export default AllPosts;