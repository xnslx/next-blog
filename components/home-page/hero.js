import Image from 'next/image';
import classes from './hero.module.css'

function Hero() {
    return (
        <section className="grid grid-cols-2 border-l-2 border-black border-r-2 border-b-2">
            <div className="flex flex-col border-r-2 border-black justify-center items-center ">
                <p className="text-4xl">Hi, I'm Xian.</p>
                <p className="text-4xl">I blog web development.</p>
            </div>
            <div className="border-black">
                <Image src="/images/site/xian.jpeg" alt="An image showing Xian" width={600} height={600}/>
            </div>
        </section>
    )
};

export default Hero;