import classes from './featured-posts.module.css';
import PostsGrid from '../posts/posts-grid';

function FeaturedPosts(props) {
    console.log('props', props)
    return(
        <section className="">
            <h2 className="bg-red-500 h-20 border border-black border-l-2 border-r-2 border-b-2 text-center">Featured Posts</h2>
            <PostsGrid posts={props.posts}/>
        </section>
    )
};

export default FeaturedPosts;