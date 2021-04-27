import {Fragment} from 'react';
import Head from 'next/head';
import Hero from '../components/home-page/hero';
import FeaturedPost from '../components/home-page/featured-posts';
import {getFeaturedPosts} from '../lib/posts-util';


function Home(props) {
  return(
    <Fragment>
      <Head>
        <title>Xian's blog</title>
        <meta name='description' content='I post about programming and web development.'/>
      </Head>
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
