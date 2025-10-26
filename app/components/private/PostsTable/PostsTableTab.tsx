import { Suspense } from 'react';
import { TabsContent } from '@/app/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';
import PostsTableServer from './PostsTableServer';
// import SearchAndSort from './SearchAndSort';
// import Pagination from './Pagination';
import { Loader2 } from 'lucide-react';
import { getAdminPosts, getPostsCount } from '@/app/lib/data';
import type { User } from '@prisma/client';
import Page from './Pagination';

type Props = {
  search: string;
  sort: string;
  order: string;
  page: number;
  setSelectedPost: (post: any) => void;
}

export default function PostsTab({ 
  search, 
  sort, 
  order, 
  page,
  setSelectedPost
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
          
          {/* Client component for search/sort form */}
          {/* <SearchAndSort initialSort={sort} initialOrder={order} /> */}
        </CardHeader>

        <CardContent>
          <Suspense fallback={<TableSkeleton />}>
            <PostsTableServer 
              search={search}
              sort={sort}
              order={order}
              page={page}
              setSelectedPost={setSelectedPost}
              // username={user.username}
            />
          </Suspense>
        </CardContent>

        <CardFooter>
          <Suspense fallback={<div>Loading...</div>}>
            <PaginationWrapper search={search} page={page} />
          </Suspense>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

// Separate async component for pagination (fetches total count)
async function PaginationWrapper({ search, page }: { search: string; page: number }) {
  const totalPosts = await getPostsCount(search);
  const pageSize = 6;
  const totalPages = Math.ceil(totalPosts / pageSize);

  return <Page currentPage={page} totalPages={totalPages} />;
}

function TableSkeleton() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin" width={40} height={40} />
    </div>
  );
}