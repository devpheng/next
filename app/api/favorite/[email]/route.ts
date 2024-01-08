import { getFavorites } from "@/actions/favorite";

export const GET = async (request, { params }) => {
    const email= params.email;
    const data = await getFavorites(email);
    return new Response(JSON.stringify(data), { status: 200 })
}