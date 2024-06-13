import React from 'react';
import Image from 'next/image';

export const Categories = () => {
  return (
    <section className="pt-5">
        <header className="text-center">
            <p className="small text-muted small text-uppercase mb-1">Carefully created collections</p>
            <h2 className="h5 text-uppercase mb-4">Browse our categories</h2>
        </header>
        <div className="row">
            <div className="col-md-4">
                <a className="category-item" href="#">
                    <Image
                        src="/assets/img/cat-img-1.jpg"
                        alt="cat-img-1.jpg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <strong className="category-item-title">Clothes</strong>
                </a>
            </div>
            <div className="col-md-4">
                <a className="category-item mb-4" href="#">
                    <Image
                        src="/assets/img/cat-img-2.jpg"
                        alt="cat-img-2.jpg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <strong className="category-item-title">Shoes</strong>
                </a>
                <a className="category-item" href="#">
                    <Image
                        src="/assets/img/cat-img-3.jpg"
                        alt="cat-img-3.jpg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <strong className="category-item-title">Watches</strong>
                </a>
            </div>
            <div className="col-md-4">
                <a className="category-item" href="#">
                    <Image
                        src="/assets/img/cat-img-4.jpg"
                        alt="cat-img-4.jpg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <strong className="category-item-title">Electronics</strong>
                </a>
            </div>
        </div>
    </section>
  )
}
