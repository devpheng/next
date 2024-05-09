"use client"
import { useData } from "@/context/datacontext";
export default function CartTotal() {
    const { carts } = useData();

    const totalPrice = () => {
        let total = 0;
        carts.map((cart) => {
            total += cart.price * cart.qty;
        });
        return total;
    }

    return (
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
    )
  }
  