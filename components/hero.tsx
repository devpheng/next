import Link from "next/link";

export const Hero = () => {
  return (
        <section className="hero pb-3 bg-cover bg-center d-flex align-items-center" style={{background: `url(/assets/img/hero-banner-alt.jpg)`}}>
        {/* <section className="hero pb-3 bg-cover bg-center d-flex align-items-center" style={{background: `url(https://source.unsplash.com/random/1900x650/?banner)`}}> */}
            <div className="container py-5">
                <div className="row px-4 px-lg-5">
                    <div className="col-lg-6">
                        <p className="text-muted small text-uppercase mb-2">New Inspiration 2020</p>
                        <h1 className="h2 text-uppercase mb-3">20% off on new season</h1>
                        <Link className="btn btn-dark" href="/products">Browse collections</Link>
                    </div>
                </div>
            </div>
        </section>
  )
}
