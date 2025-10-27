"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/app/ui/tabs";
import PostsTableTab from "./PostsTable/PostsTableTab";
import { Post, Tag, User } from "@prisma/client";
import CreatePostTab from "./CreatePost/CreatePostTab";
import CreatePostForm from "./CreatePost/CreatePostForm";
import EditPostTab from "./EditPost/EditPostTab";
// import EditPostTab from './EditPostTab';

// type Props = {
//   initialTab: string;
//   search: string;
//   sort: string;
//   order: string;
//   page: number;
//   posts: Post;
// }
type PostWithRelations = Post & {
  User: User;
  Tag: Tag | null;
};

type Props = {
  initialTab: string;
  posts: PostWithRelations[];
  currentPage: number;
  totalPages: number;
  search: string;
  sort: string;
  order: string;
  // setSelectedPost: (post: PostWithRelations) => void;
  // username: string;
};

export default function AdminDashboard({
  initialTab,
  search,
  sort,
  order,
  // page,
  currentPage,
  totalPages,
  posts,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<PostWithRelations | null>(null);
  // update URL + keep it in sync
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Tabs
      value={initialTab}
      onValueChange={handleTabChange}
      className={`${
        initialTab === "posts" ? "max-w-[1200px]" : "max-w-[800px]"
      } mx-auto mt-8 shadow-lg transition-all duration-500 ease`}
    >
      <TabsList className="w-full flex">
        <TabsTrigger className="flex-1" value="posts">
          Posts
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="create">
          Create Post
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="edit" disabled={!selectedPost}>
          Edit Post
        </TabsTrigger>
      </TabsList>

      <PostsTableTab
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
        search={search}
        sort={sort}
        order={order}
        setSelectedPost={setSelectedPost}
        // username={user.username}
      />

      <CreatePostTab>
        <CreatePostForm />
      </CreatePostTab>

      <EditPostTab 
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </Tabs>
  );
}
