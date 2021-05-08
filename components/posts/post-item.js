import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect} from 'react';

import Link from 'next/link';
import Image from 'next/image'
import classes from './post-item.module.css'

function PostItem(props) {
    const { title, image, excerpt, date, slug} = props.post;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const imagePath = `/images/posts/${slug}/${image}`

    const linkPath = `/posts/${slug}`
    console.log('linkPath', linkPath)

    return(
        <div className="bg-white">
            <li className="">
                <Link href={linkPath}>
                    <a>
                        <div>
                            <Image src={imagePath} alt={title} width={300} height={200} layout='responsive'/>
                        </div>
                        <div>
                            <h3 className="text-base font-bold ml-2 mt-2">{title}</h3>
                            <time className="text-sm font-light ml-2">{formattedDate}</time>
                            <p className="font-normal mt-6 ml-2 pb-2">{excerpt}</p>
                        </div>
                    </a>
                </Link>
            </li>
        </div>
    )
};

export default PostItem;