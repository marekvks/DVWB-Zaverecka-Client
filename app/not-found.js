import Image from 'next/image';
import '../app/css/404.css';

export default function NotFound() {
    return (
        <main>
            <Image src="/raccoon-dance.gif" alt="404" width="500" height="500" />
            <h3>404 Not Found.</h3>
            <p>Nothing but a raccoon and an idiot vibing together. 😱</p>
        </main>
    )
}