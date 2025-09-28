import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import { EditPost } from "@/app/ui/buttons";
import { Post } from "@prisma/client";

interface PostProps {
  post: Post[];
}

export default async function Home() {
  const posts = await prisma.post.findMany();
  const tags = await prisma.tag.findMany();
  const lookupTag = (tagId: number) => {
    let tagObject = tags.find((tag) => tag.tag_id === tagId);

    return tagObject ? tagObject.tag : "No Tag";
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {posts.length === 0 ? (
        <p>No Posts availble.</p>
      ) : (
        <ul className="space-y-4 mt-5">
          {posts.map((post: Post) => (
            <li key={post.post_id} className="border p-4 mb-5 rounded mt-5 ">
              <h2 className="text-xl font-semibold">{post.title}</h2>{" "}
              <div className="flex">
              <EditPost id={post.post_id} />
              </div>
              {post.content && (
                <p className="text-sm text-gray-500">{post.content}</p>
              )}
              <p className="text-sm text-yellow-500">
                {" "}
                Created: {new Date(post.created_at).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white-600">Tags:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-blue-800">
                  {lookupTag(post.tag_id)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
