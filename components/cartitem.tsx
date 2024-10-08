"use client"
import Image from 'next/image';
import { useData } from "@/context/datacontext";
import Link from "next/link";

export const CartItem = ({removeCart, updateCartQty}) => {
    const { carts, setCarts } = useData();

    const increase = (id) => {
        let newCarts = [];
        carts.map((cart) => {
            let newCart = {...cart};
            
            if(cart.id == id) {
                newCart.qty += 1;
                updateCartQty(id, newCart.qty);
            }
            newCarts.push(newCart)
        });

        setCarts(newCarts);
    }

    const decrease = (id) => {
        let newCarts = [];
        carts.map((cart) => {
            let newCart = {...cart};
            
            if(cart.id == id && cart.qty > 1) {
                newCart.qty -= 1;
                updateCartQty(id, newCart.qty);
            }
            newCarts.push(newCart)
        });

        setCarts(newCarts);
    }

    const remove = (id) => {
        const newCarts = carts.filter((cart) => {
            return cart.id != id;
        });

        removeCart(id);

        setCarts(newCarts);
    }

    return (
        <>
            {
                carts.length ?
                (
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
                            carts.map((cart: any, i) => {
                                return (<tr key={i}>
                                    <th className="ps-0 py-3 border-light" scope="row">
                                        <div className="d-flex align-items-center">
                                            <Link className="reset-anchor d-block animsition-link" href={`/detail/${cart.productId}`}>
                                                <Image
                                                    src={cart.photo}
                                                    alt={cart.name}
                                                    width={70}
                                                    height={70}
                                                />
                                            </Link>
                                            <div className="ms-3">
                                                <strong className="h6">
                                                    <Link className="reset-anchor animsition-link" href={`/detail/${cart.productId}`}>{cart.name}</Link>
                                                </strong>
                                            </div>
                                        </div>
                                    </th>
                                    <td className="p-3 align-middle border-light">
                                        <p className="mb-0 small">${cart.price}</p>
                                    </td>
                                    <td className="p-3 align-middle border-light">
                                        <div className="border d-flex align-items-center justify-content-between px-3">
                                            <span className="small text-uppercase text-gray headings-font-family">Quantity</span>
                                            <div className="quantity">
                                                <button className="dec-btn p-0" onClick={() => { decrease(cart.id) }}>
                                                    <i className="fas fa-caret-left"></i>
                                                </button>
                                                <input className="form-control form-control-sm border-0 shadow-0 p-0" type="text" value={cart.qty} readOnly/>
                                                <button className="inc-btn p-0" onClick={() => { increase(cart.id) }}>
                                                    <i className="fas fa-caret-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 align-middle border-light">
                                        <p className="mb-0 small">${cart.price * cart.qty}</p>
                                    </td>
                                    <td className="p-3 align-middle border-light">
                                        <a className="reset-anchor" onClick={() => { remove(cart.id) }} style={{cursor: 'pointer'}}>
                                            <i className="fas fa-trash-alt small text-muted"></i>
                                        </a>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                )
                :
                <p className='text-center'>No product in cart</p>
            }
        </>
    )
}
