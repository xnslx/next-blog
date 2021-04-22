import Image from 'next/image';
import classes from './hero.module.css'

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/xian.jpeg" alt="An image showing Xian" width={300} height={300} />
            </div>
            <h1>Hi, I'm Xian.</h1>
            <p>I blog web development.</p>
        </section>
    )
};

export default Hero;