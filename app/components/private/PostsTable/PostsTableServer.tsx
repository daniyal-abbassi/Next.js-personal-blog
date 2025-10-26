// app/components/admin/PostsTableServer.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/table';
import { getAdminPosts } from '@/app/lib/data';
import PostTableRow from './PostTableRow';

type Props = {
  search: string;
  sort: string;
  order: string;
  page: number;
  setSelectedPost: (post: any) => void;
//   username: string;
}

export default async function PostsTableServer({ 
  search, 
  sort, 
  order, 
  page,
  setSelectedPost,
//   username 
}: Props) {
  // Fetch data server-side
  const posts = await getAdminPosts(search,sort,order,page);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No posts found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead className="min-w-[200px]">Title</TableHead>
          <TableHead className="w-max">Author</TableHead>
          <TableHead className="min-w-[130px]">Created</TableHead>
          <TableHead className="min-w-[130px]">Updated</TableHead>
          <TableHead className="w-max">Published</TableHead>
          <TableHead colSpan={2}></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {posts.map((post) => (
          <PostTableRow 
            key={post.post_id} 
            post={post}
            setSelectedPost={setSelectedPost}
          />
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Posts</TableCell>
          <TableCell className="text-right">{posts.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}