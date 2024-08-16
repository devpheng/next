import { getPost } from "@/actions/post"

export default async function Post({ params }) {
    const post = await getPost(parseInt(params.id));
    return (
        <div className="container py-5">
            <h1 className="mb-2">{post?.title}</h1>
            <small className="d-block mb-2">{post?.createdAt.toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'})}</small>
            <p>{post?.content}</p>
            
        </div>
    )
}
