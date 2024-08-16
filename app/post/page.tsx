import { getPosts } from "@/actions/post";
import Link from "next/link";

export default async function Posts() {
    const posts = await getPosts();

    return (
        <div className="container post-list">
            <h1 className="text-center">Lastes Post</h1>
            <ol style={{'--length':posts?.length}} role="list">
                {
                    posts?.map((post, i) => {
                        return (<li key={post.id} style={{'--i':i}}>
                            <Link href={`/post/${post.id}`}>
                            <h3>{post.title}</h3>
                            <small>{post.createdAt.toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'})}</small>
                            <p style={{'color': 'black'}}>{post.content}</p>
                            </Link>
                        </li>);
                    })
                }
            </ol>
        </div>
    )
}
