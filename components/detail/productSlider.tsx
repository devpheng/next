"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';



export const ProductSlider = ({photos}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [lightbox, setLightbox] = useState({});

    const myGallery = photos.map((photo) => {
        return {
            'href': photo.url,
            'type': 'image',
        }
    })

    useEffect(() => {
        if (typeof window !== 'undefined') { 
            const GLightbox = require('glightbox');
            const lightbox = GLightbox({
                elements: myGallery,
                autoplayVideos: false,
            });
    
            setLightbox(lightbox);
        }
    }, [photos])
    

    return (
        <div className="row m-sm-0">
            <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0 px-xl-2">
                <Swiper
                    className="product-slider-thumbs"
                    direction = 'horizontal'
                    slidesPerView='5'
                    spaceBetween = '10'
                    onSwiper={setThumbsSwiper}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    breakpoints={{
                        560: {
                            direction: 'vertical',
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                    }}
                >
                    {
                        photos.map((photo, i) => {
                            return (
                                <SwiperSlide className="swiper-slide h-auto swiper-thumb-item mb-3" key={i}>
                                    <Image 
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto' }} 
                                        className="w-100" 
                                        src={photo.url} 
                                        alt={photo.url} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
            <div className="col-sm-10 order-1 order-sm-2">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="product-slider"
                >
                    {
                        photos.map((photo, i) => {
                            return (
                                <SwiperSlide className="h-auto" key={i}>
                                    <a className="glightbox product-view" onClick={()=>{lightbox.settings.startAt = i;lightbox.open()}}>
                                        <Image width={0}
                                            height={0}
                                            sizes="100vw"
                                            style={{ width: '100%', height: '100%' }} 
                                            className="Image-fluid" 
                                            src={photo.url} 
                                            alt={photo.url} />
                                    </a>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}
