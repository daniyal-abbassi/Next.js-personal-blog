// app/components/private/PostsTable/PostsTable.tsx
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/table';
import PostTableRow from './PostTableRow';
import type { Post, User, Tag } from '@prisma/client';

type PostWithRelations = Post & {
  User: User;
  Tag: Tag | null;
};

type Props = {
  posts: PostWithRelations[];
  setSelectedPost: (post: PostWithRelations) => void;
  // username: string;
};

export default function PostsTable({ posts, setSelectedPost }: Props) {
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
          <PostTableRow key={post.post_id} post={post} setSelectedPost={setSelectedPost} />
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