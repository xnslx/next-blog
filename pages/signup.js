import { useState, useRef, useEffect } from 'react';
import { getProviders, useSession, getSession, signIn } from 'next-auth/client';
import { useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

async function createUser(email, password) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Something went wrong')
    }

    return data;
}

function AuthForm(props) {
    const [session, loading ] = useSession();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    async function submitHandler(e) {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if(isLogin) {
            const result = await signIn('credentials', {
                redirect:false,
                email: enteredEmail,
                password: enteredPassword
            });

            if(!result.error) {
                router.replace('/posts')
            }

            console.log(result)
        } else {
            try {
                const result = await createUser(enteredEmail, enteredPassword);
                console.log(result)
            } catch(error) {
                console.log(error)
            }
        }
    }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

//   console.log('process.env.NODE_ENV',process.env.NODE_ENV)
//   let callbackUrl;
//   if(process.env.NODE_ENV == 'development') {
//     callbackUrl = 'http://localhost:3000/posts'
//   } else if(process.env.NODE_ENV == 'production') {
//     callbackUrl = 'https://next-blog-delta-five.vercel.app/posts'
//   }
  
//   console.log('callbackUrl', callbackUrl)
  
  return (
    <div className="flex flex-col mt-20 justify-around md:flex-row">
        <div className=" -mt-12 md:-mt-10 md:ml-16">
            <Image src="/images/images/signin.png" width={500} height={500} />
        </div>
        <section className="ml-auto mr-auto w-4/5 mb-8 md:w-1/3">
        {/* <h1>{isLogin ? 'Login' : 'Sign Up'}</h1> */}
        <form onSubmit={submitHandler} className="flex flex-col md:w-4/5 h-2/3 mt-18 ">
            <div>
            <label htmlFor='email' className="text-sm font-normal">Email</label>
            <input type='email' id='email' required ref={emailInputRef} className="block h-10 w-full mb-2  rounded border-black border-2"/>
            </div>
            <div>
            <label htmlFor='password' className="text-sm font-normal">Password</label>
            <input type='password' id='password' required ref={passwordInputRef} className="block h-10 w-full mb-8 rounded border-black border-2"/>
            </div>
            <div>
            <button className="h-10 w-full bg-gray-800 mb-2 text-xs text-white rounded mr-1">LOGIN</button>
            {/* <button className="h-10 w-36 text-xs rounded border-black border-2">SINGUP</button> */}
            <Link href='/signup'>
                <a className="text-sm font-light">Don't have an account? <strong>Sign up</strong></a>
            </Link>
            {/* <button
                type='button'
                onClick={switchAuthModeHandler}
            >
                {isLogin ? 'Create new account' : 'Login with existing account'}
            </button> */}
                <div className="flex flex-row justify-between mt-4">
                    <hr className="mt-8 w-2/5 border-black"></hr>
                    <h6 className="mt-5">or</h6>
                    <hr className="mt-8 w-2/5 border-black"></hr>
                </div>            
            </div>
            {/* <div className="flex flex-row justify-around content-center mt-4">
                <button onClick={() => signIn('google', {callbackUrl: callbackUrl})}>
                    <Image src="/images/icons/google.png" height={24} width={24}/>
                </button>
                <button onClick={() => signIn('github', {callbackUrl: callbackUrl})}>
                    <Image src="/images/icons/github.png" height={24} width={24}/>
                </button>
                <button onClick={() => signIn('facebook', {callbackUrl: callbackUrl})}>
                    <Image src="/images/icons/facebook.png" height={24} width={24}/>
                </button>
            </div> */}
            <div className="flex flex-row justify-around content-center mt-4">
                {Object.values(props.providers).map((provider) => {
                    if(provider.name === 'Credentials') {
                        return;
                    }
                    return (
                        <div key={provider.name}>
                            <button className="rounded p-2 border-black border-2" onClick={() => signIn(provider.id)}>{provider.name}</button>
                        </div>
                    )
                })}
            </div>
        </form>
        </section>
    </div>
  );
}

export async function getServerSideProps(context) {    
    const providers = await getProviders();
    console.log('providers', providers)
    return {
        props:{
            providers
        }
    }
}

export default AuthForm;