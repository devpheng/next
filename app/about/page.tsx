import { getAbout } from "@/actions/about";

export default async function About() {

    let about = await getAbout();
    return (
        <div className="container" dangerouslySetInnerHTML={{ __html: about.content  }}>
        </div>
    )
}
