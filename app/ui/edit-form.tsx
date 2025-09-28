import { Tag,Post } from "@prisma/client";
import { editPost } from "../lib/actions";
interface FormProps {
  tags: Tag[];
  post: Post | null;
}

export default function Form({ tags,post }: {tags: Tag[],post: Post}) {
  if (!post) {
    return <div>Post not found</div>;
  }
  const editPostById = editPost.bind(null, post.post_id);
  return (
    <form action={editPostById}>
      <div className="border border-gray-100 rounded-md p-4 md:p-6">
        {/* tags */}
        <div className="mb-4">
          <label
            htmlFor="tag"
            className="text-sm mb-2 block font-medium text-gray-500"
          >
            what Tag?
          </label>
          <div className="relative">
            <select
              name="tag"
              id="tag"
              className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 peer"
              defaultValue={tags.find((tag) => tag.tag_id===post.tag_id ? tag.tag : 'Null')}
            >
              <option value="" disabled>
                Select a Tag
              </option>
              {tags.map((tag) => (
                <option key={tag.tag_id} value={tag.tag_id}>
                  {tag.tag}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title:{" "}
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                defaultValue={post.title}
                type="text"
                name="title"
                id="title"
                className="peer block w-full rounded-md  border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter title"
              />
            </div>
          </div>
        </div>
        {/* content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content:{" "}
          </label>
          <div className="relative">
            <textarea
                defaultValue={post.content}
              name="content"
              id="content"
              className="border border-gray-200 rounded-md p-4 w-full text-sm outline-1"
              rows={8}
            ></textarea>
          </div>
        </div>
        {/* publish status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
                Publish or not ? 
            </legend>
            <div className="border border-gray-200 rounded-md bg-dark px-[14px] py-3 flex gap-4">
                <div className="flex gap-4">
                    <div className="flex items-center   ">
                        <input defaultChecked={post.isPublished} type="radio" id="publish" name="publishStatus" value="publish" className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"/>
                        <label htmlFor="publish" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                            Publish
                        </label>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center">
                        <input defaultChecked={!post.isPublished} type="radio" id="unPublish" name="publishStatus" value="unPublish" className="h-4 w-4 cursor-pointer border-gray-300 bg-blue-800 text-gray-600 focus:ring-2"/>
                        <label htmlFor="unPublish" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white-600">
                            Un publish
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
      </div>

      <input
        type="submit"
        value="Create"
        className="border my-4 p-4 rounded block text-sm font-medium"
      />
    </form>
  );
}
