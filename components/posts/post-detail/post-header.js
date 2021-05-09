import Image from 'next/image';
import classes from './post-header.module.css';

function PostHeader(props) {

    const { title, image } = props;
    return(
        <header className="mt-12">
            <h1 className="font-bold text-center text-3xl mb-12">{title}</h1>
            <div className="flex justify-center">
                <Image src={image} alt={title} width={600} height={400} />
            </div>
        </header>
    )
};

export default PostHeader;