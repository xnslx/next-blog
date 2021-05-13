import Link from 'next/link';
import {useSession, signOut} from 'next-auth/client';
import classes from './main-navigation.module.css';
import Logo from './logo';

function MainNavigation() {
    const [session, loading] = useSession();

    function logoutHandler() {
        signOut()
    }
    return(
        <header className="grid grid-cols-2 h-20 border-black border-t-2 border-b-2 border-l-2 border-r-2">
            <Link href='/'>
                <a className="mt-auto mb-auto ml-auto mr-auto">
                    <Logo />
                </a>
            </Link>
            <nav className="border-black border-t-0 border-b-0 border-l-2 ">
                <ul className="flex flex-row justify-around h-full">
                    {session && <li className="mt-auto mb-auto font-semibold">
                        <Link href="/posts">Posts</Link>
                    </li>}
                    <li className="mt-auto mb-auto font-semibold"><Link href="/contact">Contact</Link></li>
                    {!session && (
                        <li className="mt-auto mb-auto font-semibold"><Link href="/signin">Login</Link></li>
                    )}
                    {session && (
                        <li className="mt-auto mb-auto font-semibold"><button onClick={logoutHandler}>Logout</button></li>
                    )}                    
                </ul>
            </nav>
        </header>
    )
};

export default MainNavigation;