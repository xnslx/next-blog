import {Fragment} from 'react';
import Hero from '../components/home-page/hero';
import FeaturedPost from '../components/home-page/featured-posts';
import {getFeaturedPosts} from '../lib/posts-util';


function Home(props) {
  return(
    <Fragment>
      <Hero />
      <FeaturedPost posts={props.posts}/>
    </Fragment>
  )
};

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return{
    props:{
      posts: featuredPosts
    }
  }
}

export default Home;
