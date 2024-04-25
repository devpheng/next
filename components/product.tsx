"use client";
import { useEffect, useState } from "react";
import { toggleFavorite } from "@/actions/favorite";
import { useData } from "@/context/datacontext";

export const Product = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const { favorite, setFavorite, setProductModal } = useData();

    useEffect(() => {
        setIsFavorite(product?.favorites?.length);
        setFavoriteId(product?.favorites ? product.favorites[0]?.id : null);
    }, [product]);

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

    }, [favorite]);
   
    async function setFavoriteData(product) {
        let favoriteObj = { productId: product.id, id: favoriteId };
        let res = await toggleFavorite(favoriteObj);
        if(isFavorite){
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

    return (
        <div className="col-xl-3 col-lg-4 col-sm-6" key={product.id}>
            <div className="product text-center">
                <div className="position-relative mb-3">
                    <div className="badge text-white bg-"></div>
                    <a className="d-block" href="detail.html">
                        <img className="img-fluid w-100" src={product.photos ? product.photos[0]?.url : product.photo } alt="..." />
                    </a>
                    <div className="product-overlay">
                        <ul className="mb-0 list-inline">
                            <li className="list-inline-item m-0 p-0">
                                <a className={"btn btn-sm btn-outline-dark " +  (isFavorite ? "active" : "") } onClick={() => {setFavoriteData(product)}}>
                                    <i className="far fa-heart"></i>
                                </a>
                            </li>
                            <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark" href="cart.html">Add to cart</a></li>
                            <li className="list-inline-item me-0">
                                <a className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal" onClick={() => {setProductModal(product)}}><i className="fas fa-expand"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <h6> <a className="reset-anchor" href="detail.html">{product.name}</a></h6>
                <p className="small text-muted">${product.price}</p>
            </div>
        </div>
    )
}
