import Post from "@/app/ui/posts/post-content";
import { fetchPost, fetchComments } from "@/app/lib/data";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Params = {
    id: string;
}

type PageProps = {
    params: Promise<Params>;
}

export default async function Page({ params }: PageProps) {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }

    const { id } = await params;
    const userid = session.user.id!;
    
    try {
        const post = await fetchPost(id);
        
        if (!post || !post.date) {
            return (
                <div className="flex items-center justify-center p-8">
                    <p className="text-gray-600">Post not found</p>
                </div>
            );
        }
        
        const comments = await fetchComments(post.id);
        
        return <Post post={post} userid={userid} comments={comments} />;
    } catch (error) {
        console.error("Error loading post:", error);
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-gray-600">Error loading post</p>
            </div>
        );
    }
}