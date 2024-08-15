import Image from "next/image";
import { getProduct } from "@/actions/product"
import { ProductSlider } from '@/components/detail/productSlider'
import { ProductDetail } from '@/components/detail/productDetail';
import { ProductDetailTabs } from '@/components/detail/productDetailTabs';
import { addToCart } from "@/actions/cart";
import { Products } from '@/components/products';

export default async function Detail({ params }) {
    const product = await getProduct(parseInt(params.id[0]));
    const css = `
    body {
        background-color: #F8F9FA !important;
    }
    `;

    return (
        <div className="container">
            <style>{css}</style>
            <div className="row mb-5 pt-5">
                <div className="col-lg-6">
                    <ProductSlider photos={product?.photos}/>
                </div>
                <div className="col-lg-6">
                    <ProductDetail product={product} addToCart={addToCart}/>
                </div>
            </div>
            <ProductDetailTabs product={product}/>
            {/* <!-- RELATED PRODUCTS--> */}
            <h2 className="h5 text-uppercase mb-4">Related products</h2>
            <Products size="4" categoryId={product.categoryId}/>
        </div>
    )
}
