'use client'

export default function BlogPostCard({title, description, tags}) {
    return(
        <article className="self-center w-10/12 h-44 border border-solid border-greenDark flex flex-col items-center overflow-hidden">
            <div className="w-11/12 h-8 flex flex-row justify-end gap-2 mt-2">
                {tags.map((tag) => {
                    return <span key={tag} className="text-sm align-center bg-greenDark rounded-full px-8 h-6 text-center">{tag}</span>
                })}
            </div>
            <div className="w-11/12">
                <a href="/blogpostname" className="text-xl font-bold hover:text-greenBright transition-all">{title}</a>
                <p className="text-greyText text-elipsis max-h-11/12 overflow-hidden">{description}</p>
            </div>
        </article>
    );
}