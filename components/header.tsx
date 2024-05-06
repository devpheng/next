"use client";
import { useData } from "@/context/datacontext";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import Link from "next/link";

export const Header = () => {
    const { data: session } = useSession();
    const { favorite, setFavorite, carts, setCarts } = useData();
    useEffect(()=>{
        if(session) {
            fetch('/api/favorite/'+session?.user?.email)
            .then(async (response) => {
                const data = await response.json();
                if(data) {
                    let favorites = data.map((fav)=>{
                        let {id, name, price} = fav.product;
                        let photo = fav.product.photos[0].url;
                        let favorites = [{id: fav.id}];
                        return {id, name, price, photo, favorites};
                    });
                    setFavorite(favorites);
                }
            });

            fetch('/api/cart')
            .then(async (response) => {
                const data = await response.json();
                let carts = data?.map((cart)=>{
                    let {id, qty} = cart;
                    let {name, price} = cart.product; 
                    let photo = cart.product.photos[0].url;
                    return {id, name, price, photo, qty};
                });
                setCarts(carts);
            });
        }
    }, [session?.user?.email]);
    return (
        <header className="header bg-white">
            <div className="container px-lg-3">
                <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
                    <Link className="navbar-brand" href="/">
                        <span className="fw-bold text-uppercase text-dark">Boutique</span>
                    </Link>
                    <button className="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" href="/">Home</Link>
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
                            <li className="nav-item">
                                <Link className="nav-link" href="/cart">
                                    <i className="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small className="text-gray fw-normal">({carts.length})</small>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/favorite">
                                    <i className="far fa-heart me-1"></i><small className="text-gray fw-normal"> ({favorite.length})</small>
                                </Link>
                            </li>
                            {session ?
                                <li className="nav-item"><a className="nav-link" onClick={() => signOut()}> <img src={ session?.user?.image } alt="profile" style={{'borderRadius': '50%'}} width='20px' referrerPolicy="no-referrer"/>{session?.user?.name}</a></li>
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
