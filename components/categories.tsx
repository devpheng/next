import React from 'react'

export const Categories = () => {
  return (
    <section className="pt-5">
        <header className="text-center">
            <p className="small text-muted small text-uppercase mb-1">Carefully created collections</p>
            <h2 className="h5 text-uppercase mb-4">Browse our categories</h2>
        </header>
        <div className="row">
            <div className="col-md-4">
                <a className="category-item" href="shop.html">
                    <img className="img-fluid" src="/assets/img/cat-img-1.jpg" alt=""/>
                    <strong className="category-item-title">Clothes</strong>
                </a>
            </div>
            <div className="col-md-4">
                <a className="category-item mb-4" href="shop.html">
                    <img className="img-fluid" src="/assets/img/cat-img-2.jpg" alt=""/>
                    <strong className="category-item-title">Shoes</strong>
                </a>
                <a className="category-item" href="shop.html">
                    <img className="img-fluid" src="/assets/img/cat-img-3.jpg" alt=""/>
                    <strong className="category-item-title">Watches</strong>
                </a>
            </div>
            <div className="col-md-4">
                <a className="category-item" href="shop.html">
                    <img className="img-fluid" src="/assets/img/cat-img-4.jpg" alt=""/>
                    <strong className="category-item-title">Electronics</strong>
                </a>
            </div>
        </div>
    </section>
  )
}
