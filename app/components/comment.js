import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from 'react';

export default function Comment({ id_author, content, date}) {

    const [author, setAuthor] = useState({});
    const [avatar, setAvatar] = useState({});
    const [initDate, setInitDate] = useState('');

    const getAuthor = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/${id_author}`, {
            method: 'GET'
        });

        if (response.status != 200) return;

        const data = await response.json();
        setAuthor(data);
    }

    const getAvatar = async () => {
        const pfpResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/${id_author}/avatar`, {
            method: 'GET'
        });

        const img = await pfpResponse.blob();
        const imgSrc = URL.createObjectURL(img);
        setAvatar(imgSrc);
    }

    const getDateFormat = () => {
        const initDate = new Date(date);
        const splittedDate = initDate.toLocaleDateString().split('/');
        const year = splittedDate[2];
        const day = splittedDate[1];
        const month = splittedDate[0];
        return `${day}.${month}.${year}`;
    }

    useEffect(() => {
        (async () => {
            await getAuthor();
            await getAvatar();
            setInitDate(getDateFormat(date));
        })();
    }, []);

    return (
        <article className="flex flex-row justify-between w-full overflow-hidden">
            <Image src={avatar} alt="Avatar" width={40} height={40} className="min-w-14 min-h-14 w-14 h-14 rounded-full border border-solid border-greenBright" />
            <div className="flex flex-col justify-start mt-1 ml-4" style={{ marginRight: 'auto' }}>
                <Link href={`/user/${author.username}`} className="normal-link text-lg">{author.username}</Link>
                <p className="mt text-greyText text-justify w-full w-max-full text-pretty break-all">{content}</p>
            </div>
            <span>{initDate}</span>
        </article>
    )
}