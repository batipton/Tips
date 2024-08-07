import Post from "@/app/ui/posts/post-content";


export default async function Page({ params }: { params: { id: string } }) {
    return <Post id={params.id} />;
}