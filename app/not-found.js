import Image from 'next/image';
import '../app/css/404.css';

export default function NotFound() {
    return (
        <main>
            <Image src="/404.gif" alt="404" width="500" height="500" />
            <h3>404 Not Found.</h3>
            <p>Look at what you did, bro is angwy because of you :(</p>
        </main>
    )
}