import Image from "next/image";
import { getProduct } from "@/actions/product"
import { ProductSlider } from '@/components/detail/productSlider'
import { ProductDetail } from '@/components/detail/productDetail';
import { ProductDetailTabs } from '@/components/detail/productDetailTabs';
import { addToCart } from "@/actions/cart";

export default async function Detail({ params }) {
    const product = await getProduct(parseInt(params.id[0]));
    const css = `
    body {
        background-color: #F8F9FA !important;
    }
    `
    console.log(product);

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
            <div className="row">
                {/* <!-- PRODUCT--> */}
                <div className="col-lg-3 col-sm-6">
                    <div className="product text-center skel-loader">
                        <div className="d-block mb-3 position-relative"><a className="d-block" href="detail.html"><Image width={0} height={0}  className="Image-fluid w-100" src="/assets/img/product-6.jpg" alt="..." /></a>
                            <div className="product-overlay">
                                <ul className="mb-0 list-inline">
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                                    <li className="list-inline-item mr-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">Kui Ye Chen’s AirPods</a></h6>
                        <p className="small text-muted">$250</p>
                    </div>
                </div>
                {/* <!-- PRODUCT--> */}
                <div className="col-lg-3 col-sm-6">
                    <div className="product text-center skel-loader">
                        <div className="d-block mb-3 position-relative"><a className="d-block" href="detail.html"><Image width={0} height={0}  className="Image-fluid w-100" src="/assets/img/product-6.jpg" alt="..." /></a>
                            <div className="product-overlay">
                                <ul className="mb-0 list-inline">
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                                    <li className="list-inline-item mr-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">Air Jordan 12 gym red</a></h6>
                        <p className="small text-muted">$300</p>
                    </div>
                </div>
                {/* <!-- PRODUCT--> */}
                <div className="col-lg-3 col-sm-6">
                    <div className="product text-center skel-loader">
                        <div className="d-block mb-3 position-relative"><a className="d-block" href="detail.html"><Image width={0} height={0}  className="Image-fluid w-100" src="/assets/img/product-6.jpg" alt="..." /></a>
                            <div className="product-overlay">
                                <ul className="mb-0 list-inline">
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                                    <li className="list-inline-item mr-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">Cyan cotton t-shirt</a></h6>
                        <p className="small text-muted">$25</p>
                    </div>
                </div>
                {/* <!-- PRODUCT--> */}
                <div className="col-lg-3 col-sm-6">
                    <div className="product text-center skel-loader">
                        <div className="d-block mb-3 position-relative"><a className="d-block" href="detail.html"><Image width={0} height={0}  className="Image-fluid w-100" src="/assets/img/product-6.jpg" alt="..." /></a>
                            <div className="product-overlay">
                                <ul className="mb-0 list-inline">
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                                    <li className="list-inline-item mr-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">Timex Unisex Originals</a></h6>
                        <p className="small text-muted">$351</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
