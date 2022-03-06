import Image from 'next/image';

function Hero() {
    return (
        <section className="grid md:grid-cols-2 border-l-2 border-black border-r-1 border-b-2">
            <div className="flex flex-col p-4 border-r-2 border-black justify-center items-center ">
                <p className="text-4xl">I'm Xian.</p>
                <p className="text-4xl text-center">I blog web development.</p>
            </div>
            <div className="">
                <Image src="/images/site/profile.jpg" alt="An image showing Xian" width={600} height={600}/>
            </div>
        </section>
    )
};

export default Hero;