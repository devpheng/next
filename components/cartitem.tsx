import Image from 'next/image';
import { useData } from "@/context/datacontext";

export const CartItem = ({cart}) => {
    const { carts, setCarts } = useData();

    const increase = (id) => {
        let newCarts = [];
        carts.map((cart) => {
            let newCart = {...cart};
            
            if(cart.id == id) {
                newCart.qty += 1;
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
            }
            newCarts.push(newCart)
        });

        setCarts(newCarts);
    }

    return (
        <tr>
            <th className="ps-0 py-3 border-light" scope="row">
                <div className="d-flex align-items-center">
                    <a className="reset-anchor d-block animsition-link" href="#">
                        <Image
                            src={cart.photo}
                            alt={cart.name}
                            width={70}
                            height={70}
                        />
                    </a>
                    <div className="ms-3">
                        <strong className="h6">
                            <a className="reset-anchor animsition-link" href="#">{cart.name}</a>
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
                        <input className="form-control form-control-sm border-0 shadow-0 p-0" type="text" value={cart.qty}/>
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
                <a className="reset-anchor" href="#">
                    <i className="fas fa-trash-alt small text-muted"></i>
                </a>
            </td>
        </tr>
    )
}
