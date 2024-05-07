"use client";
import { useEffect, useState } from "react";
import { toggleFavorite } from "@/actions/favorite";
import { useData } from "@/context/datacontext";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'


export const Product = ({ product, addToCart }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const { favorite, setFavorite, setProductModal, carts, setCarts } = useData();
    const router = useRouter();

    // async function createInvoice(formData: FormData) {
    //     'use server'
    //     console.log(formData);
     
    //     // const rawFormData = {
    //     //     customerId: formData.get('customerId'),
    //     //     amount: formData.get('amount'),
    //     //     status: formData.get('status'),
    //     // }
    
    // // mutate data
    // // revalidate cache
    // }

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

    function addToCarts(formData: FormData) {
        if (!carts.find(cart => cart.id === product.id)) {
            const {id, name, price } = product;
            const newCarts = [...carts, {
                id,
                name,
                price,
                photo: product.photos[0]?.url,
                qty: formData.get('qty') ?? 1
            }];
            setCarts(newCarts);
            addToCart(formData.get('productId'));
            router.push('/cart');
        } else {
            toast('Product Already in Cart!', {
                icon: 'ℹ️',
            });
        }
    }

    return (
        <div className="col-xl-3 col-lg-4 col-sm-6" key={product.id}>
            <div className="product text-center">
                <div className="position-relative mb-3">
                    <div className="badge text-white bg-"></div>
                    <a className="d-block" href="detail.html">
                        <Image
                            src={product.photos ? product.photos[0]?.url : product.photo }
                            alt={product.name}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </a>
                    <div className="product-overlay">
                        <ul className="mb-0 list-inline">
                            <li className="list-inline-item m-0 p-0">
                                <a className={"btn btn-sm btn-outline-dark " +  (isFavorite ? "active" : "") } onClick={() => {setFavoriteData(product)}}>
                                    <i className="far fa-heart"></i>
                                </a>
                            </li>
                            <li className="list-inline-item m-0 p-0">
                                <form action={addToCarts}>
                                    <input type="hidden" name="productId" value={product.id} />
                                    <button type="submit" className="btn btn-sm btn-dark">Add to cart</button>
                                </form>
                            </li>
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
