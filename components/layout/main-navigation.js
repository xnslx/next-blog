import Link from 'next/link';
import {useSession, signOut} from 'next-auth/client';
import classes from './main-navigation.module.css';
import Logo from './logo';

function MainNavigation() {
    const [session, loading] = useSession();
    console.log('mainnav', session)

    function logoutHandler() {
        signOut()
    }
    return(
        <header>
            <Link href='/'>
                <a>
                    <Logo />
                </a>
            </Link>
            <nav>
                <ul>
                    {session && <li>
                        <Link href="/posts">Posts</Link>
                    </li>}
                    <li><Link href="/contact">Contact</Link></li>
                    {!session && (
                        <li><Link href="/signup">Login</Link></li>
                    )}
                    {session && (
                        <li><button onClick={logoutHandler}>Logout</button></li>
                    )}                    
                </ul>
            </nav>
        </header>
    )
};

export default MainNavigation;