import AllPosts from '../../components/posts/all-posts';

const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Nextjs',
    image: 'getting-started-nextjs.png',
    excerpt: 'Nextjs is the React framework for production.',
    date: '2022-02-10',
  },
  {
    slug: 'nextjs-file-based-routing',
    title: 'Getting Started with Nextjs',
    image: 'nextjs-file-based-routing.png',
    excerpt: 'Nextjs is the React framework for production.',
    date: '2022-02-10',
  }
]

function AllPostsPage() {
    return(
        <AllPosts posts={DUMMY_POSTS}/>
    )
};

export default AllPostsPage;