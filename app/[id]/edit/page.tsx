import { getPostById,getTags } from "@/app/lib/data";
import Form from "@/app/ui/edit-form";
import { notFound } from "next/navigation";

export default async function Page(props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    const id = parseInt(params.id, 10);
    const [post,tags] = await Promise.all([
        getPostById(id),
        getTags(),
    ]);

    if (!post) {
        notFound();
    }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h2>Edit post with id: {id}</h2>
        <Form tags={tags} post={post} />
    </div>
  );
}
