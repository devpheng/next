"use client";
import { useEffect, useState } from "react";
import { toggleFavorite } from "@/actions/favorite";
import { useData } from "@/context/datacontext";

export const Modal = () => {
    const { productModal, favorite, setFavorite } = useData();
    const [ rate, setRate] = useState(0);
    const [ qty, setQty] = useState(1);
    const [ price, setPrice] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

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

    useEffect(() => {
        let rate = 0;
        if(productModal.reviews) {
            for(let i = 0; i < productModal.reviews.length; i-=-1) {
                rate += productModal.reviews[i].star;
            }
            rate = Math.round(rate / productModal.reviews.length);
        }
        setRate(rate);
        setPrice(productModal.price);
        setQty(1);
        setFavoriteId(productModal?.favorites ? productModal.favorites[0]?.id : null);
    }, [productModal]);

    useEffect(() => {
        let fav = favorite.filter((fav) => {
            return fav.id == productModal.id
        });
        if(fav.length > 0) {
            setIsFavorite(true);
            setFavoriteId(fav[0].favorites ? fav[0].favorites[0].id : null);
        } else {
            setIsFavorite(false);
            setFavoriteId(null);
        }
    }, [favorite, productModal]);

    return (
        <div className="modal fade" id="productView" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content overflow-hidden border-0">
                    <button className="btn-close p-4 position-absolute top-0 end-0 z-index-20 shadow-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="modal-body p-0">
                        <div className="row align-items-stretch">
                            <div className="col-lg-6 p-lg-0">
                                <a className="glightbox product-view d-block h-100 bg-cover bg-center" style={{'background': `url(${productModal.photos ? productModal.photos[0].url : ''})`}} href={productModal.photos ? productModal.photos[0].url : ''} data-gallery="gallery1" data-glightbox={productModal.name}></a>
                                <a className="glightbox d-none" href={productModal.photos ? productModal.photos[0].url : ''} data-gallery="gallery1" data-glightbox={productModal.name}></a>
                                <a className="glightbox d-none" href={productModal.photos ? productModal.photos[0].url : ''} data-gallery="gallery1" data-glightbox={productModal.name}></a>
                            </div>
                            <div className="col-lg-6">
                                <div className="p-4 my-md-4">
                                    <ul className="list-inline mb-2">
                                        <li className="list-inline-item m-0"><i className={`${ 1 < rate ? 'fas' : 'far'} fa-star small text-warning`}></i></li>
                                        <li className="list-inline-item m-0 1"><i className={`${ 2 < rate ? 'fas' : 'far'} fa-star small text-warning`}></i></li>
                                        <li className="list-inline-item m-0 2"><i className={`${ 3 < rate ? 'fas' : 'far'} fa-star small text-warning`}></i></li>
                                        <li className="list-inline-item m-0 3"><i className={`${ 4 < rate ? 'fas' : 'far'} fa-star small text-warning`}></i></li>
                                        <li className="list-inline-item m-0 4"><i className={`${ 5 < rate ? 'fas' : 'far'} fa-star small text-warning`}></i></li>
                                    </ul>
                                    <h2 className="h4">{productModal.name}</h2>
                                    <p className="text-muted">${price * qty}</p>
                                    <p className="text-sm mb-4">{productModal.description}</p>
                                    <div className="row align-items-stretch mb-4 gx-0">
                                        <div className="col-sm-7">
                                            <div className="border d-flex align-items-center justify-content-between py-1 px-3">
                                                <span className="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                                                <div className="quantity">
                                                    <button className="dec-btn p-0" onClick={() => {setQty((qty - 1) < 1 ? 1 : qty - 1)}}><i className="fas fa-caret-left"></i></button>
                                                    <input className="form-control border-0 shadow-0 p-0" type="text" defaultValue={qty} />
                                                    <button className="inc-btn p-0" onClick={() => {setQty(qty + 1)}}><i className="fas fa-caret-right"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-5"><a className="btn btn-dark btn-sm w-100 h-100 d-flex align-items-center justify-content-center px-0" href="cart.html">Add to cart</a></div>
                                    </div>
                                    <a className="btn btn-link text-dark text-decoration-none p-0" onClick={() => {setFavoriteData(productModal)}}>
                                        <i className={`${isFavorite ? 'fas' : 'far'} fa-heart me-2`}></i>Add to wish list
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
