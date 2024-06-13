import { getCategories } from "@/actions/category";
import Link from "next/link";
export default async function Category() {
    const categories = await getCategories();

    return (
        <>
            <h5 className="text-uppercase mb-4">Categories</h5>
            {
                categories.map((category) => {
                    return (
                        <>
                            <div className="py-2 px-4 bg-dark text-white mb-3">
                                <strong className="small text-uppercase fw-bold">{category.name}</strong>
                            </div>
                            <ul className="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                                {
                                    category.subs.map((sub) => {
                                        return (
                                            <li className="mb-2">
                                                <Link className="reset-anchor" href="/">
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </>
                    )
                })
            }
        </>
    )
}
