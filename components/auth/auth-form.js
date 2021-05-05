import { useState } from 'react';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className="bg-red-500 w-360">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className="">
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
        </div>
        <div className="">
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className=""
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
