import { Tag } from "@prisma/client";

interface FormProps {
  tags: Tag[];
}

export default function Form({ tags }: FormProps) {
  return (
    <form>
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
              defaultValue=""
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

            <textarea name="content" id="content" className="border border-gray-200 rounded-md p-4 w-full text-sm outline-1" rows={8}></textarea>
            </div>
              
        </div>
      </div>

      <input
        type="submit"
        value="Create"
        className="border my-4 p-4 rounded block text-sm font-medium"
      />
    </form>
  );
}
