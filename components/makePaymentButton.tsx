"use client"
import { useData } from "@/context/datacontext";

export const MakePaymentButton = ({removeCart, makePayment}) => {
    const { carts, setCarts } = useData();

    const pay = async () => {
        const session = await makePayment(carts);

        carts.forEach((item) => {
            removeCart(item.id);
        });

        setCarts([]);

        window.location.href = session.url;
    }

    return (
        <>
            <a className="btn btn-outline-dark btn-sm" onClick={() => { pay() }} >
                Procceed to checkout<i className="fas fa-long-arrow-alt-right ms-2"></i>
            </a>
        </>
    )
}
