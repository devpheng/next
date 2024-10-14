"use client"
import { useData } from "@/context/datacontext";

export const MakePaymentButton = ({makePayment}) => {
    const { carts } = useData();

    const pay = async () => {
        const session = await makePayment(carts);
        window.location.href = session.url;
        console.log(session.url);
    }

    return (
        <>
            <a className="btn btn-outline-dark btn-sm" onClick={() => { pay() }} >
                Procceed to checkout<i className="fas fa-long-arrow-alt-right ms-2"></i>
            </a>
        </>
    )
}
