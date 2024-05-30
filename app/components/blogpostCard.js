'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

export default function BlogPostCard({blogpostId, title, description, tags, authorId, initDate, userPage = false}) {
    const [author, setAuthor] = useState({});
    const [date, setDate] = useState('');
    const [avatar, setAvatar] = useState('');

    const getAuthor = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/` + authorId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setAuthor(data);
    }

    const getDateFormat = () => {
        const date = new Date(initDate);
        const splittedDate = date.toLocaleDateString().split('/');
        const year = splittedDate[2];
        const day = splittedDate[1];
        const month = splittedDate[0];
        return `${day}.${month}.${year}`;
    }

    const getAvatar = async () => {
        const pfpResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/${authorId}/avatar`, {
            method: 'GET'
        });

        const img = await pfpResponse.blob();
        const imgSrc = URL.createObjectURL(img);
        setAvatar(imgSrc);
    }

    useEffect(() => {
        (async () => {
            await getAuthor();
            await getAvatar();
            setDate(getDateFormat());
        })();
    }, []);

    return(
        <article className="self-center w-10/12 h-44 border border-solid border-greenDark flex flex-col items-center overflow-hidden">
            <div className="w-11/12 h-1/12 flex flex-row justify-between gap-2 mt-2">
                    {!userPage &&
                        <div className="flex flex-row items-center justify-start self-center gap-2 h-full">
                            <Image src={avatar} alt="pfp" width="20" height="20" className="object-cover w-6 h-6 rounded-full border border-solid border-greenBright" />
                            <a href={`/user/${author.username}`} className="text-greyText hover:text-greenBright transition-all align-center">{author.username}</a>
                        </div>
                    }
                <div className="min-h-8 flex flex-row gap-2 self-center">
                    {tags.map((tag) => {
                        return <span key={tag} className="text-sm bg-greenDark rounded-full px-8 h-6 text-center">{tag}</span>
                    })}
                </div>
            </div>
            <div className="w-11/12 h-full overflow-hidden">
                <a href={`/blogPost/${blogpostId}`} className="text-xl font-bold hover:text-greenBright transition-all">{title}</a>
                <p className="text-greyText text-elipsis max-h-11/12 overflow-hidden">{description}</p>
            </div>
            <div className="self-end mr-8 mb-2">
                <span>{date}</span>
            </div>
        </article>
    );
}