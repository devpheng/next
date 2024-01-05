import { getProducts } from "@/actions/product"

export const Products = async () => {
    const products: any = await getProducts();

    return (
        <div className="row">
            {products.map((product: any) => {
                return <div className="col-xl-3 col-lg-4 col-sm-6">
                    <div className="product text-center">
                        <div className="position-relative mb-3">
                            <div className="badge text-white bg-"></div>
                            <a className="d-block" href="detail.html">
                                <img className="img-fluid w-100" src={product.photos[0]?.url} alt="..." />
                            </a>
                            <div className="product-overlay">
                                <ul className="mb-0 list-inline">
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#!"><i className="far fa-heart"></i></a></li>
                                    <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="cart.html">Add to cart</a></li>
                                    <li className="list-inline-item me-0"><a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i className="fas fa-expand"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <h6> <a className="reset-anchor" href="detail.html">{product.name}</a></h6>
                        <p className="small text-muted">${product.price}</p>
                    </div>
                </div>
            })}
        </div>
    )
}
