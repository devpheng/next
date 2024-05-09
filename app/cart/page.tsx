import CartTotal from "@/components/cartTotal";
import { CartItem } from "@/components/cartitem";
import { removeCart, updateCartQty } from "@/actions/cart";

export default function Cart() {

    return (
        <div className="container">
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                    <div className="col-lg-6">
                        <h1 className="h2 text-uppercase mb-0">Cart</h1>
                    </div>
                    <div className="col-lg-6 text-lg-end">
                        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                            <li className="breadcrumb-item"><a className="text-dark" href="index.html">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Cart</li>
                        </ol>
                        </nav>
                    </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
                <div className="row">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                        <div className="table-responsive mb-4">
                            <CartItem removeCart={removeCart} updateCartQty={updateCartQty}/>
                        </div>
                        <div className="bg-light px-4 py-3">
                            <div className="row align-items-center text-center">
                            <div className="col-md-6 mb-3 mb-md-0 text-md-start"><a className="btn btn-link p-0 text-dark btn-sm" href="shop.html"><i className="fas fa-long-arrow-alt-left me-2"> </i>Continue shopping</a></div>
                            <div className="col-md-6 text-md-end"><a className="btn btn-outline-dark btn-sm" href="checkout.html">Procceed to checkout<i className="fas fa-long-arrow-alt-right ms-2"></i></a></div>
                            </div>
                        </div>
                    </div>
                    <CartTotal />
                </div>
            </section>
        </div>
    )
}
