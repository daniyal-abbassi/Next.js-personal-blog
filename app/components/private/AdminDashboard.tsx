'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/app/ui/tabs';
import PostsTableTab from './PostsTable/PostsTableTab';
// import CreatePostTab from './CreatePostTab';
// import EditPostTab from './EditPostTab';

type Props = {
  initialTab: string;
  search: string;
  sort: string;
  order: string;
  page: number;
}

export default function AdminDashboard({ 
  initialTab, 
  search, 
  sort, 
  order, 
  page
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // update URL + keep it in sync
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Tabs 
      value={initialTab} 
      onValueChange={handleTabChange}
      className={`${initialTab === "posts" ? "max-w-[1200px]" : "max-w-[800px]"} mx-auto mt-8 shadow-lg transition-all duration-500 ease`}
    >
      <TabsList className="w-full flex">
        <TabsTrigger className="flex-1" value="posts">
          Posts
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="create">
          Create Post
        </TabsTrigger>
        <TabsTrigger 
          className="flex-1" 
          value="edit"
          disabled={!selectedPost}
        >
          Edit Post
        </TabsTrigger>
      </TabsList>

      <PostsTableTab 
        search={search}
        sort={sort}
        order={order}
        page={page}
        setSelectedPost={setSelectedPost}
      />

      {/* <CreatePostTab user={user} />

      <EditPostTab 
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      /> */}
    </Tabs>
  );
}