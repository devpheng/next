import Image from "next/image";
export const ProductDetailTabs = ({product}) => {

    return (
        <>
            <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a>
                </li>
            </ul>
            <div className="tab-content mb-5" id="myTabContent">
                <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                    <div className="p-4 p-lg-5 bg-white">
                        <h6 className="text-uppercase">Product description </h6>
                        <p className="text-muted text-sm mb-0">
                            {product.description}
                        </p>
                    </div>
                </div>
                <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                    <div className="p-4 p-lg-5 bg-white">
                        <div className="row">
                            <div className="col-lg-8">
                                {
                                    product.reviews.map((review, i) => {
                                        return (
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0">
                                                    <Image 
                                                        width={0} 
                                                        height={0}  
                                                        sizes="100vw"
                                                        style={{ width: '100%', height: 'auto' }}  
                                                        className="rounded-circle" 
                                                        src={review.createdBy.image} 
                                                        alt={review.createdBy.name} />
                                                </div>
                                                <div className="ms-3 flex-shrink-1">
                                                    <h6 className="mb-0 text-uppercase">{review.createdBy.name}</h6>
                                                    <p className="small text-muted mb-0 text-uppercase">
                                                        {review.createdAt.toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'})}
                                                    </p>
                                                    <ul className="list-inline mb-1 text-xs">
                                                        {(() => {
                                                            let rows = [];
                                                            for (let i = 1; i <= 5; i++) {
                                                                rows.push(<li className="list-inline-item m-0" key={i}><i className={`fas fa-star ${i <= review.star ? "text-warning" : "text-gray"}`}></i></li>);
                                                            }
                                                            return (rows);
                                                        })()}
                                                    </ul>
                                                    <p className="text-sm mb-0 text-muted">{review.comment}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
