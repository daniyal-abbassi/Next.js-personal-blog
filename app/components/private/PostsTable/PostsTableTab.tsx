// app/components/private/PostsTable/PostsTab.tsx
'use client';

import { TabsContent } from '@/app/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';
import PostsTable from './PostsTable';
// import SearchAndSort from './SearchAndSort';
import PaginationComponent from './Pagination';
import type { Post, User, Tag } from '@prisma/client';

type PostWithRelations = Post & {
  User: User;
  Tag: Tag | null;
};

type Props = {
  posts: PostWithRelations[];
  currentPage: number;
  totalPages: number;
  search: string;
  sort: string;
  order: string;
  setSelectedPost: (post: PostWithRelations) => void;
  // username: string;
};

export default function PostsTab({
  posts,
  currentPage,
  totalPages,
  search,
  sort,
  order,
  setSelectedPost,
  // username,
}: Props) {
  return (
    <TabsContent value="posts">
      <Card>
        <CardHeader className="flex-row flex-wrap justify-between gap-2 items-start">
          <div className="space-y-2">
            <CardTitle>Posts</CardTitle>
            <CardDescription>
              All your published & un-published posts here.
            </CardDescription>
          </div>

          {/* Search and Sort Controls */}
          {/* <SearchAndSort initialSearch={search} initialSort={sort} initialOrder={order} /> */}
        </CardHeader>

        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No posts found.
            </div>
          ) : (
            <PostsTable posts={posts} setSelectedPost={setSelectedPost}  />
          )}
        </CardContent>

        <CardFooter>
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
    </TabsContent>
  );
}