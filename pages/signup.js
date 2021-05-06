import { useState, useRef } from 'react';
import { getProviders, signIn } from 'next-auth/client';
import { useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FacebookLoginButton } from "react-social-login-buttons";

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
    console.log('props', props)
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter()
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

  return (
    <div className="flex flex-row mt-20 justify-around">
        <div className="-mt-10">
            <Image src="/images/images/signin.png" width={500} height={500} />
        </div>
        <section className="w-1/3">
        {/* <h1>{isLogin ? 'Login' : 'Sign Up'}</h1> */}
        <form onSubmit={submitHandler} className="flex flex-col w-3/4 h-2/3 mt-18 ">
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
                <button>
                    <Image src="/images/icons/google.png" height={24} width={24}/>
                </button>
                <button onClick={() => signIn('github')}>
                    <Image src="/images/icons/github.png" height={24} width={24}/>
                </button>
                <button>
                    <Image src="/images/icons/facebook.png" height={24} width={24}/>
                </button>
            </div> */}
            {Object.values(props.providers).map(provider => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}> Sign in with{provider.name}</button>
                </div>
            ))}
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