"use client";
import { getFavorites } from "@/actions/favorite";
import { useData } from "@/context/datacontext";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";

export const Header = () => {
    const { data: session } = useSession();
    const { favorite, setFavorite } = useData();
    useEffect(()=>{
        if(session) {
            fetch('/api/favorite/'+session?.user?.email)
            .then(async (response) => {
                const data = await response.json();
                console.log(data);
                let favorites = data.map((fav)=>{
                    let {id, name, price} = fav.product;
                    let photo = fav.product.photos[0].url;
                    return {id, name, price, photo};
                });
                setFavorite(favorites);
            });
        }
    }, [session?.user?.email]);
    return (
        <header className="header bg-white">
            <div className="container px-lg-3">
                <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0"><a className="navbar-brand" href="index.html"><span className="fw-bold text-uppercase text-dark">Boutique</span></a>
                    <button className="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="index.html">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="shop.html">Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="detail.html">Product detail</a>
                            </li>
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                                <div className="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown"><a className="dropdown-item border-0 transition-link" href="index.html">Homepage</a><a className="dropdown-item border-0 transition-link" href="shop.html">Category</a><a className="dropdown-item border-0 transition-link" href="detail.html">Product detail</a><a className="dropdown-item border-0 transition-link" href="cart.html">Shopping cart</a><a className="dropdown-item border-0 transition-link" href="checkout.html">Checkout</a></div>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="cart.html"> <i className="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small className="text-gray fw-normal">(2)</small></a></li>
                            <li className="nav-item"><a className="nav-link" href="#!"> <i className="far fa-heart me-1"></i><small className="text-gray fw-normal"> ({favorite.length})</small></a></li>
                            {session ?
                                <li className="nav-item"><a className="nav-link" onClick={() => signOut()}> <img src={session?.user?.image} alt="profile" style={{'border-radius': '50%'}} width='20px' />{session?.user?.name} {session?.user?.id}</a></li>
                                :
                                <li className="nav-item"><a className="nav-link" onClick={() => signIn()}> <i className="fas fa-user me-1 text-gray fw-normal"></i>Login</a></li>

                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}
