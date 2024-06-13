import { getProducts } from "@/actions/product"
import { Product } from "./product";
import { Modal } from '@/components/modal'
import { addToCart } from "@/actions/cart";

export const Products = async ({size = 1000}) => {
    const products: any = await getProducts(size);

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
