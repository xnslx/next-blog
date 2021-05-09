import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark} from 'react-syntax-highlighter/dist/cjs/styles/prism'


function PostContent(props) {
    const [isLoading, setIsLoading] = useState(true);
      const [session, loading] = useSession();
      console.log('allposts', session);

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
      
    const { post } = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const customRenderers = {
      // image(image) {
      //   return <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300}/>
      // },
      p(paragraph) {
        const { node } = paragraph;
        if(node.children[0].tagName === 'img') {
          const image = node.children[0];
          return (
            <div className={classes.image}>
              <Image src={`/images/posts/${post.slug}/${image.properties.src}`} alt={image.alt} width={600} height={300}/>
            </div>
          )
        }

        return (
          <p>
            {paragraph.children}
          </p>
        )
      },

      code(code) {
        const { className, children } = code;
        const language = className.split('-')[1];
        return (
          <SyntaxHighlighter 
            style={atomDark}
            language={language}
            children={children}
          />
        )
      }

    }
    return(
        <article className=" w-10/12 md:w-9/12 ml-auto mr-auto">
            <PostHeader title={post.title} image={imagePath}/>
            <ReactMarkdown components={customRenderers} className="md:w-9/12 ml-auto mr-auto mt-12 font-semibold text-base">{post.content}</ReactMarkdown>
        </article>
    )
};

export default PostContent;