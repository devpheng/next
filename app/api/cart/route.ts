import { getCarts } from "@/actions/cart";

export const GET = async (request) => {
    const data = await getCarts();
    return new Response(JSON.stringify(data), { status: 200 })
}