import { getProducts } from "@/actions/product"
import { Product } from "./product";
import { Modal } from '@/components/modal'
import { addToCart } from "@/actions/cart";

export const Products = async () => {
    const products: any = await getProducts();

    return (
        <>
            <div className="row">
                {products.map((product: any) => {
                    return <Product product={product} addToCart={addToCart}/> 
                })}
            </div>
            <Modal addToCart={addToCart}/>
        </>
    )
}
