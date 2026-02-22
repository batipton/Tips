import Post from "@/app/ui/posts/post-content";

type Params = {
    id: string;
}

type PageProps = {
    params: Promise<Params>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    return <Post id={id} />;
}