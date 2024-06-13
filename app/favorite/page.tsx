"use client"
import { useData } from "@/context/datacontext";
import { Product } from "@/components/product";
import { addToCart } from "@/actions/cart";

export default function Favorite() {
    const { favorite, setFavorite } = useData();

    return (
        <div className="container">
            <h2 className="text-center my-5">Wish List</h2>
            <div className="row">
                {favorite.map((product: any) => {
                    console.log(product);
                    return <Product product={product} addToCart={addToCart}/> 
                })}
            </div>
        </div>
    )
}
