"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useData } from "@/context/datacontext";
import { toast } from 'react-hot-toast'
import { toggleFavorite } from "@/actions/favorite";

export const ProductDetail = ({product, addToCart}) => {

    const { carts, setCarts, favorite, setFavorite,} = useData();
    const [ qty, setQty] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        let fav = favorite.filter((fav) => {
            return fav.id == product.id
        });
        if(fav.length > 0) {
            setIsFavorite(true);
            setFavoriteId(fav[0].favorites ? fav[0].favorites[0].id : null);
        } else {
            setIsFavorite(false);
            setFavoriteId(null);
        }
    }, [favorite, product]);

    async function setFavoriteData(product) {
        let favoriteObj = { productId: product.id, id: favoriteId };
        let res = await toggleFavorite(favoriteObj);
        if(isFavorite || !res){
            const favs = favorite.filter((fav) => {
                return fav.id != res?.productId;
            })
            setFavorite(favs);
        } else {
            let {id, name, price} = product;
            let photo = product.photos[0].url;
            let favorites = [{id: res?.id}]
            let favs = [...favorite, {id, name, price, photo, favorites}];
            setFavorite(favs);
        }
    }

    function addToCarts() {
        if (!carts.find(cart => cart.productId === product.id)) {
            const {id, name, price } = product;
            const item = addToCart(product.id, qty ?? 1);
            const newCarts = [...carts, {
                id: item.id,
                name,
                price,
                photo: product.photos[0]?.url,
                qty: qty ?? 1,
                productId: id
            }];
            setCarts(newCarts);
            window.location.href = "/cart";
        } else {
            toast('Product Already in Cart!', {
                icon: 'ℹ️',
            });
        }
    }

    return (
        <>
            <ul className="list-inline mb-2 text-sm">
                {(() => {
                    let rows = [];
                    for (let i = 1; i <= 5; i++) {
                        rows.push(<li className="list-inline-item m-0" key={i}><i className={`fas fa-star small ${i <= Math.ceil(product.avgRating) ? "text-warning" : "text-gray"}`}></i></li>);
                    }
                    return (rows);
                })()}
            </ul>
            <h1>{product.name}</h1>
            <p className="text-muted lead">${product.price}</p>
            <p className="text-sm mb-4">{product.description}</p>
            <div className="row align-items-stretch mb-4">
                <div className="col-sm-5 pr-sm-0">
                    <div className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white"><span className="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                        <div className="quantity">
                            <button className="dec-btn p-0" onClick={(e) => { e.preventDefault(); setQty((qty - 1) < 1 ? 1 : qty - 1)}}><i className="fas fa-caret-left"></i></button>
                            <input className="form-control border-0 shadow-0 p-0" type="text" value={qty} readOnly/>
                            <button className="inc-btn p-0" onClick={(e) => { e.preventDefault(); setQty(qty + 1)}}><i className="fas fa-caret-right"></i></button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 pl-sm-0">
                    <a className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0" onClick={(e) => { e.preventDefault(); addToCarts()}}>
                        Add to cart
                    </a>
                </div>
            </div>
            <a className="text-dark p-0 mb-4 d-inline-block" onClick={() => {setFavoriteData(product)}}>
                <i className={`${isFavorite ? 'fas' : 'far'} fa-heart me-2`}></i>Add to wish list
            </a><br/>
            <ul className="list-unstyled small d-inline-block">
                <li className="px-3 py-2 mb-1 bg-white">
                    <strong className="text-uppercase">SKU:</strong>
                    <span className="ms-2 text-muted">{product.sku}</span>
                </li>
                <li className="px-3 py-2 mb-1 bg-white text-muted">
                    <strong className="text-uppercase text-dark">Category:</strong>
                    <Link className="reset-anchor ms-2" href={"/products/" + product.category.id}>{product.category.name}</Link>
                </li>
            </ul>
        </>
    )
}
