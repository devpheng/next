import { getProducts } from "@/actions/product"
import { Product } from "./product";
import { Modal } from '@/components/modal'

export const Products = async () => {
    const products: any = await getProducts();

    return (
        <>
            <div className="row">
                {products.map((product: any) => {
                    return <Product product={product} /> 
                })}
            </div>
            <Modal/>
        </>
    )
}
