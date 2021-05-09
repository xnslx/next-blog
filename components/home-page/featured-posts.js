import classes from './featured-posts.module.css';
import PostsGrid from '../posts/posts-grid';

function FeaturedPosts(props) {
    console.log('props', props)
    return(
        <section className=" border border-black border-l-2 border-r-2 border-t-0">
            <h2 className="bg-red-500 flex justify-center items-center h-20 border border-black border-l-0 border-r-0 border-b-2 border-t-0 text-center font-bold text-2xl ">Featured Posts</h2>
            <PostsGrid posts={props.posts}/>
        </section>
    )
};

export default FeaturedPosts;