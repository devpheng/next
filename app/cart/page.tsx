"use client"
import { CartItem } from "@/components/cartitem";
import { useData } from "@/context/datacontext";

export default function Cart() {
    const { carts, setCarts } = useData();

    const totalPrice = () => {
        let total = 0;
        carts.map((cart) => {
            total += cart.price * cart.qty;
        });
        return total;
    }

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
                        <table className="table text-nowrap">
                        <thead className="bg-light">
                            <tr>
                            <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">Product</strong></th>
                            <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">Price</strong></th>
                            <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">Quantity</strong></th>
                            <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase">Total</strong></th>
                            <th className="border-0 p-3" scope="col"> <strong className="text-sm text-uppercase"></strong></th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            {
                                carts.map((cart: any) => {
                                    return <CartItem cart={cart} /> 
                                })
                            }
                        </tbody>
                        </table>
                    </div>
                    <div className="bg-light px-4 py-3">
                        <div className="row align-items-center text-center">
                        <div className="col-md-6 mb-3 mb-md-0 text-md-start"><a className="btn btn-link p-0 text-dark btn-sm" href="shop.html"><i className="fas fa-long-arrow-alt-left me-2"> </i>Continue shopping</a></div>
                        <div className="col-md-6 text-md-end"><a className="btn btn-outline-dark btn-sm" href="checkout.html">Procceed to checkout<i className="fas fa-long-arrow-alt-right ms-2"></i></a></div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-0 rounded-0 p-lg-4 bg-light">
                            <div className="card-body">
                                <h5 className="text-uppercase mb-4">Cart total</h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="d-flex align-items-center justify-content-between">
                                        <strong className="text-uppercase small font-weight-bold">Subtotal</strong>
                                        <span className="text-muted small">${totalPrice()}</span>
                                    </li>
                                    <li className="border-bottom my-2"></li>
                                    <li className="d-flex align-items-center justify-content-between mb-4">
                                        <strong className="text-uppercase small font-weight-bold">Total</strong>
                                        <span>${totalPrice()}</span>
                                    </li>
                                    <li>
                                    <form action="#">
                                        <div className="input-group mb-0">
                                        {/* <input className="form-control" type="text" placeholder="Enter your coupon"> */}
                                        <button className="btn btn-dark btn-sm w-100" type="submit"> <i className="fas fa-gift me-2"></i>Apply coupon</button>
                                        </div>
                                    </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
