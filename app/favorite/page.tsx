"use client"
import { useData } from "@/context/datacontext";
import { Product } from "@/components/product";

export default function Favorite() {
    const { favorite, setFavorite } = useData();

    return (
        <div className="container">
            <h2 className="text-center my-5">Wish List</h2>
            <div className="row">
                {favorite.map((product: any) => {
                    console.log(product);
                    return <Product product={product} key={product.id}/> 
                })}
            </div>
        </div>
    )
}
