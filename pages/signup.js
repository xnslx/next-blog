import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter} from 'next/router';

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

function AuthForm() {
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
    <section className="bg-gray-200 w-1/3 absolute right-24 top-36 h-2/3 ">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} className="flex flex-col w-3/4 h-2/3 ml-auto mr-auto mt-20 ">
        <div>
          <label htmlFor='email' className="text-sm font-light">Email</label>
          <input type='email' id='email' required ref={emailInputRef} className="block h-10 w-full mb-2  rounded"/>
        </div>
        <div>
          <label htmlFor='password' className="text-sm font-light">Password</label>
          <input type='password' id='password' required ref={passwordInputRef} className="block h-10 w-full rounded"/>
        </div>
        <div>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;